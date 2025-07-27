'use client';

import React, { useState } from 'react'
import { Button } from '../ui/button';
import { useSearchParams,useRouter } from 'next/navigation';
import { formUrlQuery, removeKeysfromUrlQuery } from '@/lib/url';
import { cn } from "@/lib/utils";

const filters = [
  // { name: "React", value: "react" },
  { name: "JavaScript", value: "javascript" },

  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Unanswered", value: "unanswered" },
  { name: "Recommeded", value: "recommended" },
];
const HomeFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active,setActive] = useState(filterParams || '');

   const handleTypeClick = (filter: string) => {
    let newUrl = "";

    if (filter === active) {
      setActive("");

      newUrl = removeKeysfromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };
  return (
    <div className='mt-10 hidden flex-wrap gap-3 sm:flex'>
      {filters.map((filter) => (
        <Button key={filter.name} className={cn(`body-medium rounded-lg px-6 py-3 capitalize shadow-none`,active === filter.value ? "": "")} onClick={() => handleTypeClick(filter.value)}>{filter.name}</Button>
      ))}
    </div>
  )
}

export default HomeFilters