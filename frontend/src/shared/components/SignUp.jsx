import React from "react";
import { useState } from "react";
import { signupReq } from "../apiCall/authReq";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  const alert = (msg, type) => (
    <div className={`text-sm text-${type}-500`}>{msg}</div>
  );
  const formSubmit = async () => {
    setData({
      ...data,
      loading: true,
    });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let { data: responseData } = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
        });
      } else if (responseData.success) {
        setData({
          name: "",
          email: "",
          password: "",
          cPassword: "",
          error: false,
          loading: false,
          success: responseData.success
        });
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="text-center text-2xl mb-6">Register</div>
      {data.error && alert(data.error.email, "orange")}
      {data.success && alert(data.success, "green")}
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name">
            Name<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="px-4 py-2 focus:outline-none border"
            value={data.name}
            onChange={e =>
              setData({
                ...data,
                success: false,
                error: {},
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">
            Email address<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="px-4 py-2 focus:outline-none border"
            value={data.email}
            onChange={e =>
              setData({
                ...data,
                success: false,
                error: {},
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            type="password"
            id="password"
            className="px-4 py-2 focus:outline-none border"
            value={data.password}
            onChange={e =>
              setData({
                ...data,
                success: false,
                error: {},
                password: e.target.value,
              })
            }
          />
          {data.error && alert(data.error.password, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="cPassword">
            Confirm password
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            type="password"
            id="cPassword"
            className="px-4 py-2 focus:outline-none border"
            value={data.cPassword}
            onChange={e =>
              setData({
                ...data,
                success: false,
                error: {},
                cPassword: e.target.value,
              })
            }
          />
          {data.error && alert(data.error.cPassword, "red")}
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
          className="px-4 py-2 text-white text-center cursor-pointer font-medium"
          onClick={formSubmit}
        >
          {data.loading ? "loading..." : "Sign Up"}
        </div>
      </form>
    </>
  );
};

export default SignUp;
