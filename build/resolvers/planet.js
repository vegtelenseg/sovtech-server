"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const swapi_1 = require("../connectors/swapi");
const path = "/planets/";
exports.default = (fetch) => ({
    Query: {
        allPlanets: (_, params) => swapi_1.getPageFetcher(fetch)(path, params.offset, params.limit),
        planet: (_, params) => __awaiter(void 0, void 0, void 0, function* () {
            const planet = yield fetch(params.id || `${path}${params.planetID}/`);
            console.log("PALANE: ", planet);
            return planet.results[0];
        }),
    },
    Planet: {
        id: (planet) => planet.url,
        rotationPeriod: (planet) => planet.rotation_period,
        orbitalPeriod: (planet) => planet.orbital_period,
        surfaceWater: (planet) => planet.surface_water,
        residents: (planet, _, context) => context.loader.loadMany(planet.residents),
        films: (planet, _, context) => context.loader.loadMany(planet.films),
    },
});
//# sourceMappingURL=planet.js.map