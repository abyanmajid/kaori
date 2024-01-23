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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { useFormState } from "react-dom"
import { convertDate, addOneDayAndFormat } from "@/lib/convert"
import { determineStatus } from "@/lib/determine-status"

// @ts-ignore
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // @ts-ignore
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Tasks({ userId, userTodos }: { userId: string, userTodos: any }) {
  const [deadline, setDeadline] = useState<Date | undefined>(new Date())
  const [task, setTask] = useState("");
  const [taskType, setTaskType] = useState("Pending")

  function handleCreateTask(event: any) {
    event.preventDefault()
    // @ts-ignore
    const dl = convertDate(deadline)
    const requestBody = {
      task: task,
      deadline: dl,
      status: determineStatus(dl),
      pinned: false,
      userid: userId,
    }
    const jsonBody = JSON.stringify(requestBody);
    console.log(jsonBody)
  }

  console.log("userTodos:", userTodos)

  let pendingTodos: any[] = []
  let overdueTodos: any[] = []

  // @ts-ignore
  userTodos.forEach(todo => {
    if (todo.status !== 'completed') {
      // Round up the deadline to the end of the day
      const deadline = new Date(todo.deadline);
      deadline.setHours(23, 59, 59, 999);

      // Compare with the current date
      const now = new Date();

      if (deadline > now) {
        // If deadline is in the future, add to pendingTodos
        pendingTodos.push(todo);
      } else {
        // If deadline is in the past, add to overdueTodos
        overdueTodos.push(todo);
      }
    }
  });


  // @ts-ignore
  const completedTodos = userTodos.filter(todo => todo.status === 'completed');
  // @ts-ignore
  const pinnedTodos = userTodos.filter(todo => todo.pinned === true);

  console.log("Pending Todos:", pendingTodos);
  console.log("Overdue Todos:", overdueTodos);
  console.log("Completed Todos:", completedTodos);
  console.log("Pinned Todos:", pinnedTodos);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid grid-cols-2 gap-8 justify-between w-full">
        <div>
          <h1 className="grid grid-cols-2 items-center text-3xl font-extrabold leading-tight tracking-tighter">
            <span>
              📝 Tasks{" "}
              <small>
                <span
                  className={`text-xl font-semibold me-2 px-2.5 py-0.5 rounded ${taskType === "Overdue" ? "bg-red-200 text-red-800" : ""
                    } ${taskType === "Pending" ? "bg-blue-200 text-blue-800" : ""
                    } ${taskType === "Completed" ? "bg-green-200 text-green-800" : ""
                    } ms-2`}
                >
                  {taskType}
                </span>
              </small>
            </span>
            <span className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Create New Task</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleCreateTask}>
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                      <DialogDescription>
                        Please provide some details about your new task.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="task" className="text-right pt-2">
                          Task
                        </Label>
                        <Textarea id="task" placeholder="State your task here..." className="col-span-3" value={task} onChange={(e) => setTask(e.target.value)} />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="deadline" className="text-right pt-2">
                          Deadline
                        </Label>
                        <Calendar
                          id="deadline"
                          mode="single"
                          selected={deadline}
                          onSelect={setDeadline}
                          className="rounded-md border shadow col-span-3"
                        />

                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </span>
          </h1>
          <hr className="h-px mt-2 mb-4 border-0 bg-gray-700"></hr>
          <p className="text-muted-foreground max-w-[700px] text-xl mt-2 mb-4">
            You have 6 {taskType.toLowerCase()} tasks.
          </p>
          <Tabs className="mt-4" defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                onClick={() => setTaskType("Pending")}
                value="pending"
              >
                Pending ({pendingTodos.length})
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setTaskType("Overdue")}
                value="overdue"
              >
                Overdue ({overdueTodos.length})
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setTaskType("Completed")}
                value="completed"
              >
                Completed ({completedTodos.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              {
                // @ts-ignore
                pendingTodos.map(todo => (
                  <Card className="mb-2" key={todo.id}>
                    <CardContent>
                      <CardTitle className="text-lg pt-6 flex items-center">
                        {todo.task}&nbsp;
                        <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-900 text-blue-300">
                          Pending
                        </span>
                      </CardTitle>
                      <CardDescription>Due: {formatDate(todo.deadline)}</CardDescription>
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
                ))
              }
            </TabsContent>
            <TabsContent value="overdue">
              {
                // @ts-ignore
                overdueTodos.map(todo => (
                  <Card className="mb-2" key={todo.id}>
                    <CardContent>
                      <CardTitle className="text-lg pt-6 flex items-center">
                        {todo.task}&nbsp;
                        <span className="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-red-900 text-red-300">
                          Overdue
                        </span>
                      </CardTitle>
                      <CardDescription>Due: {formatDate(todo.deadline)}</CardDescription>
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
                ))
              }
            </TabsContent>
            <TabsContent value="completed">
              {
                // @ts-ignore
                completedTodos.map(todo => (
                  <Card className="mb-2" key={todo.id}>
                    <CardContent>
                      <CardTitle className="text-lg pt-6 flex items-center">
                        {todo.task}&nbsp;
                        <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-green-900 text-green-300`}>
                          Completed
                        </span>
                      </CardTitle>
                      <CardDescription>Due: {formatDate(todo.deadline)}</CardDescription>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button variant="outline" size="icon">
                        <DrawingPinFilledIcon className="text-blue-500 h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Pencil1Icon className="text-yellow-500 h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <TrashIcon className="text-gray-500 h-6 w-6" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              }

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
            {
              // @ts-ignore
              pinnedTodos.map(todo => (
                <Card className="mb-2" key={todo.id}>
                  <CardContent>
                    <CardTitle className="text-lg pt-6 flex items-center">
                      {todo.task}&nbsp;

                      <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${todo.status === "completed" ? "bg-green-900 text-green-300" : ""} ${todo.status === "pending" ? "bg-blue-900 text-blue-300" : ""} ${todo.status === "overdue" ? "bg-red-900 text-red-300" : ""}`}>
                        {capitalizeFirstLetter(todo.status)}
                      </span>
                    </CardTitle>
                    <CardDescription>Due: {formatDate(todo.deadline)}</CardDescription>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button className="bg-blue-500 hover:bg-blue-600" variant="outline" size="icon">
                      <DrawingPinFilledIcon className="text-white-500 h-5 w-5" />
                    </Button>
                    {todo.status !== "completed" ?
                      <Button variant="outline" size="icon">
                        <CheckIcon className="text-green-500 h-7 w-7" />
                      </Button>
                      : ""}
                    <Button variant="outline" size="icon">
                      <Pencil1Icon className="text-yellow-500 h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <TrashIcon className="text-gray-500 h-6 w-6" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            }


          </div>
        </div>
      </div>
    </section >
  )
}
