"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const film_1 = __importDefault(require("./film"));
const people_1 = __importDefault(require("./people"));
const planet_1 = __importDefault(require("./planet"));
const species_1 = __importDefault(require("./species"));
const starship_1 = __importDefault(require("./starship"));
const vehicle_1 = __importDefault(require("./vehicle"));
exports.default = (fetch) => Object.assign({}, film_1.default(fetch), people_1.default(fetch), planet_1.default(fetch), species_1.default(fetch), starship_1.default(fetch), vehicle_1.default(fetch), {
    Query: Object.assign({}, film_1.default(fetch).Query, people_1.default(fetch).Query, planet_1.default(fetch).Query, species_1.default(fetch).Query, starship_1.default(fetch).Query, vehicle_1.default(fetch).Query),
});
//# sourceMappingURL=index.js.map