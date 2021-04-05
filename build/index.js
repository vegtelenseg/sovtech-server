"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
const apollo_server_1 = require("apollo-server");
const schemas_1 = __importDefault(require("./schemas"));
const resolvers_1 = __importDefault(require("./resolvers"));
const swapi_1 = require("./connectors/swapi");
const dataloader_1 = __importDefault(require("dataloader"));
const API_URI = process.env.API_URI || "https://swapi.dev/api";
const axiosRequestObject = swapi_1.getAxiosRequestObject(API_URI);
exports.loader = new dataloader_1.default((urls) => {
    const promises = urls.map((url) => axiosRequestObject(url));
    return Promise.all(promises);
}, { batch: false });
const resolvers = resolvers_1.default(axiosRequestObject);
const apolloServer = new apollo_server_1.ApolloServer({
    typeDefs: schemas_1.default,
    resolvers,
    context: {
        loader: exports.loader,
    },
});
const PORT = process.env.PORT || 5000;
apolloServer.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
//# sourceMappingURL=index.js.map