"use client"

import { useState } from "react"
import Link from "next/link"
import { EyeOpenIcon, RocketIcon } from "@radix-ui/react-icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LineChartExample from "@/components/chart"

export default function Analytics() {
  const [currentView, setCurrentView] = useState("Weekly")
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="border-gray-700  bg-gray-950 bg-opacity-35 border rounded-lg p-4">
        <h1 className="text-center text-white text-3xl font-extrabold flex items-center justify-center">
          Analytics&nbsp;
          <small>
            <span className="text-xl font-semibold me-2 px-2.5 py-0.5 rounded bg-red-200 text-red-800">
              Work In Progress
            </span>
          </small>
        </h1>
        <p className="text-center text-muted-foreground text-lg mt-2">
          Hi <span className="font-bold text-primary">User</span>, here are some
          insights on your productivity.
        </p>
        <hr className="h-px mt-2 mb-4 border-0 bg-gray-700"></hr>
        <div className="flex justify-center">
          <Alert className="text-center mb-4 max-w-sm">
            <EyeOpenIcon className="h-9 w-9" />
            <AlertTitle>
              Currently viewing:{" "}
              <span className="text-sm font-medium me-2 px-2.5 py-0.5 rounded-full bg-red-900 text-red-300">
                {currentView === "Weekly" ? "Last week" : ""}
                {currentView === "Monthly" ? "Last month" : ""}
                {currentView === "Yearly" ? "Last year" : ""}
                {currentView === "All time" ? "All time" : ""}
              </span>
            </AlertTitle>
            <AlertDescription>N/A</AlertDescription>
          </Alert>
        </div>
        <Tabs defaultValue="weekly">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger
              value="weekly"
              onClick={() => setCurrentView("Weekly")}
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="monthly"
              onClick={() => setCurrentView("Monthly")}
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="yearly"
              onClick={() => setCurrentView("Yearly")}
            >
              Yearly
            </TabsTrigger>
            <TabsTrigger
              disabled
              value="all"
              onClick={() => setCurrentView("All time")}
            >
              All time
            </TabsTrigger>
          </TabsList>
          <TabsContent value="weekly">
            <div className="h-screen">
              <div className="grid grid-cols-2 grid-rows-3 md:grid-rows-4 md:grid-cols-4 gap-2 md:gap-4 h-auto">
                <Card>
                  <CardContent>
                    <CardContent className="pt-6">
                      <CardTitle className="text-base flex items-center">
                        On-Time Task Completions
                      </CardTitle>
                      <p className="font-extrabold text-3xl mt-2">N/A</p>
                    </CardContent>
                    <CardFooter>
                      <CardDescription>
                        Tasks completed on-time: N/A
                      </CardDescription>
                    </CardFooter>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <CardContent className="pt-6">
                      <CardTitle className="text-base flex items-center">
                        AVG. Daily Study Time
                      </CardTitle>
                      <p className="font-extrabold text-3xl mt-2">N/A</p>
                    </CardContent>
                    <CardFooter>
                      <CardDescription>
                        Based on your Pomodoro use.
                      </CardDescription>
                    </CardFooter>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <CardContent className="pt-6">
                      <CardTitle className="text-base flex items-center">
                        Total Study Time
                      </CardTitle>
                      <p className="font-extrabold text-3xl mt-2">N/A</p>
                    </CardContent>
                    <CardFooter>
                      <CardDescription>
                        Based on your Pomodoro use.
                      </CardDescription>
                    </CardFooter>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <CardContent className="pt-6">
                      <CardTitle className="text-base flex items-center">
                        AVG. Study Session Quality
                      </CardTitle>
                      <p className="font-extrabold text-3xl mt-2">N/A</p>
                    </CardContent>
                    <CardFooter>
                      <CardDescription>
                        Based on your own ratings.
                      </CardDescription>
                    </CardFooter>
                  </CardContent>
                </Card>
                <Card className="col-span-1 md:col-span-2 row-span-1 md:row-span-2">
                  <CardContent>
                    <CardTitle className="text-lg pt-6 flex items-center mb-2">
                      Study Times Visualizer
                    </CardTitle>
                    <CardDescription>
                      Times you spent studying each day from N/A to N/A.
                    </CardDescription>
                    <LineChartExample />
                  </CardContent>
                </Card>
                <Card className="col-span-1 md:col-span-2 row-span-1 md:row-span-2">
                  <CardContent>
                    <CardTitle className="text-lg pt-6 flex items-center mb-2">
                      Overall Assessment: &nbsp;
                      <span className="text-base font-medium me-2 px-2.5 py-0.5 rounded-full bg-green-900 text-green-300">
                        N/A
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Based on your study times, session qualities, and task
                      completions,{" "}
                      <span className="font-bold text-white">Kaori</span> has
                      concluded that you have been{" "}
                      <span className="text-green-500 font-bold">N/A.</span>
                    </CardDescription>
                    <CardTitle className="text-base pt-6 flex items-center mb-2">
                      How do I compare to the average highschool student in the
                      US?
                    </CardTitle>
                    <CardDescription>
                      The average{" "}
                      <span className="font-bold text-blue-500">
                        highschool student
                      </span>{" "}
                      in the United States spend{" "}
                      <Link
                        href="https://www.collegiateparent.com/academics/student-study-time-matters/#:~:text=According%20to%20one%20survey%20conducted,25%20hours%2Fweek%20on%20schoolwork."
                        className="text-secondary-foreground underline"
                      >
                        6.8 weekly hours of independent study
                      </Link>
                      . You spend an average of N/A weekly hours, therefore
                      relative to these students, you are{" "}
                      <span className="font-bold text-green-500">N/A.</span>
                    </CardDescription>
                    <CardTitle className="text-base pt-6 flex items-center mb-2">
                      How do I compare to the average university student in the
                      US?
                    </CardTitle>
                    <CardDescription>
                      The average{" "}
                      <span className="font-bold text-blue-500">
                        university student
                      </span>{" "}
                      in the United States spend{" "}
                      <Link
                        href="https://www.collegiateparent.com/academics/student-study-time-matters/#:~:text=According%20to%20one%20survey%20conducted,25%20hours%2Fweek%20on%20schoolwork."
                        className="text-secondary-foreground underline"
                      >
                        11.5 weekly hours of independent study
                      </Link>
                      . You spend an average of N/A weekly hours, therefore
                      relative to these students, you are{" "}
                      <span className="font-bold text-primary">N/A.</span>
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
