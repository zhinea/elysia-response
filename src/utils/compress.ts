import type {Compression} from "../index.ts";
import * as zlib from "zlib";

const encoder = new TextEncoder()

export const BrotliCompress = (encodedData: Uint8Array) => {
    return zlib.brotliCompressSync(encodedData);
}

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
        case "br":
            return BrotliCompress(encodedData);
        case "gzip":
            return GzipCompress(encodedData);
        case "deflate":
            return DeflateCompress(encodedData);
        default:
            return data;
    }
}