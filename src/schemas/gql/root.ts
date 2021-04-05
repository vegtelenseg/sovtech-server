import { gql } from "apollo-server";

export const Node = gql`
  interface Node {
    id: ID!
  }
`;

export const Query = gql`
  type Query {
    allFilms(offset: Int, limit: Int): [Film]
    film(id: ID, filmID: ID): Film
    allPeople(offset: Int, limit: Int, name: String): [Person]
    person(name: String): [Person]
    allPlanets(offset: Int, limit: Int): [Planet]
    planet(id: ID, planetID: ID): Planet
    allSpecies(offset: Int, limit: Int): [Species]
    species(id: ID, speciesID: ID): Species
    allStarships(offset: Int, limit: Int): [Starship]
    starship(id: ID, starshipID: ID): Starship
    allVehicles(offset: Int, limit: Int): [Vehicle]
    vehicle(id: ID, vehicleID: ID): Vehicle
    node(id: ID!): Node
  }
`;
