import { Person } from '../person/person';

export interface Credit {
  id?: number;
  benefited?: Person;
  registrant?: Person;
  description?: String;
  createDate?: Date;
  updateDate?: Date;
  value?: number;
}
