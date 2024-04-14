# elysia-response
In elysia itself, there is no `res` or `reply` built in to handle responses like in express, fastify, etc.

so I created this package to answer that problem. besides that, this package also supports compression such as brotli, gzip, and deflate.


## Installing
Choose your favorite package manager to install `elysia-response`
```bash
bun add elysia-response
# or
yarn add elysia-response
```

## Usage

```ts
import { ElysiaResponse, Config } from 'elysia-response';
import Elysia from "elysia";

new Elysia()
    .use(ElysiaResponse<Config>({
        // default options
        enableCompression: true,
        // available compressions are 'br', 'gzip', 'deflate'
        compressions: ['gzip', 'deflate'],
    }))
    .get("/", ({ res }) => {
        return res.ok("Hello World");
        // will return response with status code 200 and body "Hello World"
    })
```

## Available Methods

| Methods    | Description                                 |
|------------|---------------------------------------------|
| `res.ok()` | return status code 200 |
|            |                                             |
|            |                                             |
