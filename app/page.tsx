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
      <main className="flex w-screen h-screen *:font-display max-lg:flex-col bg-white">
        <div className="flex items-start ml-2 justify-center flex-col lg:w-[70vw] xl:px-24  px-8 py-12 pt-32 xl:py-6">
          <p className="text-md text-primary font-semibold">#HearThem</p>
          <h1 className="text-5xl font-bold">Where AI meets lost <span className="text-primary underline">Phrases</span>.</h1>
          <p className="text-lg font-medium mt-2 max-w-2xl opacity-70">An AI-powered tool that transcribes aphasic and muffled voices in real-time, bridging communication gaps for individuals with speech disorders and non-fluent aphasia. Designed to empower communication and break barriers</p>
          <Link href="/dashboard" className="px-5 -ml-2 mt-8 py-3 text-lg rounded-full bg-primary/30 text-primary font-semibold">Get Started</Link>

        </div>
        <div className="w-screen lg:w-[35vw] h-full lg:h-screen relative flex items-center justify-center bg-[#283462]  p-1">
          <div className="md:w-[310px] md:h-[390px] w-[240px] h-[230px] bg-primary opacity-60 rounded-tl-[190px] absolute bottom-0 right-0" />
          <div className="md:w-[210px] md:h-[180px] w-[170px] h-[120px] bg-progress-blue opacity-50 rounded-l-full absolute bottom-[140px] md:bottom-[300px] right-0" />
          <div className="w-[310px] h-[390px] border-r-[32px] border-b-[32px] border-primary opacity-40 rounded-br-[200px] absolute top-0 left-0" />
          <div className="relative">
            <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full bg-gradient-to-tr from-primary to-secondary shadow-[0_0_200px] md:shadow-[0_0_300px] shadow-primary mb-8 animate-float-animation" />
            <div className="rounded-l-full rounded-tr-full rounded-br-lg border-2 border-black absolute md:top-4 top-0 md:-left-26 -left-32 bg-white px-4 py-2 animate-float-delayed">Hi! I am Aphrasis</div>
          </div>
        </div>
      </main>

      <section className="w-screen min-h-screen flex items-start justify-center flex-col px-32 py-24">
        <div className="flex justify-between w-full items-center gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="underline decoration-primary font-semibold text-4xl text-white">What is Aphrasia?</h2>
          <p className="max-w-3xl w-full text-lg mt-3 font-medium opacity-80 text-white">Aphasia is a language disorder caused by damage to the brain's language centers, often due to stroke, injury, or disease. It impairs speaking, understanding, reading, and writing, and can co-occur with speech disorders like dysarthria or apraxia. While most common in middle-aged or older adults, it can affect anyone. Expressive aphasia (Broca's) causes difficulty producing speech, while Wernicke's aphasia results in fluent but often nonsensical language. Over 1 million people in the U.S. live with aphasia, with 180,000 new cases each year.</p>
          </div>
          <img src="/aphrasia.png" alt="Aphrasia" className="object-cover w-fit max-w-[550px] rounded-xl border-2 border-primary" />
        </div>
      </section>
    </>
  );
}
