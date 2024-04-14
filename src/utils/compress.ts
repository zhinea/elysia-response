import type {Compression} from "../index.ts";
import * as zlib from "zlib";
import {isBrotliSupported} from "./common.ts";

const encoder = new TextEncoder()

// export const BrotliCompress = (encodedData: Uint8Array) => {
//     if(!isBrotliSupported) throw new Error("Brotli compression is not supported");
//     let br = zlib.createBrotliCompress({
//         params: {
//             [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
//             [zlib.constants.BROTLI_PARAM_QUALITY]: 8
//         }
//     });
//
//     return br.end(encodedData);
// }

function GzipCompress(encodedData: Uint8Array) {
    return Bun.gzipSync(encodedData);
}

function DeflateCompress(encodedData: Uint8Array) {
    return Bun.deflateSync(encodedData);
}

export const CompressData = (data: any, compression: Compression) => {
    const isObject = typeof data === "object";

    let encodedData = encoder.encode(isObject ? JSON.stringify(data) : data);

    switch (compression) {
        // case "br":
        //     return BrotliCompress(encodedData);
        case "gzip":
            return GzipCompress(encodedData);
        case "deflate":
            return DeflateCompress(encodedData);
        default:
            return data;
    }
}