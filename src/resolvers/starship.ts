import { getPageFetcher } from "../services/swapi";

const path = "/starships";

export default (fetch) => ({
  Query: {
    allStarships: (_, params) => getPageFetcher(fetch)(path, params.offset),
    starship: (_, params) =>
      fetch(params.id || `${path}/${params.starshipID}/`),
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
