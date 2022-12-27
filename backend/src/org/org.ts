import rand from "../lib/rand";

export namespace OrgNS {
  export enum Role {
    BacSi = 'bac_si',
    TiepDon = 'tiep_don',
    ThuNgan = 'thu_ngan',
    DuocSi = 'duoc_si',
    XetNghiem = 'xet_nghiem',
    XQuang = "x_quang",
    NoiSoi = "noi_soi",
    SieuAm = "sieu_am",
    CapCuu = "cap_cuu"
  }

  export interface Org {
    id: string;
    name: string;
    ctime: number;
    mtime: number;
  }

  export interface User {
    id: string;
    org_id: string;
    username: string;
    first_name: string;
    last_name: string;
    role: Role;
    phone: string;
    birthday: string;
    ctime: number;
    mtime: number;
  }

  export interface CreateOrgParams {
    name: string;
  }

  export interface UpdateOrgParams {
    name?: string;
  }

  export interface CreateUserParams {
    username: string;
    org_id: string;
    first_name: string;
    last_name: string;
    role: Role;
    phone: string;
    birthday: string;
  }

  export interface UpdateUserParams {
    first_name?: string;
    last_name?: string;
    role?: Role;
    phone?: string;
    birthday?: string;
  }

  export interface BLL {
    ListOrg(): Promise<Org[]>;
    CreateOrg(params: CreateOrgParams): Promise<Org>;
    ListUser(): Promise<User[]>;
    GetUser(id: string): Promise<User>;
    GetUserByUsername(username: string): Promise<User>;
    CreateUser(params: CreateUserParams): Promise<User>;
    UpdateUser(id: string, params: UpdateUserParams): Promise<void>;
    DeleteUser(id: string): Promise<User>;
  }

  export interface DAL {
    ListOrg(): Promise<Org[]>;
    CreateOrg(Org: Org): Promise<void>;
    ListUser(): Promise<User[]>;
    GetUser(id: string): Promise<User>;
    GetUserByUsername(username: string): Promise<User>;
    CreateUser(User: User): Promise<void>;
    UpdateUser(User: User): Promise<void>;
    DeleteUser(id: string): Promise<void>;
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
