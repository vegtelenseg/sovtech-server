import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Arg,
  ArgsType,
  Args,
  Field,
  Int,
} from "type-graphql";
import { Person } from "../schema/Person";
import axios from "axios";
import { baseURL } from "../index";
import fetch from "node-fetch";

@ArgsType()
class PaginationArgs {
  @Field((returns) => Int)
  offset: number;

  @Field((returns) => Int, { defaultValue: 5 })
  limit: number;
}

@Resolver((of) => Person)
export class PeopleResolver {
  @Query((returns) => [Person])
  async people(@Args() peopleArgs: PaginationArgs) {
    const { offset, limit } = peopleArgs;

    // TODO: type get request as <Person>
    const { data } = await axios.get(`${baseURL}/people/?page=${offset}`);
    //TODO: Make pagination generic/reusable
    const finalResults = data.results.slice(0, limit);
    return finalResults;
  }

  @Query((returns) => [Person])
  async person(@Arg("name") name: string) {
    const url = `${baseURL}/people/?search=${name}`;
    // TODO: type get request as <Person>
    const { data } = await axios.get(url);
    return data.results;
  }
  @FieldResolver()
  async homeworld(@Root() person: Person) {
    const { homeworld } = person;
    const { data } = await axios.get(homeworld);
    return data;
  }
}
