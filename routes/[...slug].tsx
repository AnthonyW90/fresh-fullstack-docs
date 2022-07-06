/** @jsx h */
import { h, Fragment } from "preact";
import { PageProps, Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { SLUGS, TABLE_OF_CONTENTS, DocumentItem } from "../data/docs.ts";
import { frontMatter, gfm } from "../utils/markdown.ts";
import Sidebar from "../components/Sidebar.tsx";

const NextPreviousPage = (props: { slug: string }) => {
	const currentIndex = SLUGS.findIndex((slug) => slug === props.slug);
	const nextSlug = SLUGS[currentIndex + 1];
	const previousSlug = SLUGS[currentIndex - 1];
	const next = TABLE_OF_CONTENTS[nextSlug];
	const previous = TABLE_OF_CONTENTS[previousSlug];

	const btn = tw`bg-orange-200 rounded-xl px-8 py-4 m-4`;

	return (
		<div className={tw`flex justify-between`}>
			<div>
				{previous && (
					<a className={btn} href={previous.href}>
						{"←"} {previous.title}
					</a>
				)}
			</div>
			<div>
				{next && (
					<a className={btn} href={next.href}>
						{next.title} {"→"}
					</a>
				)}
			</div>
		</div>
	);
};

export const handler: Handlers = {
	async GET(_req, ctx) {
		const { slug } = ctx.params;
		if (slug === "") {
			return new Response("", {
				status: 307,
				headers: {
					location: "/",
				},
			});
		}
		const doc = TABLE_OF_CONTENTS[slug];
		if (!doc) {
			return new Response("Page not Found", { status: 404 });
		}
		const url = new URL(`../${doc.file}`, import.meta.url);
		const fileContent = await Deno.readTextFile(url);
		const { content, data } = frontMatter(fileContent) as {
			content: string;
			data: Record<string, string>;
		};
		const page = { ...doc, markdown: content, data: data ?? {} };
		return ctx.render({ page });
	},
};

interface Page extends DocumentItem {
	markdown: string;
	data: Record<string, unknown>;
}

interface Data {
	page: Page;
}

export default (props: PageProps<Data>) => {
	const html = gfm.render(props.data.page.markdown);
	return (
		<Fragment>
			<Head>
				<title>{props.data.page?.title ?? "Not Found"} | PDX Code Guild</title>
				<link rel="stylesheet" href={`/markdown.css`} />
			</Head>
			<div class={tw`pb-16`}>
				<h1 class={tw`text-white`}>Hello from docs</h1>
				<div class={tw`flex`}>
					<Sidebar path={props.url.pathname} />
					<div
						class={tw`w-3/4 mx-auto` + " markdown-body"}
						dangerouslySetInnerHTML={{ __html: html }}
					></div>
				</div>
			</div>
			<NextPreviousPage slug={props.data.page.slug} />
		</Fragment>
	);
};
