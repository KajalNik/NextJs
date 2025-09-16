import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Eye, MousePointer } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    pageviews: 0,
    visitors: 0,
    bounceRate: 0,
    timeRange: '7d'
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics?timeRange=${timeRange}`);
      const data = await response.json();
      setAnalytics(data);
      
      // Generate mock chart data for visualization
      const days = timeRange === '1d' ? 1 : timeRange === '7d' ? 7 : 30;
      const mockChartData = generateChartData(data.pageviews, days);
      setChartData(mockChartData);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateChartData = (totalPageviews, days) => {
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayPageviews = Math.floor((totalPageviews / days) * (0.7 + Math.random() * 0.6));
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        pageviews: dayPageviews,
        visitors: Math.floor(dayPageviews * 0.7)
      });
    }
    return data;
  };

  const StatCard = ({ title, value, icon: Icon, color, suffix = '' }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {loading ? '...' : value.toLocaleString()}{suffix}
          </p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: color + '20' }}>
          <Icon size={24} style={{ color: color }} />
        </div>
      </div>
    </div>
  );

  const bounceRateData = [
    { name: 'Engaged', value: 100 - analytics.bounceRate, color: '#22c55e' },
    { name: 'Bounced', value: analytics.bounceRate, color: '#ef4444' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
          {error && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                <strong>Note:</strong> Using demo data. {error}
                <br />
                <small>Make sure to create a Personal API key in PostHog and add it to your environment variables.</small>
              </p>
            </div>
          )}
          <div className="flex gap-4 items-center">
            <span className="text-gray-600">Time Range:</span>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button 
              onClick={fetchAnalytics}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Pageviews" 
            value={analytics.pageviews} 
            icon={Eye}
            color="#3b82f6"
          />
          <StatCard 
            title="Unique Visitors" 
            value={analytics.visitors} 
            icon={Users}
            color="#10b981"
          />
          <StatCard 
            title="Bounce Rate" 
            value={analytics.bounceRate} 
            icon={MousePointer}
            color="#f59e0b"
            suffix="%"
          />
          <StatCard 
            title="Avg. Pages/Session" 
            value={analytics.visitors > 0 ? (analytics.pageviews / analytics.visitors).toFixed(1) : 0} 
            icon={TrendingUp}
            color="#8b5cf6"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pageviews Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pageviews Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="pageviews" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bounce Rate Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Bounce Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bounceRateData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {bounceRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Visitors vs Pageviews */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Visitors vs Pageviews</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#10b981" name="Visitors" />
                <Bar dataKey="pageviews" fill="#3b82f6" name="Pageviews" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading analytics data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;