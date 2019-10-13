import { Moment } from 'moment';
import { IAccessCard } from 'app/core/accesscard/access-card.model';
import { IUser } from 'app/core/user/user.model';

export interface IAttendenceEntry {
  id?: number;
  createdDate?: Moment;
  machineId?: string;
  accessCard?: IAccessCard;
  user?: IUser;
}

export class AttendenceEntry implements IAttendenceEntry {
  constructor(
    public id?: number,
    public createdDate?: Moment,
    public machineId?: string,
    public accessCard?: IAccessCard,
    public user?: IUser
  ) {}
}
