import { gql } from "apollo-server";

export const FilmDetails = gql`
  type FilmDetails {
    species: [Species]
    starships: [Starship]
    vehicles: [Vehicle]
    characters: [Person]
    planets: [Planet]
  }
`;

export const Film = gql`
  type Film implements Node {
    title: String
    episodeID: Int
    openingCrawl: String
    director: String
    producers: [String]
    releaseDate: String
    created: String
    edited: String
    details: FilmDetails
    id: ID!
  }
`;
