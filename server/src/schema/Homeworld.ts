import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Homeworld {
  @Field()
  name: string;

  @Field()
  rotation_period: string;

  @Field()
  orbital_period: string;

  @Field()
  diameter: string;

  @Field()
  climate: string;

  @Field()
  gravity: string;

  @Field()
  terrain: string;

  @Field()
  surface_water: string;

  @Field()
  population: string;
}
