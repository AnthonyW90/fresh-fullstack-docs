/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts"
import { SUBJECTS } from "../data/docs.ts"

export default function Home() {

  const icons = {
    "01 Python": <i class="devicon-python-plain"></i>
  }

  return (
    <Fragment>
    <Head>
      <title>Home | PDX Code Guild</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
    </Head>
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <h1 class={tw`text-5xl`}>PDX Code Guild Docs Page</h1>
      {SUBJECTS.map(subject => (<div>
        <h2 class={tw`text-3xl`}>{subject.title}</h2>
        <ul>
          {subject.entries.map(entry => (
          <li class={tw`text-lg pl-4`}>
            {icons[subject.title] || ""}
            <a class={tw`hover:underline`} href={entry.href}>{entry.title}</a>
          </li>
          ))}
        </ul>
      </div>))}
    </div>
    </Fragment>
  );
}
