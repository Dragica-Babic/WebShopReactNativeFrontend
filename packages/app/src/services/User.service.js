import url from '../environment/config.json';

const login = async (username, password) => {
  const response = await fetch(url.url + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password
    }),
  });
  if (!response.ok) {
    throw new Error("Pogresni kredencijali!");
  }
  return response.json();
}

const signup = async (request) => {
  const response = await fetch(url.url + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: request.name,
      surname: request.surname,
      username: request.username,
      password: request.password,
      email: request.email,
      address: request.email
    })
  });
  if (!response.ok) {
    throw new Error("Greska!");
  }
  return response.json();
}

const updateUser = async (id, request) => {
  const response = await fetch(url.url + `/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: request.name,
      surname: request.surname,
      username: request.username,
      password: request.password,
      email: request.email,
      address: request.email
    })
  });
  if (!response.ok) {
    throw new Error("Greska!");
  }
  return response.json();
}

const getUserById = async ({ userId }) => {
  try {
    const response = await fetch(url.url + `/users/${userId}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error)
  }
}

const UserService = {
  login,
  signup,
  updateUser,
  getUserById
}

export default UserService;