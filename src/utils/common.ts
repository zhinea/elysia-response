import * as util from "util";
import * as zlib from "zlib";

export const isFunction = (fn: any): fn is Function => typeof fn === 'function';

export const isBrotliSupported = isFunction(zlib?.createBrotliCompress);

export const isGzipSupported = isFunction(zlib?.createGzip);

export const isDeflateSupported = isFunction(zlib?.createDeflate);