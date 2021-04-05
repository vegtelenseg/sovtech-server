"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Species = void 0;
const apollo_server_1 = require("apollo-server");
exports.Species = apollo_server_1.gql `
  type Species implements Node {
    name: String
    classification: String
    designation: String
    averageHeight: Float
    averageLifespan: Int
    eyeColors: [String]
    hairColors: [String]
    skinColors: [String]
    language: String
    homeworld: Planet
    people: [Person]
    films: [Film]
    created: String
    edited: String
    id: ID!
  }
`;
//# sourceMappingURL=species.js.map