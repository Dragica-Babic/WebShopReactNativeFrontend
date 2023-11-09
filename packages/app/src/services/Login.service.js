

const login= async(username, password)=>{
  const response=await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password:password
    }),
  });
  return response.json();
}

const LoginService={
  login
}

export default LoginService;