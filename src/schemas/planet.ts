import { gql } from "apollo-server";

export const Planet = gql`
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
