import axios from "axios";

export interface IFetcher {
  (resource: string): Promise<any>;
}

export const getAxiosRequestObject = (baseUrl: string): IFetcher => {
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

export const fetchBySearchPhrase = (fetch: IFetcher) => {
  return async (resource: string, name: string) => {
    const person = await fetch(`${resource}/?search=${name}`);
    return person.results;
  };
};
export const getPageFetcher = (fetch: IFetcher) => async (
  resource: string,
  offset?: number,
  limit = 10
) => {
  let results = [];
  let index = 0;
  const pagination = async (pageURL: string) => {
    const data = await fetch(pageURL);
    // fast forward until offset is reached
    if (offset && results.length === 0) {
      if (index + data.results.length > offset) {
        results = data.results.slice(offset - index);
      }
      if (data.next) {
        index = index + data.results.length;
        return await pagination(data.next);
      } else {
        return results;
      }
    } else {
      if (limit > 0 && limit - results.length - data.results.length < 0) {
        results = [
          ...results,
          ...data.results.slice(0, limit - results.length),
        ];
      } else {
        results = [...results, ...data.results];
      }
      if (data.next && (limit === 10 || limit - results.length > 0)) {
        return await pagination(data.next);
      } else {
        return results;
      }
    }
  };

  return pagination(resource);
};
