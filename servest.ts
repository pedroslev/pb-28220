import { createApp } from 'https://deno.land/x/servest@v1.3.4/mod.ts';

const app = createApp();

app.handle('/', async (req) => {
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/plain charset=UTF-8",
        }),
        body: ReactDOMServer.renderToString(

        )
    });
});

const PORT  = 8080

app.listen({port: PORT})