import { gql } from "apollo-server";

export const Vehicle = gql`
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
