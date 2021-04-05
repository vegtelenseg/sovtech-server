"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swapi_1 = require("../connectors/swapi");
const path = "/people";
exports.default = (fetch) => ({
    Query: {
        allPeople: (_, params) => {
            const allPeople = swapi_1.getPageFetcher(fetch)(path, params.offset, params.limit);
            return allPeople;
        },
        person: (_, params) => {
            const people = swapi_1.fetchBySearchPhrase(fetch)(path, params.name);
            return people;
        },
    },
    Person: {
        id: (person) => person.url,
        hairColor: (person) => person.hair_color,
        skinColor: (person) => person.skin_color,
        eyeColor: (person) => person.eye_color,
        birthYear: (person) => person.birth_year,
        homeworld: (person, _, context) => context.loader.load(person.homeworld),
        films: (person, _, context) => context.loader.loadMany(person.films),
        species: (person, _, context) => context.loader.loadMany(person.species),
        starships: (person, _, context) => context.loader.loadMany(person.starships),
        vehicles: (person, _, context) => context.loader.loadMany(person.vehicles),
    },
});
//# sourceMappingURL=people.js.map