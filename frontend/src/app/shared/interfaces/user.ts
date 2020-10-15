import {Deserializable} from './deserializable';

export class User implements Deserializable {
  id: number;
  email: string;
  password: string;

  deserialize(input: object): this {
    Object.assign(this, input);
    return this;
  }
}
