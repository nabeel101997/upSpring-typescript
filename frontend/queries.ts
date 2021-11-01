interface EnteredData {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

interface LoginData {
  email: String
  password: String
}

export const userLogin = async (loginData: LoginData) => {
  const response = await fetch('http://localhost:8080/users/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}

export const getProfile = async () => {
  const token = localStorage.getItem('accessToken');
  var headers = {
    'Content-type': 'application/json',
    'token': 'Bearer ' + token
  }
  const response = await fetch('http://localhost:8080/users/dashboard', {
    method: 'GET',
    headers: headers
  });
  const data = await response.json();
  return data;
}

export const getUsers = async () => {
  const token = localStorage.getItem('accessToken');
  var headers = {
    'Content-type': 'application/json',
    'token': 'Bearer ' + token
  }
  const response = await fetch('http://localhost:8080/users', {
    method: 'GET',
    headers: headers
  });
  const data = await response.json();
  return data;
}

export const addRecord = async (enteredMeetupData: EnteredData) => {
  const response = await fetch('http://localhost:8080/users', {
    method: 'POST',
    body: JSON.stringify(enteredMeetupData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}