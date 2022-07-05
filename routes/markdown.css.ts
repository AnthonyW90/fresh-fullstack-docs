import { Handlers } from "$fresh/server.ts"
import { gfm } from "../utils/markdown.ts"

const CSS = `
${gfm.CSS}
.markdown-body, table tbody tr{
  width: 100%;
}
.markdown-body, td:first-child:nth-last-child(2){
  width: 50%;
}

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