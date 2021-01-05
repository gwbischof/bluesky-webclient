import decodeJwt from 'jwt-decode';
import axios from "axios";

var axiosUserInstance = axios.create({
  baseURL: process.env.REACT_APP_USER_API_PREFIX,
});

export const loginAPI = async(email: string, password: string): Promise<Object> => {
  const res = await axiosUserInstance.post('auth/login',
      {
          email: email,
          password: password,
      });
  console.log(res);
  return res.data;
}

export const registerAPI = async(firstName: string, lastName: string, email: string, password: string): Promise<Object> => {
  const res = await axiosUserInstance.post('auth/register',
      {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
      });
  console.log(res);
  return res.data;
}

/*
  register = async (firstName, lastName, email, password) => {

    // Create data JSON
    const formData = {
      "email": email,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
    }
    // Create request
    const request = new Request('http://localhost:9000/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    // Fetch request
    const response = await fetch(request);
    // 500 error handling
    if (response.status === 500) {
      throw new Error('Internal server error');
    }
    // 400 error handling
    const data = await response.json();
    if (response.status >= 400 && response.status < 500) {
      if (data.detail) {
        throw data.detail;
      }
      throw data;
    }
    // Successful login handling
    if ('access_token' in data) {
      // eslint-disable-next-line
      const decodedToken = decodeJwt(data['access_token']);
      // console.log(decodedToken)
      localStorage.setItem('token', data['access_token']);
      localStorage.setItem('permissions', 'user');
    }
    return data;
  };

  logout = (callback) => {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    // Using a callback to load '/' when logout is called
    callback();
  };
*/

  getUser = async () => {
    const token = localStorage.getItem('token');
    // Create request
    const request = new Request('http://localhost:9000/auth/users/me', {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`}
    });
    // Fetch request
    const response = await fetch(request);
    const data = await response.json();
    return data
  };

  isAuthenticated = () => {
    const permissions = localStorage.getItem('permissions');
    if (!permissions) {
      return false;
    }
    return permissions === 'user' ? true : false;
  };
}

export default new Auth();

*/