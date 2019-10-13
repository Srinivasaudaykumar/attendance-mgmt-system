import { IAttendenceEntry } from 'app/shared/model/attendance-entry.model';
import { IUser } from 'app/core/user/user.model';

export interface IAccessCard {
  id?: number;
  cardNumber?: string;
  attendenceEntries?: IAttendenceEntry[];
  user?: IUser;
}

export class AccessCard implements IAccessCard {
  constructor(public id?: number, public cardNumber?: string, public attendenceEntries?: IAttendenceEntry[], public user?: IUser) {}
}
