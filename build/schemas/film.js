"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Film = exports.FilmDetails = void 0;
const apollo_server_1 = require("apollo-server");
exports.FilmDetails = apollo_server_1.gql `
  type FilmDetails {
    species: [Species]
    starships: [Starship]
    vehicles: [Vehicle]
    characters: [Person]
    planets: [Planet]
  }
`;
exports.Film = apollo_server_1.gql `
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
//# sourceMappingURL=film.js.map