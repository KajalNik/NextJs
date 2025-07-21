import { auth, signOut } from "@/auth";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
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
    author: { _id: "1", name: "John Doe" },
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
    author: { _id: "1", name: "John Doe" },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string}>;
}

const Home = async ({searchParams} : SearchParams) => {
  const {query = ""} = await searchParams;
  const session = await auth();
  const filteredQuestions = questions.filter((question) => question.title.toLowerCase().includes(query?.toLowerCase()));


  return (
    <>
    <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center  ">
      <h1 className="h1-bold">All Questions</h1>
      <Button className="primary-gradient " asChild>
        <Link href={ROUTES.ASK_QUESTIONS}> Ask a Question</Link>
      </Button>
       <section className="mt-11"><LocalSearch route="/" imgSrc="/icons/search.svg" placeholder="search questions..." otherClasses="flex-1"/></section>
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
     
      </div>
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