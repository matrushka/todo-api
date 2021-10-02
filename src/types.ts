import { ValidationError } from "class-validator";

export type EntityValidationError = Error & {
  validationErrors: ValidationError[];
};

export type AccessTokenClaims = {
  user_id: string;
  iat: number;
  exp: number;
};
