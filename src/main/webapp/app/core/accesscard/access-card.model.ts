import { IAttendanceEntry } from 'app/shared/model/attendance-entry.model';
import { IUser } from 'app/core/user/user.model';

export interface IAccessCard {
  id?: number;
  cardNumber?: string;
  attendanceEntries?: IAttendanceEntry[];
  user?: IUser;
}

export class AccessCard implements IAccessCard {
  constructor(public id?: number, public cardNumber?: string, public attendanceEntries?: IAttendanceEntry[], public user?: IUser) {}
}
