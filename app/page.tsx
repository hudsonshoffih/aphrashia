'use client'

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

// import { useSession } from "@clerk/nextjs";
// import Link from "next/link";

export default function Home() {
  // const {session} = useSession();
  return (
    <>
      <section className='md:px-24 py-6 px-14 *:font-display flex w-screen z-10 justify-between absolute top-0 left-0'>
        <div className='flex gap-2 items-center justify-center'>
          <h1 className='text-2xl font-semibold text-primary'>Apharsis</h1>
        </div>
        <SignedOut>
          <Link href="/sign-up" className='text-background px-6 py-3 font-semibold rounded-full bg-foreground'>Sign Up</Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </section>
      <main className="flex w-screen min-h-screen *:font-display max-lg:flex-col bg-white">
        <div className="flex items-start ml-2 justify-center flex-col lg:w-[70vw] xl:px-24  px-6 py-5 xl:py-6">
          <p className="text-md text-primary font-semibold">#HearThem</p>
          <h1 className="text-5xl font-bold">Where AI meets lost <span className="text-primary underline">phrases</span>.</h1>
          <p className="text-lg font-medium mt-2 max-w-2xl opacity-70">An AI-powered tool that transcribes aphasic and muffled voices in real-time, bridging communication gaps for individuals with speech disorders and non-fluent aphasia. Designed to empower communication and break barriers</p>
          <Link href="/dashboard" className="px-5 -ml-2 mt-8 py-3 text-lg rounded-full bg-primary/30 text-primary font-semibold">Get Started</Link>

        </div>
        <div className="w-[35vw] h-screen relative flex items-center justify-center bg-[#283462]  p-1">
          <div className="w-[310px] h-[390px] bg-primary opacity-60 rounded-tl-[190px] absolute bottom-0 right-0" />
          <div className="w-[210px] h-[180px] bg-progress-blue opacity-50 rounded-l-full absolute bottom-[300px] right-0" />
          <div className="w-[310px] h-[390px] border-r-[32px] border-b-[32px] border-primary opacity-40 rounded-br-[200px] absolute top-0 left-0" />
          <div className="relative">
            <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full bg-gradient-to-tr from-primary to-secondary shadow-[0_0_200px] md:shadow-[0_0_300px] shadow-primary mb-8 animate-float-animation" />
            <div className="rounded-l-full rounded-tr-full rounded-br-lg border-2 border-black absolute md:top-4 top-0 md:-left-26 -left-32 bg-white px-4 py-2 animate-float-delayed">Hi! I am Aphrasis</div>
          </div>
        </div>
      </main>
    </>
  );
}
