import {
  getPageFetcher,
  IFetcher,
  fetchBySearchPhrase,
} from "../connectors/swapi";

const path = "/people";

export default (fetch: IFetcher) => ({
  Query: {
    allPeople: (_, params) => {
      const allPeople = getPageFetcher(fetch)(
        path,
        params.offset,
        params.limit
      );
      return allPeople;
    },
    person: (_, params) => {
      const people = fetchBySearchPhrase(fetch)(path, params.name);
      return people;
    },
  },
  Person: {
    id: (person) => person.url,
    hairColor: (person) => person.hair_color,
    skinColor: (person) => person.skin_color,
    eyeColor: (person) => person.eye_color,
    birthYear: (person) => person.birth_year,
    mass: (person) => (isNaN(person) ? person.mass : person.mass.toString()),
    homeworld: (person, _, context) => context.loader.load(person.homeworld),
    films: (person, _, context) => context.loader.loadMany(person.films),
    species: (person, _, context) => context.loader.loadMany(person.species),
    starships: (person, _, context) =>
      context.loader.loadMany(person.starships),
    vehicles: (person, _, context) => context.loader.loadMany(person.vehicles),
  },
});
