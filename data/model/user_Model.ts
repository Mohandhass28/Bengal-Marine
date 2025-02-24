import { UserEntity } from "@/domain/entity/User_entity";

export class userModle implements UserEntity {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
