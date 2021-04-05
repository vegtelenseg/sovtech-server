"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const apollo_server_1 = require("apollo-server");
exports.Vehicle = apollo_server_1.gql `
  type Vehicle implements Node {
    name: String
    model: String
    vehicleClass: String
    manufacturers: [String]
    costInCredits: Int
    length: Float
    crew: String
    passengers: String
    maxAtmospheringSpeed: Int
    cargoCapacity: Int
    consumables: String
    pilots: [Person]
    films: [Film]
    created: String
    edited: String
    id: ID!
  }
`;
//# sourceMappingURL=vehicle.js.map