import Link from "next/link";
import { buttonClasses } from "@/ui/primitives/button";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-4 py-20">
      <p className="text-[13px] font-semibold tracking-[0.14em] text-accent-text uppercase">Page not found</p>
      <h1 className="font-display mt-4 text-5xl font-extrabold tracking-tight">That page isn&rsquo;t here.</h1>
      <p className="mt-4 text-lg text-muted">The address may be mistyped, or the page may have moved since the site was redesigned.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/plan" className={buttonClasses({ size: "lg" })}>
          Read the plan
        </Link>
        <Link href="/" className={buttonClasses({ variant: "outline", size: "lg" })}>
          Go to the home page
        </Link>
      </div>
    </main>
  );
}
