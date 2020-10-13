import {Deserializable} from './deserializable';

export class Category implements Deserializable {
  id: number;
  name: string;
  account: number;

  deserialize(input: object): this {
    Object.assign(this, input);
    return this;
  }
}
