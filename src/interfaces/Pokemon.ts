export enum PokeTypes {
  Fire = "fire",
  Water = "water",
  Grass = "grass",
  Poison = "poison",
  Normal = "normal",
  Flying = "flying",
  Bug = "bug",
  Electric = "electric",
  Ground = "ground",
  Fairy = "fairy",
  Fighting = "fighting",
  Psychic = "psychic",
  Rock = "rock",
  Steel = "steel",
  Ghost = "ghost",
}
[];

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: PokeTypes;
  attack: number;
  hp: number;
}
