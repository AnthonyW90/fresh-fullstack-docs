/** @jsx h */
import { h, Fragment } from "preact"
import { PageProps, Handlers } from "$fresh/server.ts"
import { Head } from "$fresh/runtime.ts"
import { tw } from "@twind"
import { SLUGS, TABLE_OF_CONTENTS, DocumentItem } from "../../data/docs.ts"
import { frontMatter, gfm } from "../../utils/markdown.ts"
import Sidebar from "../../components/Sidebar.tsx"

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { slug } = ctx.params
    if (slug === "") {
      return new Response("",
      {
        status: 307,
        headers: {
          location: "/docs/toc"
        }
      })
    }
    const doc = TABLE_OF_CONTENTS[slug]
    if (!doc) {
      return new Response("Page not Found", { status: 404 })
    }
    const url = new URL(`../../${doc.file}`, import.meta.url)
    const fileContent = await Deno.readTextFile(url)
    const { content, data } = frontMatter(fileContent) as {
      content: string;
      data: Record<string, string>;
    }
    const page = {...doc, markdown: content, data: data ?? {}}
    return ctx.render({page})
  }
}

interface Page extends DocumentItem {
  markdown: string;
  data: Record<string, unknown>;
}

interface Data {
  page: Page;
}

export default (props: PageProps<Data>) => {
  const html = gfm.render(props.data.page.markdown)
  return (
    <Fragment>
    <Head>
      <title>{props.data.page?.title ?? "Not Found"} | PDX Code Guild</title>
      <link rel="stylesheet" href={`/markdown.css`} />
    </Head>
    <div class={tw``}>
      <h1 class={tw`text-white`}>Hello from docs</h1>
      <div class={tw`flex`}>
        <Sidebar path={props.url.pathname}/>
        <div data-color-mode="auto" data-dark-theme="dark" data-light-theme="light" class={tw`w-3/4` + ' markdown-body'} dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    </div>
    </Fragment>
  )
}