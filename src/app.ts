import express from 'express';
import bodyParser, { json } from 'body-parser';
import { InMemoryRoleService } from './services/InMemoryRoleService';
import { RoleService } from './services/RoleService';

const app = express();
const port = 3000;
const roleService: RoleService = new InMemoryRoleService();

app.use(bodyParser.json());

// retrive roles
app.get('/roles', async (req, res) => {
  try {
    const roles = await roleService.getRoles();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// retrive permissions
app.get('/permissions', async (req, res) => {
  try {
    const permissions = await roleService.getPermissions();
    res.json(permissions);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// set permissions for role
app.post('/roles/:roleId/permissions', async (req, res) => {
  const { roleId } = req.params;
  const { permissions } = req.body;
  try {
    const updatedRole = await roleService.setPermissionsForRole(roleId, permissions);
    res.json(updatedRole);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});