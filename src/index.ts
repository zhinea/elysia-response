import Elysia from "elysia";
import type { Config} from "./utils/types.ts";
import {Responser} from "./responser.ts";


export let cfg: Config;
const defaultConfig: Config = {
    enableCompression: true,
    compressions: ["gzip"]
}

export const ElysiaResponse = (config: Config = defaultConfig) => {
    cfg = config;

    return new Elysia({
            name: "ElysiaResponse"
        })
        .decorate("res", new Responser())
}