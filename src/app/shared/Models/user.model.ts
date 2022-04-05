export class User {
  id!:string;
  fullName!: string;
  mobile!: string;
  email!: string;
  password!: string;

  constructor(data?: User) {
    this.id = data ?data.id:'';
    this.fullName = data ? data.fullName : '';
    this.mobile = data ? data.mobile : '';
    this.email = data ? data.email : '';
    this.password = data ? data.password : '';
  }
}
