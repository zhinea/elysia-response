import Elysia from "elysia";
import {ElysiaResponse} from "../src";
import pkg from './../package.json';

new Elysia()
    .use(ElysiaResponse())
    .get('/', ({res}) => {
        return res
            .status(200)
            .header('E-tag','123')
            .header('Server-by', 'elysia')
            .ok({
                data: {
                    "$lists": ["a", "b", "c"],
                    "$each": {
                        "$list <- $lists": {
                            "$map": {
                                "$item": "$lists",
                                "$do": {
                                    "$concat": ["Hello ", "$item"]
                                },
                                "$as": "mapped"
                            },
                        }
                    }
                },
            })
    })
    .get("/problem", ({res}) => {
        return res.problem({
            meta: {
                env: true
            }
        })
    })
    .listen(3000);
console.log('Server started at http://localhost:3000/')