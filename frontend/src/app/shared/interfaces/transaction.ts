import {Deserializable} from './deserializable';

export class Transaction implements Deserializable {
  id: number;
  category: number;
  summary: number;
  date: string;
  description: string;
  account: number;

  deserialize(input: object): this {
    Object.assign(this, input);
    return this;
  }
}
