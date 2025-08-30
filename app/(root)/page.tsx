import { auth, signOut } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/filters/HomeFilters";
import QuestionForm from "@/components/forms/QuestionForm";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import handleError from "@/lib/handlers/error";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description: "I want to learn React, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: { _id: "1", name: "John Doe" , image:"data:image/png;base64,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"},
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn JavaScript?",
    description: "I want to learn JavaScript, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: { _id: "1", name: "Sunny Doe" , image:"data:image/jpeg;base64,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"},
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

const test = async() =>{
  try{
    throw new Error("Test Error")

  }
  catch(error){
    return handleError(error);
  }
}

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {

  const { query = "", filter = "" } = await searchParams;
  const session = await auth();
  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center  ">
        <h1 className="h1-bold">All Questions</h1>
        <Button className="primary-gradient " asChild>
          <Link href={ROUTES.ASK_QUESTIONS}> Ask a Question</Link>
        </Button>
        <section className="mt-11">
          <LocalSearch
            route="/"
            imgSrc="/icons/search.svg"
            placeholder="search questions..."
            otherClasses="flex-1"
          />
        </section>
        <HomeFilters />
        <div className="mt-10 flex w-full flex-col gap-6">
          {filteredQuestions.map((question) => (
            <QuestionCard key={question._id} question={question}/>
          ))}
        </div>
        <QuestionForm/>
      </section>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";

          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </>
  );
};

export default Home;
