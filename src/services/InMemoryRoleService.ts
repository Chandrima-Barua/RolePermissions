import { RoleId, RoleService, demoPermissions, demoRoles } from './RoleService';
import { Role, Permission } from './RoleService';

export class InMemoryRoleService implements RoleService {
  private roles: Role[] = [...demoRoles];
  private permissions: Permission[] = [...demoPermissions];


  async getRoles(): Promise<Role[]> {
    return Promise.resolve([...this.roles]);
  }

  async getPermissions(): Promise<Permission[]> {
    return Promise.resolve([...this.permissions]);
  }

  async setPermissionsForRole(roleId: RoleId, permissions: Permission[]): Promise<Role> {
    let role = this.roles.find((r) => r.id === roleId);
    console.log(...this.permissions)
    if (!role) {
      role = { id: roleId, name: `Role ${this.roles.length + 1}`, permissions: [] };
      this.roles.push(role);
    }

    role.permissions = permissions.map((permission) => ({
      id: permission.id,
      name: permission.name,
    }));

    return Promise.resolve({ ...role });
  }

}
