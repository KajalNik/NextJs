import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import TagCard from "./TagCard";
import Metric from "../ui/metric";

interface Props {
  question: Question;
}

const QuestionCard = ({
  question: { id, title, tags, author, createdAt, upvotes, answers, views },
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span>{getTimeStamp(createdAt)}</span>
        </div>
        <Link href={ROUTES.QUESTIONS(id)}>
          <h3>{title}</h3>
        </Link>
      </div>

      <div>
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.image}
          alt={author.name}
          value={author.name}
          title={`asked ${getTimeStamp(createdAt)}`}
          href={ROUTES.PROFILE(author._id)}
        />
      </div>
      <div >
        <Metric
        imgUrl="icons/like.svg"
        alt="Like"
        value={upvotes}
        title=" Votes"/>
        <Metric
        imgUrl="icons/message.svg"
        alt="answers"
        value={answers}
        title=" answers"/>
         <Metric
        imgUrl="icons/eye.svg"
        alt="views"
        value={views}
        title=" views"/>
      </div>
    </div>
  );
};

export default QuestionCard;
