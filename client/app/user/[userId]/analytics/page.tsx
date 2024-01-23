import Analytics from "@/components/analytics";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function AnalyticsPage({ params }: any) {
  const { userId } = params
  // @ts-ignore
  const session = await getServerSession(options);
  if (session === null) {
    notFound();
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

  return <Analytics />;
}
