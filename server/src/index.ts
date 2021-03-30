import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import * as path from "path";
import { PersonResolver } from "./resolvers/PersonResolver";

export const baseURL = "https://swapi.dev/api";

(async function main() {
  const schema = await buildSchema({
    resolvers: [PersonResolver],
    emitSchemaFile: path.join(__dirname, "generated/schema.graphql"),
  });
  const server = new ApolloServer({ schema });
  const port = Number(process.env.PORT) || 5000;
  await server.listen(port, () => console.log("Server has started!"));
})();
