"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swapi_1 = require("../connectors/swapi");
const path = "/vehicles";
exports.default = (fetch) => ({
    Query: {
        allVehicles: (_, params) => swapi_1.getPageFetcher(fetch)(path, params.offset, params.limit),
        vehicle: (_, params) => fetch(params.id || `${path}/${params.vehicleID}/`),
    },
    Vehicle: {
        id: (vehicle) => vehicle.url,
        costInCredits: (vehicle) => vehicle.cost_in_credits,
        maxAtmospheringSpeed: (vehicle) => vehicle.max_atmosphering_speed,
        cargoCapacity: (vehicle) => vehicle.cargo_capacity,
        vehicleClass: (vehicle) => vehicle.vehicle_class,
        pilots: (vehicle, _, context) => context.loader.loadMany(vehicle.pilots),
        films: (vehicle, _, context) => context.loader.loadMany(vehicle.films),
    },
});
//# sourceMappingURL=vehicle.js.map