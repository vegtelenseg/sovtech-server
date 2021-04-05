import {
  getPageFetcher,
  DataFetcher,
  fetchBySearchPhrase,
} from "../services/swapi";

const path = "/people";

export default (fetch: DataFetcher) => ({
  Query: {
    allPeople: (_, params, ctx, info) => {
      try {
        ctx.logger.info(`resolvers.people.allPeople.init: ${info}`);
        const allPeople = getPageFetcher(fetch)(path, params.offset);
        ctx.logger.info(`resolvers.people.allPeople.success: ${info}`);
        return allPeople;
      } catch (error) {
        ctx.logger.error(`resolvers.people.allPeople.fail: ${error.message}`);
      }
    },
    person: (_, params, ctx, info) => {
      try {
        ctx.logger.info(`resolvers.people.allPeople.init: ${info}`);
        const people = fetchBySearchPhrase(fetch)(path, params.name);
        ctx.logger.info(`resolvers.people.allPeople.success: ${info}`);
        return people;
      } catch (error) {
        ctx.logger.error(`resolvers.people.allPeople.fail: ${error.message}`);
      }
    },
  },
  Person: {
    id: (person) => person.url,
    hairColor: (person) => person.hair_color,
    skinColor: (person) => person.skin_color,
    eyeColor: (person) => person.eye_color,
    birthYear: (person) => person.birth_year,
    // mass can be String or Int and GQL does not like UNION scalar types
    mass: (person) => (isNaN(person) ? person.mass : person.mass.toString()),
    homeworld: (person, _, context) => context.loader.load(person.homeworld),
    films: (person, _, context) => context.loader.loadMany(person.films),
    species: (person, _, context) => context.loader.loadMany(person.species),
    starships: (person, _, context) =>
      context.loader.loadMany(person.starships),
    vehicles: (person, _, context) => context.loader.loadMany(person.vehicles),
  },
});
