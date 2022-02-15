import { Authenticator } from "passport";

export const strategies: {[key: string]: Authenticator} = {};
export const authenticate = (
  srategy:string = process.env.AUTH_STRATEGY || 'local'
) =>
  strategies[srategy];
