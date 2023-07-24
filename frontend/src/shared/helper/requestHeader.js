const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;

const Header = () => {
  return {
    headers: {
      token: `Bearer ${BearerToken()}`,
    },
  };
};

export { Header };
