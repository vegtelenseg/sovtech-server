"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.People = void 0;
const apollo_server_1 = require("apollo-server");
exports.People = apollo_server_1.gql `
  type Person implements Node {
    name: String
    birthYear: String
    eyeColor: String
    gender: String
    hairColor: String
    height: String
    mass: Int
    skinColor: String
    homeworld: Planet
    films: [Film]
    species: [Species]
    starships: [Starship]
    vehicles: [Vehicle]
    created: String
    edited: String
    id: ID!
  }
`;
//# sourceMappingURL=people.js.map