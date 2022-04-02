import fs from "fs";
import {URL} from "url"

const typeDefs = fs.readFileSync(
    new URL('./schema.graphql', import.meta.url).pathname,
    'utf8'
)

export {typeDefs};