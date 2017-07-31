import { Person } from '../person/person';

export interface Debit {
  id?: number;
  target?: Person;
  registrant?: Person;
  description?: String;
  createDate?: Date;
  updateDate?: Date;
  value?: number;
}
