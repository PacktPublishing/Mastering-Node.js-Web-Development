export interface Credentials {
    username: string;
    hashedPassword: Buffer;
    salt: Buffer;
}

export interface Role {
    name: string;
    members: string[];
}

export interface AuthStore {

    getUser(name: string) : Promise<Credentials | null>;

    storeOrUpdateUser(username: string, password: string): 
        Promise<Credentials>;

    validateCredentials(username: string, password: string): Promise<boolean>

    getRole(name: string) : Promise<Role | null>;

    getRolesForUser(username: string): Promise<string[]>;

    storeOrUpdateRole(role: Role) : Promise<Role>;

    validateMembership(username: string, role: string): Promise<boolean>;
}
