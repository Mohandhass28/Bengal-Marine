import { AuthModelType } from "@/core/types/Auth/authModelType";
import { AuthEntity } from "@/domain/entity/Auth_entity";

export class AuthModel implements AuthEntity {
  userID: string;
  yardID: string;

  constructor(userID: string, yardID: string) {
    this.userID = userID;
    this.yardID = yardID;
  }

  static fromJson(jsonStr: string): AuthModel {
    return AuthModel.fromMap(JSON.parse(jsonStr));
  }

  static fromMap(fromlocal: AuthModelType): AuthModel {
    return new AuthModel(fromlocal.userID, fromlocal.yardID);
  }

  toJson(): string {
    return JSON.stringify(this.toMap());
  }
  toMap(): Record<string, any> {
    return { userID: this.userID, yardID: this.yardID };
  }
}
