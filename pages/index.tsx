import Head from "next/head";
import Field from "@/components/Game/Field";

export default function Home() {
  return (
    <div>
      <Head>
        <title>The shortest game</title>
        <meta
          name="description"
          content="Can you find the shortest path before the computer?"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center w-screen h-screen">
        <Field />
      </div>
    </div>
  );
}
