"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import {
  DataSheetGrid,
  checkboxColumn,
  textColumn,
  keyColumn,
} from "react-datasheet-grid";

// Import the style only once in your app!
import "react-datasheet-grid/dist/style.css";

const Example = () => {
  const [initialColumnWidths, setInitialColumnWidths] = useLocalStorageState(
    "columns",
    {
      defaultValue: [, , 200],
    }
  );
  const [data, setData] = useState([
    {
      active: true,
      firstName: "Elon",
      lastName: "Musk",
      fullName: "Elon Musk",
      email: "ilo@ma.sk",
      phone: "1234567890",
    },
    {
      active: false,
      firstName: "Jeff",
      lastName: "Bezos",
      fullName: "Jeff Bezos",
      email: "je@ff.ck",
      phone: "0987654321",
    },
    {
      active: true,
      firstName: "Bill",
      lastName: "Gates",
      fullName: "Bill Gates",
      email: "bi+1@gat.es",
      phone: "1234567890",
    },
    {
      active: false,
      firstName: "Warren",
      lastName: "Buffett",
      fullName: "Warren Buffett",
      email: "warren1234@gmail.com",
      phone: "0987654321",
    },
    {
      active: true,
      firstName: "Mark",
      lastName: "Zuckerberg",
      fullName: "Mark Zuckerberg",
      email: "m@eta.cz",
      phone: "1234567890",
    },
    {
      active: false,
      firstName: "Larry",
      lastName: "Page",
      fullName: "Larry Page",
      email: "larry@outlook.com",
      phone: "0987654321",
    },
    {
      active: true,
      firstName: "Sergey",
      lastName: "Brin",
      fullName: "Sergey Brin",
      email: "seriy@office.com",
      phone: "1234567890",
    },
    {
      active: false,
      firstName: "Larry",
      lastName: "Ellison",
      fullName: "Larry Ellison",
      email: "larry123@outlook.com",
      phone: "0987654321",
    },
    {
      active: true,
      firstName: "Michael",
      lastName: "Dell",
      fullName: "Michael Dell",
      email: "michal@me.com",
      phone: "1234567890",
    },
    {
      active: false,
      firstName: "Steve",
      lastName: "Jobs",
      fullName: "Steve Jobs",
      email: "steve@seznam.cz",
      phone: "0987654321",
    },
  ]);

  const [columns, setColumns] = useState([
    {
      ...keyColumn("active", checkboxColumn),
      title: "Active",
      // resizable: false,
    },
    {
      ...keyColumn("firstName", textColumn),
      title: "First name",
    },
    {
      ...keyColumn("lastName", textColumn),
      title: "Last name",
    },
    {
      ...keyColumn("fullName", textColumn),
      title: "Full name",
    },
    {
      ...keyColumn("email", textColumn),
      title: "Email",
    },
    {
      ...keyColumn("phone", textColumn),
      title: "Phone",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function dataFetchMock() {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    }

    dataFetchMock();
  }, [columns]);

  return (
    <>
      <button
        className="p-2 my-4 bg-blue-500 text-white rounded-md"
        onClick={() => {
          const randomFrom100to500 = Math.floor(Math.random() * 400) + 100;
          setInitialColumnWidths((prev) =>
            prev.map((v, i) => (i === 2 ? randomFrom100to500 : v))
          );
        }}
      >
        Set random width for First name column
      </button>
      <button
        className="p-2 my-4 bg-blue-500 text-white rounded-md"
        onClick={() => {
          const idString = Math.random().toString(36).substring(7);
          // add new column
          setColumns((prev) => [
            ...prev,
            {
              ...keyColumn(idString, textColumn),
              title: "New column",
            },
          ]);
        }}
      >
        Add new column
      </button>
      <p>Saved width values:</p>
      <pre>{JSON.stringify(initialColumnWidths)}</pre>
      {loading && <p>Loading...</p>}
      {!loading && (
        <DataSheetGrid
          value={data}
          onChange={setData}
          columns={columns}
          // call save to persisting storage to restore the grid columns width on reload
          onColumnsResize={setInitialColumnWidths}
          // fetch saved columns width from persitent storage
          initialColumnWidths={initialColumnWidths}
        />
      )}
    </>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="w-full">
        <Example />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
