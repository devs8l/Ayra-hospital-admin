
const BASE_URL = "https://p01--ayra-backend--5gwtzqz9pfqz.code.run";

// tenant signup
export const tenantSignup = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/tenant/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.tenantName,
        domain: data.domain,
        nin: data.npi,
        address: data.address
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Signup failed: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Tenant signup failed:", error.message);
    return {
      success: false,
      message: error.message || 'Request failed. Please try again after sometime.'
    };
  }
};
// user signup
export const userSignup = async (data) => {
  try {

    const response = await fetch(`${BASE_URL}/auth/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenant_id: data.tenantId,
        identifier: data.email,
        email: data.email,
        password: data.password,
        user_type: 'doctor',
        display_name: data.display_name,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Signup failed: ${response.status}`);
    }

    const result = await response.json();
    console.log("User signup successful:", result);

    return { success: true, data: result };
  } catch (error) {
    console.error("User signup failed:", error.message);
    return {
      success: false,
      message: error.message || 'Signup failed. Please try again.'
    };
  }
};


// user login
export const userLogin = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Login failed: ${response.status}`);
    }

    const result = await response.json();
    // Store access token in localStorage
    if (result.access_token) {
      localStorage.setItem('token', result.access_token);
      if (result.tenant_info?.tenant_id) {
        localStorage.setItem('tenantId', result.tenant_info.tenant_id);
      }
    }
    return { success: true, data: result };
  } catch (error) {
    console.error("user login failed:", error.message);
    return {
      success: false,
      message: error.message || 'Login failed. Please try again.'
    };
  }
};



// change password
export const changePassword = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenant_id: data.tenantId,
        identifier: data.email,
        old_password: data.oldPassword,
        new_password: data.newPassword
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Password change failed: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Password change failed:", error.message);
    return {
      success: false,
      message: error.message || 'Password change failed. Please try again.'
    };
  }
};


// get current user details
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch user details: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to get current user:", error.message);
    return {
      success: false,
      message: error.message || 'Failed to fetch user details. Please try again.'
    };
  }
};