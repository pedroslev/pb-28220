// @deno-types="https://deno.land/x/servest@v1.3.4/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.4/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js"
import { createApp } from "https://deno.land/x/servest@v1.3.4/mod.ts";



const app = createApp();

app.handle("/", async (req) => {
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/plain charset=UTF-8",
        }),
        body: ReactDOMServer.renderToString(
        <html>
            <head>
                <title>React Servest</title>
            </head>
            <body>
                <h5>Hello</h5>
                <p>Unhappilly, the given code in examples and class does not compile! yay</p>
            </body>
        </html>
        ),
    });
});

const PORT  = 8080

app.listen({ port: PORT })