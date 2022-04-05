export class Profile {
  id!:string;
  name!: string;
  gender!: string;
  age!: string;
  state!: string;
  country!: string;
  hobby!:string;

  constructor(data?: Profile) {
    this.id = data ? data.id : '';
    this.name = data ? data.name : '';
    this.gender = data ? data.gender : '';
    this.age = data ? data.age : '';
    this.state = data ? data.state : '';
    this.country = data ? data.country : '';
    this.hobby = data ? data.hobby : '';
  }
}
