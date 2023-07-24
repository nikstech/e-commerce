import React, { useState } from "react";
import { loginReq } from "../apiCall/authReq";
import { useDispatch } from "react-redux";
import { authUserAction } from "src/redux/slices/AuthSlice";
import { loginSignupModalToggle } from "src/redux/slices/LayoutSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    passwaord: "",
    error: false,
    loading: false,
  });
  const alert = msg => {
    <div className={`text-sm text-red-500`}>{msg}</div>;
  };
  const formData = async () => {
    try {
      setData({
        ...data,
        loading: false,
      });
      // axios.post(`${apiUrl}/api/signin`, data);
      let { data: responseData } = await loginReq({
        email: data.email,
        password: data.password,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
        });
      } else if (responseData.token) {
        setData({
          email: "",
          passwaord: "",
          error: false,
          loading: false,
        });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        dispatch(authUserAction(responseData));
        dispatch(loginSignupModalToggle(false));
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="text-center text-2xl mb-6">Login</div>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">
            Username or email address
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            type="email"
            id="name"
            value={data.email}
            className="px-4 py-2 focus:outline-none border"
            onChange={e => {
              setData({
                ...data,
                email: e.target.value,
                error: false,
              });
            }}
          />
          {data.error && alert(data.error)}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            value={data.password}
            type="password"
            id="password"
            className="px-4 py-2 focus:outline-none border"
            onChange={e => {
              setData({
                ...data,
                password: e.target.value,
                error: false,
              });
            }}
          />
          {data.error && alert(data.error)}
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              className="px-4 py-2 focus:outline-none border mr-1"
            />
            <label htmlFor="rememberMe">
              Remember me<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
          <a className="block text-gray-600" href="/">
            Lost your password?
          </a>
        </div>
        <div
          style={{ background: "#303031" }}
          className="font-medium px-4 py-2 text-white text-center cursor-pointer"
          onClick={formData}
        >
          {data.loading ? "Loading..." : "Login"}
        </div>
      </form>
    </>
  );
};

export default Login;
