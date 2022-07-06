/** @jsx h */
import { h } from "preact";
import { tw, apply } from "@twind";

import { SUBJECTS } from "../data/docs.ts"

export default (props: {path: string}) => {

  return (
    <ol>
      {SUBJECTS.map(subject => (
        <li class={tw`font-bold`}>
          <a href={subject.href}>{subject.title}</a>
          <ul class={tw`pl-8`}>
          {subject.entries.map(entry => (
            <li class={tw`text-sm text-gray-700 font-normal hover:bg-orange-200`}>
              <a href={entry.href}>{entry.title}</a>
            </li>
          ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}