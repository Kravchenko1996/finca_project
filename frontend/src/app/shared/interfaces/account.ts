import {Deserializable} from './deserializable';

export class Account implements Deserializable {
  id: number;
  name: string;

  deserialize(input: object): this {
    Object.assign(this, input);
    return this;
  }
}
