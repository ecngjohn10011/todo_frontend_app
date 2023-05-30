export interface PayloadData {
  fresh: boolean;
  iat: number;
  jti: string;
  id: string;
  type: string;
  sub: string;
  nbf: number;
  exp: number;
  scope: string[];
  given_name: string;
  family_name: string;
}

export interface Todo {
  todo: string;
  completed: boolean;
}

export interface TodoPost {
  todo: string;
}
