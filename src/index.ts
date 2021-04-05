import { ApolloServer } from "apollo-server";
import typeDefs from "./schemas";
import LoadResolvers from "./resolvers";
import { getAxiosRequestObject } from "./services/swapi";
import DataLoader from "dataloader";

const API_URI = process.env.API_URI || "https://swapi.dev/api";

const axiosRequestObject = getAxiosRequestObject(API_URI);

export const loader = new DataLoader(
  (urls: string[]) => {
    const promises = urls.map((url) => axiosRequestObject(url));
    return Promise.all(promises);
  },
  { batch: false }
);

const resolvers = LoadResolvers(axiosRequestObject);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    loader,
  },
});

const PORT = process.env.PORT || 5000;
apolloServer.listen(PORT, () =>
  console.log(`Server has started on port: ${PORT}`)
);
