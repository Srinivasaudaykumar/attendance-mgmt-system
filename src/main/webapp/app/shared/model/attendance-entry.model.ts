import { Moment } from 'moment';
import { IAccessCard } from 'app/core/accesscard/access-card.model';
import { IUser } from 'app/core/user/user.model';

export interface IAttendanceEntry {
  id?: number;
  createdDate?: Moment;
  machineId?: string;
  accessCard?: IAccessCard;
  user?: IUser;
}

export class AttendanceEntry implements IAttendanceEntry {
  constructor(
    public id?: number,
    public createdDate?: Moment,
    public machineId?: string,
    public accessCard?: IAccessCard,
    public user?: IUser
  ) {}
}
