import { Raw } from "typeorm";
import { User } from "../entities/user";

export const caseInsensitiveQuery = (value: string) =>
  Raw((alias) => `LOWER(${alias}) Like LOWER(:value)`, {
    value: `%${value}%`,
  });

export const findUserByEmail = (email: string) =>
  User.findOne({
    where: {
      email: caseInsensitiveQuery(email),
    },
  });
