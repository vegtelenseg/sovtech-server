import axios from "axios";

export interface DataFetcher {
  (resource: string): Promise<any>;
}

export const getAxiosRequestObject = (baseUrl: string): DataFetcher => {
  return async (resource: string): Promise<any> => {
    try {
      const url = resource.startsWith("http") ? resource : baseUrl + resource;
      console.log(`fetch: ${url}`);
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log("Could not fetch data: ", error.message);
    }
  };
};

export const fetchBySearchPhrase = (fetch: DataFetcher) => {
  return async (resource: string, name: string) => {
    const person = await fetch(`${resource}/?search=${name}`);
    return person.results;
  };
};

export const getPageFetcher = (fetch: DataFetcher) => async (
  resource: string,
  offset?: number
  // limit = 10
) => {
  let results = [];
  let index = 0;
  // TODO: Move to constants
  const PAGE_SIZE = 10;
  const pagination = async (pageURL: string) => {
    const page = await fetch(pageURL);
    results = results.concat(page.results);
    if (page.next !== null) {
      return await pagination(page.next);
    } else {
      const newOffset = offset <= 0 ? 0 : offset - 1;
      const start = newOffset * PAGE_SIZE;
      const newResults = results.slice(start, start + PAGE_SIZE);
      return newResults;
    }
  };
  return pagination(resource);
};
