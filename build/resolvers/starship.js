"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swapi_1 = require("../connectors/swapi");
const path = "/starships";
exports.default = (fetch) => ({
    Query: {
        allStarships: (_, params) => swapi_1.getPageFetcher(fetch)(path, params.offset, params.limit),
        starship: (_, params) => fetch(params.id || `${path}/${params.starshipID}/`),
    },
    Starship: {
        id: (starship) => starship.url,
        costInCredits: (starship) => starship.cost_in_credits,
        maxAtmospheringSpeed: (starship) => starship.max_atmosphering_speed,
        cargoCapacity: (starship) => starship.cargo_capacity,
        hyperdriveRating: (starship) => starship.hyperdrive_rating,
        starshipClass: (starship) => starship.starship_class,
        pilots: (starship, _, context) => context.loader.loadMany(starship.pilots),
        films: (starship, _, context) => context.loader.loadMany(starship.films),
    },
});
//# sourceMappingURL=starship.js.map