import rand from "../lib/rand";

export namespace UsersNS {
  export interface Users {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    role: string;
    phone: string;
    birthday: string;
    ctime: number;
    mtime: number;
  }

  export interface CreateUsersParams {
    username: string;
    first_name: string;
    last_name: string;
    role: string;
    phone: string;
    birthday: string;
  }

  export interface UpdateUsersParams {
    first_name?: string;
    last_name?: string;
    role?: string;
    phone?: string;
    birthday?: string;
  }

  export interface BLL {
    ListUsers(): Promise<Users[]>;
    GetUsers(id: string): Promise<Users>;
    GetUsersByUsersname(username: string): Promise<Users>;
    CreateUsers(params: CreateUsersParams): Promise<Users>;
    UpdateUsers(id: string, params: UpdateUsersParams): Promise<void>;
    DeleteUsers(id: string): Promise<Users>;
  }

  export interface DAL {
    ListUsers(): Promise<Users[]>;
    GetUsers(id: string): Promise<Users>;
    GetUsersByUsersname(username: string): Promise<Users>;
    CreateUsers(User: Users): Promise<void>;
    UpdateUsers(User: Users): Promise<void>;
    DeleteUsers(id: string): Promise<void>;
  }

  export const Errors = {
    ErrUserNotFound: new Error("Username not found"),
    ErrUsernameExisted: new Error("Username existed"),
  };

  export const Generator = {
    NewOrgId: () => rand.uppercase(8), // colision 2^20
    NewUserId: () => rand.uppercase(12), // collision 2^30
  };
}
