import { gql } from "apollo-server";

export const People = gql`
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
