import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { supabase } from "@/lib/initSupabase"

interface MainNavProps {
  items?: NavItem[]
}

export async function MainNav({ items }: MainNavProps) {
  // @ts-ignore
  const session = await getServerSession(options)
  let userId = "NONE!!!!"
  if (session === null) {
    userId = ""
  } else {
    const { data: user } = await supabase
      .from('users')
      .select("*")
      .eq("email", session?.user?.email);
    const userExists = user && user.length !== 0 ? true : false;
    // @ts-ignore
    userId = userExists ? user[0].id : "";
  }
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/brand.png" width={25} height={25} alt="kaori-logo" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href &&
              (item.title !== "Tasks" &&
                item.title !== "Analytics") && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
          {items?.map(
            (item, index) =>
              item.href &&
              session &&
              (item.title === "Tasks" ||
                item.title === "Analytics") && (
                <Link
                  key={index}
                  href={`/user/${userId}/${item.href}`}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
