//   roles: ["ROLE_USER", "ROLE_MODERATOR", "ROLE_ADMIN", "ROLE_MODIFY"],

const data1 = {
  id: 1,
  username: "juan",
  eemail: "juan.albistur@gmail.com",
  password: "ja123456",
  accessToken: "jjjjuuuuaaaannnnaaaallllbbbbiiiissssttttuuuurrrr",
  roles: ["ROLE_MODIFY"],
  entity: "EEM",
};

export const register = (
  username: string,
  eemail: string,
  password: string,
  entity: string
) => {
  console.log(username, password, eemail, entity);
  //
  return {
    username,
    password,
    eemail,
    entity,
  };
};

const data = data1;

export const login = (
  username?: string,
  password?: string,
  entity?: string
) => {
  console.log(username, password, entity);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  }
  //
  return null;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  //if (userStr) return JSON.parse(userStr);
  if (userStr) return data;
  //
  return null;
};
