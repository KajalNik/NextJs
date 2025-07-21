"use client";
import Image from 'next/image';
import { Input } from '../ui/input'
import { useSearchParams , useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formUrlQuery, removeKeysfromUrlQuery } from '@/lib/url';



interface props{
     route:string;
     imgSrc:string;
     placeholder:string;
     otherClasses?:string;
}

const LocalSearch = ({route,imgSrc,placeholder,otherClasses } : props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const pathname = usePathname();

    const [searchQuery,setSearchQuery] = useState(query);

    useEffect(() => {
        const  delayDebounceFn = setTimeout(() => {

            if(searchQuery){
                const newUrl = formUrlQuery({
                    params:searchParams.toString(),
                    key: "query",
                    value: searchQuery,
                });
    
                router.push(newUrl, {scroll:false});
            }
            else{
                if(pathname === route){
                    const newUrl = removeKeysfromUrlQuery({
                        params:searchParams.toString(),
                        keysToRemove: ["query"],
                    })
                     router.push(newUrl, {scroll:false});
                }
            }
        },1000);
        return () => clearTimeout(delayDebounceFn)
    },[searchQuery,router,route,searchParams,pathname])
  return (
    <div className={`background-light800_darkgradient flex min-h-[56px] grow item-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>
        <Image
        src={imgSrc}
        width={24}
        height={24}
        alt="search"
        className='cursor-pointer'/>
        <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none'/>
    </div>
  )
}

export default LocalSearch