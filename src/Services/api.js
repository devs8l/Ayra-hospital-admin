
const API_BASE_URL = 'https://p01--ayra-backend--5gwtzqz9pfqz.code.run';

export const getTenants = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/tenants`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tenants:', error);
    throw error;
  }
};
export const getTenantUsers = async (tenantId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/tenants/${tenantId}/users`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tenant users:', error);
    throw error;
  }
};