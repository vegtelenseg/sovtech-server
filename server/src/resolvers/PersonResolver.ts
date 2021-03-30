import { Resolver, Query, FieldResolver, Root, Arg } from "type-graphql";
import { Person } from "../schema/Person";
import axios from "axios";
import { baseURL } from "../index";

@Resolver((of) => Person)
export class PersonResolver {
  @Query((returns) => [Person])
  async people(
    @Arg("name", {
      nullable: true,
    })
    name?: string
  ) {
    let url = `${baseURL}/people`;
    if (name) {
      url = `${url}/?search=${name}`;
    }
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
