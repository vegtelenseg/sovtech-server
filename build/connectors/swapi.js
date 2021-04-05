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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageFetcher = exports.fetchBySearchPhrase = exports.getAxiosRequestObject = void 0;
const axios_1 = __importDefault(require("axios"));
const getAxiosRequestObject = (baseUrl) => {
    return (resource) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const url = resource.startsWith("http") ? resource : baseUrl + resource;
            console.log(`fetch: ${url}`);
            const { data } = yield axios_1.default.get(url);
            return data;
        }
        catch (error) {
            console.log("Could not fetch data: ", error.message);
        }
    });
};
exports.getAxiosRequestObject = getAxiosRequestObject;
const fetchBySearchPhrase = (fetch) => {
    return (resource, name) => __awaiter(void 0, void 0, void 0, function* () {
        const person = yield fetch(`${resource}/?search=${name}`);
        return person.results;
    });
};
exports.fetchBySearchPhrase = fetchBySearchPhrase;
const getPageFetcher = (fetch) => (resource, offset, limit = 10) => __awaiter(void 0, void 0, void 0, function* () {
    let results = [];
    let index = 0;
    const pagination = (pageURL) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield fetch(pageURL);
        // fast forward until offset is reached
        if (offset && results.length === 0) {
            if (index + data.results.length > offset) {
                results = data.results.slice(offset - index);
            }
            if (data.next) {
                index = index + data.results.length;
                return yield pagination(data.next);
            }
            else {
                return results;
            }
        }
        else {
            if (limit > 0 && limit - results.length - data.results.length < 0) {
                results = [
                    ...results,
                    ...data.results.slice(0, limit - results.length),
                ];
            }
            else {
                results = [...results, ...data.results];
            }
            if (data.next && (limit === 10 || limit - results.length > 0)) {
                return yield pagination(data.next);
            }
            else {
                return results;
            }
        }
    });
    return pagination(resource);
});
exports.getPageFetcher = getPageFetcher;
//# sourceMappingURL=swapi.js.map