import type {Compression} from "./utils/types.ts";
import {CompressData} from "./utils/compress.ts";
import {cfg} from "./index.ts";

/**
 * Class to handle responses
 */
export class Responser {

    /**
     * Status code of the response
     *
     *  @var number
     */
    statusCode: number = 200;

    /**
     * Headers of the response
     *
     * @var Headers
     */
    headers: Headers = new Headers();


    /**
     * Set a header to the response
     * @param key - Header key
     * @param value - Header value
     */
    public header(key: string, value: string){
        this.headers.set(key, value)
        return this;
    }

    /**
     * Set the status code of the response
     * @param code
     */
    public status(code: number){
        this.statusCode = code;
        return this;
    }

    /**
     * Send a response with a status code of 200 (OK)
     * @param data
     */
    public ok(data: any) {
        return this.compress(data)
    }

    /**
     * Send a response with a status code of 429 (Too Many Requests)
     * @param data
     */
    public tooManyRequests(data: any){
        this.statusCode = 429;
        return this.compress(data)
    }

    /**
     * Send a response with a status code of 404 (Not Found)
     * @param data
     */
    public notFound(data: any){
        this.statusCode = 404;
        return this.compress(data)
    }

    /**
     * Send a response with a status code of 400 (Bad Request)
     * @param data
     */
    public badRequest(data: any){
        this.statusCode = 400;
        return this.compress(data)
    }

    /**
     * Send a response with a status code of 401 (Unauthorized)
     * @param data
     */
    public unauthorized(data: any){
        this.statusCode = 401;
        return this.compress(data)
    }

    /**
     * Send a response with a status code of 403 (Forbidden)
     * @param data
     */
    public forbidden(data: any){
        this.statusCode = 403;
        return this.compress(data)
    }

    /**
     * Send a response with a status code of 500 (Internal Server Error)
     * @param data
     */
    public internalServerError(data: any){
        this.statusCode = 500;
        return this.compress(data)
    }

    /**
     * Send a response with a status code of 503 (Service Unavailable)
     * @param data
     */
    public serviceUnavailable(data: any){
        this.statusCode = 503;
        return this.compress(data)
    }

    /**
     * Send a response with headers of Content-Type: application/problem+json
     * @param data
     */
    public problem(data: any){
        this.header('Content-Type', 'application/problem+json');

        return this.compress(data)
    }

    /**
     * Create a response without compressing the data
     * @param data
     * @private
     */
    private withoutCompress(data: any){
        this.setContentType(data);

        return new Response(data, {
            headers: this.headers,
            status: this.statusCode
        })
    }

    /**
     * Compress the data and return a response
     * @param data
     * @private
     */
    private compress(data: any){
        if (!cfg.enableCompression){
            return this.withoutCompress(data)
        }

        const availableCompressions: Compression[] = [ "gzip", "deflate"];
        const compressionTypeIndex = availableCompressions.findIndex(type => cfg.compressions.indexOf(type) !== -1);
        const compressionType = compressionTypeIndex !== -1 ? availableCompressions[compressionTypeIndex] : "";

        if(compressionType != ""){
            this.headers.set('Content-Encoding', compressionType)
        }

        this.setContentType(data)

        return new Response(CompressData(data, compressionType), {
            headers: this.headers,
            status: this.statusCode
        })
    }

    /**
     * Set the Content-Type header based on the data type
     * @param data
     * @private
     */
    private setContentType(data: any){
        this.headers.set('Content-Type', `${
            typeof data === "object" ? 'application/json' : 'text/plain'
        }; charset=utf-8`);
    }

}

