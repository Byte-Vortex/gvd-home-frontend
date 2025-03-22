"use client"

import { isObject } from "lodash"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function BlogTag({data}){
    
    const isTagObject= isObject(data);
    const title = isTagObject ? data.title : data;
    
    const badgeRegex = ( 
        <Badge variant={"secondary"}>
            {title}
        </Badge>
    )
    
    return (
        isTagObject?
        <Link href={"/blogs/categories/"+data?.slug}>{badgeRegex}</Link> : 
        <>{badgeRegex}</>
    )
}