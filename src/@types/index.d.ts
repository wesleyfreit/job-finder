export interface User {
  id: number;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    export interface Locals {
      user?: User;
    }
  }
}

declare module 'express-session' {
  export interface Session {
    user?: User;
  }
}
