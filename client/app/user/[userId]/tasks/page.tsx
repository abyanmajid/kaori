"use server"

import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import Tasks from "@/components/tasks"
import { options } from "@/app/api/auth/[...nextauth]/options"

export default async function TasksPage({ params }: any) {
  const { userId } = params;
  // @ts-ignore
  const session = await getServerSession(options)
  if (session === null) {
    notFound()
  }
  try {
    const response = await fetch(`http://localhost:8000/users/${userId}`)
    if (!response.ok) {
      throw new Error(`Error: status: ${response.status}`)
    }

    const user = await response.json();
    if (user.length === 0) {
      notFound();
    }
  } catch (error) {
    console.error("There was a problem in fetching user:", error);
    notFound();
  }
  let userTodos: any = []
  try {
    const response = await fetch("http://localhost:8000/todos");
    if (!response.ok) {
      throw new Error(`Error: status: ${response.status}`)
    }

    const allTodos = await response.json();
    // @ts-ignore
    userTodos = await allTodos.notes.filter(todo => todo.userid === userId);
  } catch (error) {
    console.error("There was a problem in fetching user's todos:", error);
  }

  console.log(`Fetching todos for User #${userId}:`, userTodos)
  return <Tasks userId={userId} userTodos={userTodos} />
}
