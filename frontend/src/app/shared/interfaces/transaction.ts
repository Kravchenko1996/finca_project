import {Deserializable} from "./deserializable";

export class Transaction implements Deserializable {
  id: number;
  category: number;
  summary: number;
  month: string;
  description: string;

  deserialize(input: object): this {
    Object.assign(this, input);
    return this;
  }
}
