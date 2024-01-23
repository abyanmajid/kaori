import Link from "next/link"
import { getServerSession } from "next-auth"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { options } from "./api/auth/[...nextauth]/options"

export default async function IndexPage() {
  // @ts-ignore
  const session = await getServerSession(options)

  console.log(session)

  return (
    <section
      className={`container grid items-center ${
        session ? "justify-center" : ""
      } gap-6 pb-8 pt-6 md:py-10`}
    >
      <div className={`flex max-w-[980px] flex-col ${session ? "items-center" : ""} gap-2`}>
        {session ? (
          ""
        ) : (
          <div className="inline-flex gap-3 my-4">
            <Card>
              <CardHeader>
                <svg
                  className="w-8 h-8 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                  <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                </svg>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <svg
                  className="w-8 h-8 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <svg
                  className="w-8 h-8 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"
                  />
                </svg>
              </CardHeader>
            </Card>
          </div>
        )}
        {session ? (
          <div>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tighter">
              Welcome,&nbsp;&nbsp;
              <span className="text-primary">{session?.user?.name}</span>&nbsp;!
            </h1>
            <p className="text-muted-foreground max-w-[700px] text-xl mt-2">
              You are currently logged in as user{" "}
              <span className="text-primary">{session?.user?.email}</span>
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tighter">
              Sustain a <span className="text-primary">steady</span> rhythm.{" "}
              <br className="hidden sm:inline" />
              You&apos;ll get there{" "}
              <span className="text-primary">faster than expected.</span>
            </h1>
            <p className="text-muted-foreground max-w-[700px] text-xl mt-2">
              An application with helpful productivity tools, including (1) a
              task manager, (2) a pomodoro timer, and (3) some productivity
              analytics.
            </p>
          </div>
        )}
      </div>
      <div
        className={`flex gap-4 ${session ? "items-center justify-center" : ""}`}
      >
        <Link
          href={
            session ? "/api/auth/signout?callbackUrl=/" : "/api/auth/signin"
          }
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center text-lg text-white bg-gradient-to-r ${
            session
              ? "from-gray-600 via-gray-700 to-gray-800 focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80"
              : "from-red-600 via-red-700 to-red-800 focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80"
          } hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2`}
        >
          {session ? (
            <svg
              className="w-5 h-5 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fill-rule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clip-rule="evenodd"
              />
            </svg>
          )}
          {session ? "Sign out" : "Sign in with Google"}
        </Link>
      </div>
    </section>
  )
}
