import Elysia from "elysia";
import {CompressData} from "./utils/compress.ts";

export type Compression = "br" | "gzip" | "deflate" | "";

export type Config = {
    enableCompression?: boolean;
    compressions: Compression[];
}

let cfg: Config;
const defaultConfig: Config = {
    enableCompression: true,
    compressions: ["gzip"]
}

class Responser {
    statusCode: number = 200;
    headers: Headers = new Headers();

    public header(key: string, value: string){
        this.headers.set(key, value)
        return this;
    }

    public status(code: number){
        this.statusCode = code;
        return this;
    }

    public ok(data: any) {
        return this.compress(data)
    }

    public tooManyRequests(data: any){
        this.statusCode = 429;
        return this.compress(data)
    }

    public notFound(data: any){
        this.statusCode = 404;
        return this.compress(data)
    }

    public badRequest(data: any){
        this.statusCode = 400;
        return this.compress(data)
    }

    public unauthorized(data: any){
        this.statusCode = 401;
        return this.compress(data)
    }

    public forbidden(data: any){
        this.statusCode = 403;
        return this.compress(data)
    }

    public internalServerError(data: any){
        this.statusCode = 500;
        return this.compress(data)
    }

    public serviceUnavailable(data: any){
        this.statusCode = 503;
        return this.compress(data)
    }

    public problem(data: any){
        this.header('Content-Type', 'application/problem+json');

        return this.compress(data)
    }


    private withoutCompress(data: any){
        this.headers.set('Content-Type', `${
            typeof data === "object" ? 'application/json' : 'text/plain'
        }; charset=utf-8`);

        return new Response(data, {
            headers: this.headers,
            status: this.statusCode
        })
    }

    private compress(data: any){
        if (!cfg.enableCompression){
            return this.withoutCompress(data)
        }

        const availableCompressions: Compression[] = ["br", "gzip", "deflate"];
        const compressionTypeIndex = availableCompressions.findIndex(type => cfg.compressions.indexOf(type) !== -1);
        const compressionType = compressionTypeIndex !== -1 ? availableCompressions[compressionTypeIndex] : "";

        if(compressionType != ""){
            this.headers.set('Content-Encoding', compressionType)
        }

        this.headers.set('Content-Type', `${
            typeof data === "object" ? 'application/json' : 'text/plain'
        }; charset=utf-8`);

        return new Response(CompressData(data, compressionType), {
            headers: this.headers,
            status: this.statusCode
        })
    }

}


export const ElysiaResponse = (config: Config = defaultConfig) => {
    cfg = config;

    return new Elysia({
            name: "ElysiaResponse"
        })
        .decorate("res", new Responser)
}