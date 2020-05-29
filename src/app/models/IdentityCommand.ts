export interface IdentityCommand {
  login:string;
  password:string;
}

export interface IdentityResponse {
  token:string;
}
