import { gql } from "apollo-server";
import { expect } from "chai";
import typeDefs from "../schemas";
import LoadResolvers from "../resolvers";
import { ApolloServer } from "apollo-server";
import { getAxiosRequestObject } from "../services/swapi";
import { loader } from "../index";
import { Logger } from "../logger/Logger";

import { createTestClient } from "apollo-server-testing";

const PEOPLE_QUERY = gql`
  query AllPeople($offset: Int, $limit: Int, $name: String) {
    allPeople(offset: $offset, limit: $limit, name: $name) {
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

const PERSON_QUERY = gql`
  query People($name: String) {
    person(name: $name) {
      name
    }
  }
`;

const baseUrl = process.env.API_URI || "http://localhost:4000";
const fetch = getAxiosRequestObject(baseUrl);
const resolvers = LoadResolvers(fetch);
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: true,
  context: {
    loader,
    logger: Logger,
  },
});
// TODO: Add more tests
describe("People Management", () => {
  it("Fetches all people", async () => {
    // use the test server to create a query function
    const { query } = createTestClient(apolloServer);

    // run query against the server and snapshot the output
    const { data } = await query({
      query: PEOPLE_QUERY,
      variables: { offset: 0 },
    });
    expect(data.allPeople).not.equal(null);
    // TODO: Add more checks
  });
  it("Fetches one person, by name", async () => {
    const { query } = createTestClient(apolloServer);

    const { data } = await query({
      query: PERSON_QUERY,
      variables: { name: "Skywalker" },
    });
    expect(data.person).not.equal(null);
    // TODO: Add more checks
  });
});
