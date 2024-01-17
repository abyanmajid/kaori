"use client"

import { useState } from "react"
import {
  CheckIcon,
  Cross1Icon,
  Pencil1Icon,
  DrawingPinFilledIcon,
  TrashIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TasksPage() {
  const [taskType, setTaskType] = useState("Pending")
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid grid-cols-2 gap-8 justify-between w-full">
        <div>
          <h1 className="flex items-center text-3xl font-extrabold leading-tight tracking-tighter">
            📝 Tasks{" "}
            <small>
              <span
                className={`text-xl font-semibold me-2 px-2.5 py-0.5 rounded ${
                  taskType === "Overdue" ? "bg-red-200 text-red-800" : ""
                } ${
                  taskType === "Pending" ? "bg-blue-200 text-blue-800" : ""
                } ${
                  taskType === "Completed" ? "bg-green-200 text-green-800" : ""
                } ms-2`}
              >
                {taskType}
              </span>
            </small>
          </h1>
          <hr className="h-px mt-2 mb-4 border-0 bg-gray-700"></hr>
          <p className="text-muted-foreground max-w-[700px] text-xl mt-2">
            You have 6 {taskType.toLowerCase()} tasks.
          </p>
          <Tabs className="mt-4" defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                onClick={() => setTaskType("Pending")}
                value="pending"
              >
                Pending (6)
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setTaskType("Overdue")}
                value="overdue"
              >
                Overdue (2)
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setTaskType("Completed")}
                value="completed"
              >
                Completed (31)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <Card className="mb-2">
                <CardContent>
                  <CardTitle className="text-lg pt-6 flex items-center">
                    Pending task 1&nbsp;
                    <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-900 text-blue-300">
                      Pending
                    </span>
                  </CardTitle>
                  <CardDescription>Due: January 16, 2024</CardDescription>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline" size="icon">
                    <DrawingPinFilledIcon className="text-blue-500 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <CheckIcon className="text-green-500 h-7 w-7" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Pencil1Icon className="text-yellow-500 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <TrashIcon className="text-gray-500 h-6 w-6" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="overdue">
              <Card className="mb-2">
                <CardContent>
                  <CardTitle className="text-lg pt-6 flex items-center">
                    Overdue task 1&nbsp;{" "}
                    <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-red-900 text-red-300">
                      Overdue
                    </span>
                  </CardTitle>
                  <CardDescription>Due: January 16, 2024</CardDescription>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline" size="icon">
                    <DrawingPinFilledIcon className="text-blue-500 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <CheckIcon className="text-green-500 h-7 w-7" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Pencil1Icon className="text-yellow-500 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <TrashIcon className="text-gray-500 h-6 w-6" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="completed">
              <Card className="mb-2">
                <CardContent>
                  <CardTitle className="text-lg pt-6 flex items-center">
                    Completed task 1&nbsp;
                    <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-green-900 text-green-300">
                      Completed
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Date of Completion: January 16, 2024
                  </CardDescription>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline" size="icon">
                    <DrawingPinFilledIcon className="text-blue-500 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <CheckIcon className="text-green-500 h-7 w-7" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Pencil1Icon className="text-yellow-500 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <TrashIcon className="text-gray-500 h-6 w-6" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <div className="border-gray-700  bg-gray-950 bg-opacity-35 border rounded-lg p-4">
            <h1 className="flex items-center text-3xl font-extrabold leading-tight tracking-tighter">
              📌 Pinned Tasks{" "}
            </h1>
            <hr className="h-px mt-2 mb-4 border-0 bg-gray-700"></hr>
            <p className="text-muted-foreground max-w-[700px] text-xl my-2">
              You have not pinned any tasks.
            </p>
            <Card className="mb-2">
              <CardContent>
                <CardTitle className="text-lg pt-6 flex items-center">
                  Pending task 1&nbsp;
                  <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-900 text-blue-300">
                    Pending
                  </span>
                </CardTitle>
                <CardDescription>Due: January 16, 2024</CardDescription>
              </CardContent>
              <CardFooter className="gap-2">
                <Button className="bg-blue-500 hover:bg-blue-600" size="icon">
                  <DrawingPinFilledIcon className="text-white h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <CheckIcon className="text-green-500 h-7 w-7" />
                </Button>
                <Button variant="outline" size="icon">
                  <Pencil1Icon className="text-yellow-500 h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <TrashIcon className="text-gray-500 h-6 w-6" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
