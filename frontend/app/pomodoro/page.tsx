import React from "react";
import { Progress } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import TimeDropdown from "@/components/time-dropdown";

export default async function PomodoroPage() {
  "use server"

  return (
    <section className="flex flex-col gap-4 justify-center items-center overflow-auto py-4 md:py-6 max-w-screen-xl text-center">
      <div className="border-gray-700 bg-gray-950 bg-opacity-35 border rounded-2xl p-8 justify-center items-center">
        <Chip size="lg" color="danger">
          ⏰ Session 3 ⏰
        </Chip>
        <h1 className="mb-8 mt-4 font-extrabold leading-none tracking-tight text-8xl text-white">
          00:50:00
        </h1>
        <Progress color="danger" value={70} />
      </div>
      {/* <TimeDropdown/> */}
      
    </section>
  );
}
