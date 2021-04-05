"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = __importDefault(require("../resolvers"));
const swapi_1 = require("../connectors/swapi");
const { createTestClient } = require("apollo-server-testing");
const schemas_1 = __importDefault(require("../schemas"));
const index_1 = require("../index");
const PEOPLE_QUERY = apollo_server_1.gql `
  query AllPeople($offset: Int, $limit: Int) {
    allPeople(offset: $offset, limit: $limit) {
      id
      name
      height
      gender
      homeworld {
        name
      }
    }
  }
`;
let fetch;
let server;
const baseURL = process.env.API_URI || "http://localhost:4000";
describe("People Management", () => {
    before(() => {
        fetch = swapi_1.getAxiosRequestObject(baseURL);
        const resolvers = resolvers_1.default(fetch);
        server = new apollo_server_1.ApolloServer({
            typeDefs: schemas_1.default,
            resolvers,
            context: () => ({
                loader: index_1.loader,
            }),
        });
    });
    it("fetches all people", () => __awaiter(void 0, void 0, void 0, function* () {
        // use the test server to create a query function
        const { query } = createTestClient(server);
        // run query against the server and snapshot the output
        const res = yield query({ query: PEOPLE_QUERY });
        expect(res).toMatchSnapshot();
    }));
});
//# sourceMappingURL=People.js.map