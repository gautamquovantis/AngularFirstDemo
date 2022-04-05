import { Profile } from 'src/app/shared/Models/profile.model';
export class Friends {
  id!:string;
  friends!: Profile[]

  constructor(data?: Friends) {
    this.id = data ? data.id : '';
    this.friends = data ? data.friends :[];
  }
}
