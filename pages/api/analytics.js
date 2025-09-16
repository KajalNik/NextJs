export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { timeRange = "7d" } = req.query;

    // Your PostHog project info
    const headers = {
      Authorization: `Bearer ${process.env.POSTHOG_PERSONAL_API_KEY}`,
      "Content-Type": "application/json",
    };

    // First, get your project ID
    const projectResponse = await fetch(
      `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/api/projects/`,
      { headers }
    );
    const projectData = await projectResponse.json();
    const projectId = projectData.results[0]?.id;

    if (!projectId) {
      throw new Error("No project found");
    }

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();

    switch (timeRange) {
      case "1d":
        startDate.setDate(endDate.getDate() - 1);
        break;
      case "7d":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(endDate.getDate() - 30);
        break;
      default:
        startDate.setDate(endDate.getDate() - 7);
    }

    // Get events (pageviews)
    const eventsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_POSTHOG_HOST
      }/api/projects/${projectId}/events/?event=$pageview&after=${startDate.toISOString()}&before=${endDate.toISOString()}`,
      { headers }
    );
    const eventsData = await eventsResponse.json();

    // Process the data
    const events = eventsData.results || [];
    const uniqueVisitors = new Set(events.map((event) => event.distinct_id))
      .size;
    const bounceRate = calculateBounceRate(events);

    const analytics = {
      pageviews: events.length,
      visitors: uniqueVisitors,
      bounceRate: bounceRate,
      timeRange,
    };

    res.status(200).json(analytics);
  } catch (error) {
    console.error("Analytics API error:", error);
    res.status(500).json({
      message: "Failed to fetch analytics data",
      error: error.message,
    });
  }
}

function calculateBounceRate(events) {
  if (events.length === 0) return 0;

  // Group events by session
  const sessionPageviews = {};
  events.forEach((event) => {
    const sessionId = event.properties?.$session_id || event.distinct_id;
    sessionPageviews[sessionId] = (sessionPageviews[sessionId] || 0) + 1;
  });

  const sessions = Object.values(sessionPageviews);
  const bouncedSessions = sessions.filter((count) => count === 1).length;

  return sessions.length > 0
    ? Math.round((bouncedSessions / sessions.length) * 100)
    : 0;
}
