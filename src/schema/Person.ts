import { ObjectType } from "type-graphql/dist/decorators/ObjectType";
import { Field } from "type-graphql";
import { Homeworld } from "./Homeworld";

type Gender = "male" | "female" | "n/a";

@ObjectType({
  simpleResolvers: true,
})
export class Person {
  @Field()
  name: string;

  @Field()
  height: string;

  @Field()
  age: string;

  @Field()
  mass: string;

  @Field()
  gender: Gender;

  @Field((returns) => Homeworld)
  homeworld: string;
}
