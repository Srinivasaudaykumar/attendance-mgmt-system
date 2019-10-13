import { IUser } from 'app/core/user/user.model';

export interface IOrganization {
  id?: number;
  name?: string;
  address?: string;
  users?: IUser[];
}

export class Organization implements IOrganization {
  constructor(public id?: number, public name?: string, public address?: string, public users?: IUser[]) {}
}
