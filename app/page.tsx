'use client'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="scroll-container">
      <header className='md:px-24 py-6 px-14 *:font-display flex w-screen z-10 justify-between fixed top-0 left-0'>
        <div className='flex gap-2 items-center justify-center'>
          <h1 className='text-2xl font-semibold text-primary'>Apharsis</h1>
        </div>
        <SignedOut>
          <Link href="/sign-in" className='text-background px-6 py-3 font-semibold rounded-full bg-foreground'>Sign in</Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <section className="scroll-section flex w-screen h-screen *:font-display max-lg:flex-col bg-white">
        <div className="flex items-start ml-2 justify-center flex-col lg:w-[70vw] xl:px-24  px-8 py-12 pt-32 xl:py-6">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-md text-primary font-semibold"
          >#HearThem</motion.p>
          <motion.h1
            initial={{ y: 40, filter: 'blur(10px)', opacity: 0 }}
            animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl font-bold"
          >Where AI meets lost <span className="text-primary underline">Phrases</span>.</motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.7 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
            className="text-lg font-medium mt-2 max-w-2xl"
          >An AI-powered tool that transcribes aphasic and muffled voices in real-time, bridging communication gaps for individuals with speech disorders and non-fluent aphasia. Designed to empower communication and break barriers</motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/dashboard" className="px-7 -ml-2 py-4 text-lg rounded-full bg-primary/30 text-primary font-semibold">Get Started</Link>
          </motion.div>
        </div>
        <div className="w-screen lg:w-[35vw] h-full lg:h-screen relative flex items-center justify-center bg-[#283462]  p-1">
          <div className="md:w-[310px] md:h-[390px] w-[240px] h-[230px] bg-primary opacity-60 rounded-tl-[190px] absolute bottom-0 right-0" />
          <div className="md:w-[210px] md:h-[180px] w-[170px] h-[120px] bg-progress-blue opacity-50 rounded-l-full absolute bottom-[140px] md:bottom-[300px] right-0" />
          <div className="w-[310px] h-[390px] border-r-[32px] border-b-[32px] border-primary opacity-40 rounded-br-[200px] absolute top-0 left-0" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 1 }} className="relative">
            <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full bg-gradient-to-tr from-primary to-secondary shadow-[0_0_200px] md:shadow-[0_0_300px] shadow-primary mb-8 animate-float-animation" />
            <motion.div initial={{ opacity: 0, rotate: "2deg" }} animate={{ opacity: 1, rotate: "0deg" }} transition={{ duration: 0.3, delay: 1.3 }} className="rounded-l-full rounded-tr-full rounded-br-lg border-2 border-black absolute md:top-4 top-0 md:-left-26 -left-32 bg-white px-4 py-2 animate-float-delayed">Hi! I am Aphrasis</motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="scroll-section w-screen min-h-screen gap-5 flex items-start justify-center flex-col lg:px-32 lg:py-24 px-20 py-32"
      >
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between w-full flex-col lg:flex-row items-center gap-6"
        >
          <div className="flex flex-col gap-4">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="underline decoration-primary font-semibold text-4xl text-white"
            >
              What is Aphrasia?
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-3xl w-full text-base md:text-lg mt-3 text-justify font-medium opacity-80 text-white"
            >
              Aphasia is a language disorder caused by damage to the brain's language centers, often due to stroke, injury, or disease. It impairs speaking, understanding, reading, and writing, and can co-occur with speech disorders like dysarthria or apraxia. While most common in middle-aged or older adults, it can affect anyone. Expressive aphasia (Broca's) causes difficulty producing speech, while Wernicke's aphasia results in fluent but often nonsensical language. Over 1 million people in the U.S. live with aphasia, with 180,000 new cases each year.
            </motion.p>
          </div>

          <motion.img
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.5 }}
            src="/aphrasia.gif"
            alt="Aphrasia"
            className="object-cover max-lg:mt-4 w-fit max-w-[350px] lg:max-w-[550px] max-h-[70vh] rounded-xl border-2 border-primary"
          />
        </motion.div>
      </motion.section>


      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="scroll-section w-screen min-h-screen max-lg:h-[120vh] flex flex-col bg-white items-center justify-center lg:px-32 lg:py-24 px-20 py-12"
      >
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between w-full flex-col lg:flex-row-reverse items-center gap-6"
        >
          <div className="flex flex-col gap-4">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="underline decoration-primary text-left lg:text-right font-semibold text-4xl text-black"
            >
              How we are about to solve it.
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-3xl w-full text-base md:text-lg mt-3 text-justify font-medium opacity-80 text-black"
            >
              We are providing a solution for the challenges of aphasia and other speech disorders, our goal is to help people with aphrasia and related disorder that captures real-time audio from individuals with these conditions and transcribes to understandable sentences. We transform unclear or disjointed speech into easily understandable text, breaking down communication barriers and empowering users to express themselves confidently. This solution not only improves everyday interactions but also promotes independence, inclusivity. Together, we can overcome the obstacles of aphasia and build a world where every voice is heard .
            </motion.p>
          </div>
          <motion.img
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.5 }}
            src="/aphrasia.png"
            alt="Aphrasia"
            className="object-cover w-fit max-w-[350px] lg:max-w-[550px] max-h-[50vh] lg:max-h-[70vh] rounded-xl border-2 border-primary"
          />
        </motion.div>
      </motion.section>


    </div>
  );
}
