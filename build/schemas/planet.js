"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planet = void 0;
const apollo_server_1 = require("apollo-server");
exports.Planet = apollo_server_1.gql `
  type Planet implements Node {
    name: String
    diameter: Int
    rotationPeriod: Int
    orbitalPeriod: Int
    gravity: String
    population: String
    climates: [String]
    terrains: [String]
    surfaceWater: Float
    residents: [Person]
    films: [Film]
    created: String
    edited: String
    id: ID!
  }
`;
//# sourceMappingURL=planet.js.map