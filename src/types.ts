import type { ValidationError } from "class-validator";
import type { FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import type { User } from "./entity/User";

export type EntityValidationError = Error & {
  validationErrors: ValidationError[];
};

export type AccessTokenClaims = {
  user_id: string;
  iat: number;
  exp: number;
};

export type APIRequest<T extends RouteGenericInterface = {}> = FastifyRequest<
  T & {
    Querystring: T["Querystring"] & { accessToken?: string };
  }
> & { authenticate: () => Promise<User>; getCurrentUser: () => Promise<User | undefined> };

export enum TaskStatus {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}
