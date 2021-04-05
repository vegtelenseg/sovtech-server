"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Starship = void 0;
const apollo_server_1 = require("apollo-server");
exports.Starship = apollo_server_1.gql `
  type Starship implements Node {
    name: String
    model: String
    starshipClass: String
    manufacturers: [String]
    costInCredits: Float
    length: Float
    crew: String
    passengers: String
    maxAtmospheringSpeed: Int
    hyperdriveRating: Float
    MGLT: Int
    cargoCapacity: Float
    consumables: String
    pilots: [Person]
    films: [Film]
    created: String
    edited: String
    id: ID!
  }
`;
//# sourceMappingURL=starship.js.map