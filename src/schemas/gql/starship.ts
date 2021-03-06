import { gql } from "apollo-server";

export const Starship = gql`
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
