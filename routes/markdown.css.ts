import { Handlers } from "$fresh/server.ts"
import { gfm } from "../utils/markdown.ts"

const CSS = `
${gfm.CSS}
`

export const handler: Handlers = {
  GET: () => {
    return new Response(CSS, {
      headers: {
        "content-type": "text/css",
      },
    })
  }
}