import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="bg-home bg-center bg-no-repeat bg-contain container mx-auto max-w-7xl px-6 flex-grow flex items-center justify-center h-screen">
      <section className="flex flex-col items-center justify-center gap-4 overflow-auto py-4 md:py-6">
        <div className="inline-block max-w-xl text-center">
          <h1 className={title()}>Maintain a&nbsp;</h1>
          <h1 className={title({ color: "pink" })}><span className="underline font-bold">steady</span>&nbsp;</h1>
          <h1 className={title()}>rhythm!</h1>
          <h2 className={subtitle({ class: "mt-4" })}>
            Stay <span className="font-bold italic">on track</span> with your tasks and ambitions.
          </h2>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            href="#"
            className={buttonStyles({
              color: "danger",
              radius: "full",
              variant: "shadow",
            })}
          >
            <span className="text-base">Get Started</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
