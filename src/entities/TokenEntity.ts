import { BaseEntity } from "./baseEntity";
import { User } from "../models/user";
import * as jwt from "jsonwebtoken";

export class TokenEntity extends BaseEntity {
  private token: string;
  private authType: string;
  private tokenType: string;

  public constructor(user: User) {
    super();
    // 用 jwt 来生成 token
    const token = jwt.sign({ id: user.id, token: user.token }, "secret");
    this.token = token;
    this.authType = "bearer";
    this.tokenType = "jwt";
  }
}
