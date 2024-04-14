export type Compression = "br" | "gzip" | "deflate" | "";

export type Config = {
    enableCompression?: boolean;
    compressions: Compression[];
}