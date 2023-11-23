export class User {

  id?: number;
  name?: string;
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  photo?: string;
  active?: boolean;
  token?: string;
  roles?: string[];
  authorities?: string[];

  constructor(id?: number, name?: string, username?: string, password?: string, email?: string, phone?: string, address?: string, city?: string, state?: string, zip?: string, country?: string, photo?: string, active?: boolean, token?: string, roles?: string[], authorities?: string[]) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
    this.photo = photo;
    this.active = active;
    this.token = token;
    this.roles = roles;
    this.authorities = authorities;
  }

}
