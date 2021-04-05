import axios from "axios";
import { Logger } from "../logger/Logger";

export interface DataFetcher {
  (resource: string): Promise<any>;
}

export const getAxiosRequestObject = (baseUrl: string): DataFetcher => {
  return async (resource: string): Promise<any> => {
    try {
      const url = resource.startsWith("http") ? resource : baseUrl + resource;
      Logger.info(`${url}: ${new Date()}`);
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      Logger.info(`swapi.axios.get:, ${error.message}`);
    }
  };
};

export const fetchBySearchPhrase = (fetch: DataFetcher) => {
  return async (resource: string, name: string) => {
    try {
      Logger.info(`swapi.fetchBySearchPhrase.person.init:`);
      const person = await fetch(`${resource}/?search=${name}`);
      Logger.info(`swapi.fetchBySearchPhrase.person.success:, ${name}`);
      return person.results;
    } catch (error) {
      Logger.error(`swapi.fetchBySearchPhrase.get.fail:, ${error.message}`);
    }
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
    try {
      Logger.info(`swapi.pagination.get.init: , ${pageURL}, at: ${new Date()}`);
      const page = await fetch(pageURL);
      results = results.concat(page.results);
      if (page && page.next !== null) {
        Logger.error(`swapi.pagination.get.success at: ${new Date()}`);
        return await pagination(page.next);
      } else {
        const newOffset = offset <= 0 ? 0 : offset - 1;
        const start = newOffset * PAGE_SIZE;
        const newResults = results.slice(start, start + PAGE_SIZE);
        return newResults;
      }
    } catch (error) {
      Logger.error(
        `swapi.pagination.get.fail: , ${error.message}, at: ${new Date()}`
      );
    }
  };
  return pagination(resource);
};
