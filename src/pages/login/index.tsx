import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get("remember-me") as string;
    // Add your form submission logic here, e.g., make an API call to your server

    try {
      const res = await axios.post(`${Backend_url}/api/login`, {
        email,
        password,
      });

      if (res.data) {
        setUser(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(res.data.refreshToken)
        );
        localStorage.setItem("userToken", JSON.stringify(res.data.user));
        router.push("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-cyan-950 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-6xl">
        <div className="w-full lg:w-3/5 flex flex-col justify-start items-start space-y-7 mb-8 lg:mb-0">
          <div className="flex flex-col justify-start items-start space-y-3.5">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold leading-[3rem] sm:leading-[4rem] md:leading-[4rem] mx-4 md:mx-0">
              Welcome to the first decentralized Social Network in the world
            </h1>

            <p className="text-white text-[15px] sm:text-[16.5px] font-medium leading-7 mx-4 md:mx-0">
              We are the only decentralized social network that gives
              opportunity to monetize your time even if you are a normal user
              who doesn’t create any content and use the earning to buy any
              service or goods from the native marketplace.
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Link href="registration">
              <div className="w-full sm:w-[183px] h-[60px] bg-teal-700 rounded-lg flex justify-center items-center text-white text-xl font-semibold">
                Register Now!
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/3 p-6 bg-white rounded-sm flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <span className="text-teal-700 text-xl font-bold">
              Login to your Account
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-1">
              <label
                className="text-zinc-900 text-sm font-semibold"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="h-10 px-3 py-2 rounded border border-slate-500"
                autoComplete="email"
                required
              />
            </div>

            <div className="relative flex flex-col space-y-1">
              <label
                className="text-zinc-900 text-sm font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="●●●●●●●●●●●●●●"
                className="h-10 px-3 py-2 rounded border border-slate-500"
                autoComplete="current-password"
                required
              />
              <div
                className="absolute right-2 top-7 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Icons">
                      <g id="Shape">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.1441 8.00002C2.52919 8.53112 3.31845 9.53186 4.35774 10.4032C5.43534 11.3066 6.69716 12 7.99995 12C9.30274 12 10.5646 11.3066 11.6422 10.4032C12.6814 9.53186 13.4707 8.53112 13.8558 8.00002C13.4707 7.46892 12.6814 6.46818 11.6422 5.59688C10.5646 4.69346 9.30273 4.00002 7.99995 4.00002C6.69716 4.00002 5.43534 4.69346 4.35774 5.59688C3.31845 6.46818 2.52919 7.46892 2.1441 8.00002ZM3.50113 4.57512C4.67561 3.59047 6.23747 2.66669 7.99995 2.66669C9.76242 2.66669 11.3243 3.59047 12.4988 4.57512C13.6846 5.56931 14.5621 6.69811 14.9675 7.26202C15.2864 7.7056 15.2864 8.29444 14.9675 8.73802C14.5621 9.30193 13.6846 10.4307 12.4988 11.4249C11.3243 12.4096 9.76242 13.3334 7.99995 13.3334C6.23747 13.3334 4.67561 12.4096 3.50113 11.4249C2.31525 10.4307 1.43782 9.30193 1.0324 8.73802C0.713485 8.29444 0.713485 7.7056 1.0324 7.26202C1.43782 6.69811 2.31525 5.56931 3.50113 4.57512Z"
                          fill="#64748B"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.99995 9.33335C8.73633 9.33335 9.33328 8.7364 9.33328 8.00002C9.33328 7.26364 8.73633 6.66669 7.99995 6.66669C7.26357 6.66669 6.66661 7.26364 6.66661 8.00002C6.66661 8.7364 7.26357 9.33335 7.99995 9.33335ZM7.99995 10.6667C9.47271 10.6667 10.6666 9.47278 10.6666 8.00002C10.6666 6.52726 9.47271 5.33335 7.99995 5.33335C6.52719 5.33335 5.33328 6.52726 5.33328 8.00002C5.33328 9.47278 6.52719 10.6667 7.99995 10.6667Z"
                          fill="#64748B"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 2L14 14"
                          stroke="#64748B"
                          strokeWidth="2"
                        />
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Icons">
                      <g id="Shape">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.1441 8.00002C2.52919 8.53112 3.31845 9.53186 4.35774 10.4032C5.43534 11.3066 6.69716 12 7.99995 12C9.30274 12 10.5646 11.3066 11.6422 10.4032C12.6814 9.53186 13.4707 8.53112 13.8558 8.00002C13.4707 7.46892 12.6814 6.46818 11.6422 5.59688C10.5646 4.69346 9.30273 4.00002 7.99995 4.00002C6.69716 4.00002 5.43534 4.69346 4.35774 5.59688C3.31845 6.46818 2.52919 7.46892 2.1441 8.00002ZM3.50113 4.57512C4.67561 3.59047 6.23747 2.66669 7.99995 2.66669C9.76242 2.66669 11.3243 3.59047 12.4988 4.57512C13.6846 5.56931 14.5621 6.69811 14.9675 7.26202C15.2864 7.7056 15.2864 8.29444 14.9675 8.73802C14.5621 9.30193 13.6846 10.4307 12.4988 11.4249C11.3243 12.4096 9.76242 13.3334 7.99995 13.3334C6.23747 13.3334 4.67561 12.4096 3.50113 11.4249C2.31525 10.4307 1.43782 9.30193 1.0324 8.73802C0.713485 8.29444 0.713485 7.7056 1.0324 7.26202C1.43782 6.69811 2.31525 5.56931 3.50113 4.57512Z"
                          fill="#64748B"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.99995 9.33335C8.73633 9.33335 9.33328 8.7364 9.33328 8.00002C9.33328 7.26364 8.73633 6.66669 7.99995 6.66669C7.26357 6.66669 6.66661 7.26364 6.66661 8.00002C6.66661 8.7364 7.26357 9.33335 7.99995 9.33335ZM7.99995 10.6667C9.47271 10.6667 10.6666 9.47278 10.6666 8.00002C10.6666 6.52726 9.47271 5.33335 7.99995 5.33335C6.52719 5.33335 5.33328 6.52726 5.33328 8.00002C5.33328 9.47278 6.52719 10.6667 7.99995 10.6667Z"
                          fill="#64748B"
                        />
                      </g>
                    </g>
                  </svg>
                )}
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    id="remember_me"
                    name="remember-me"
                    className="h-4 w-4 bg-teal-700 rounded-sm accent-teal-700"
                  />
                  <label
                    className="text-zinc-900 text-sm"
                    htmlFor="remember_me"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="#" className="text-teal-700 text-xs font-bold">
                    Forgot Password
                  </a>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="h-11 bg-teal-700 rounded text-white text-base font-semibold flex items-center justify-center"
              aria-label="Login"
            >
              Login
            </button>
          </form>

          <div className="flex flex-col items-center space-y-1.5">
            <div className="flex items-center w-full">
              <div className="flex-grow border-t border-slate-600"></div>
              <span className="px-4 bg-white text-slate-600 text-sm font-medium">
                or sign up with
              </span>
              <div className="flex-grow border-t border-slate-600"></div>
            </div>
            <div className="text-center">
              <span className="text-zinc-900 text-sm">
                Don’t have an Account?{" "}
              </span>
              <Link
                href="registration"
                className="text-teal-700 text-sm font-bold"
              >
                Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
