// Import necessary modules and components
"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Corrected import from 'next/navigation' to 'next/router'
import axios from "axios";
import Metadata from "next/head";
import toast from "react-hot-toast";

export default function SigninPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "user", // Default role is set to "user"
  });
  const [buttonDisabled, setButtonDisabled] = useState(true); // Changed initial state to true
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const onSignin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      // Use user.role to determine the API route
      const response = await axios.post(`/api/users/${user.role}`, user);
      if (response.data.success) {
        console.log("Login successful...", response.data);
        toast.success("Login Successful");
        router.push("/home");
      } else {
        console.log("Login failed", response.data.error);
        toast.error("Login Failed");
      }
    } catch (error) {
      console.error("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Effect to enable/disable button based on form validity
  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  // Function to handle role change
  const handleRoleChange = (event) => {
    setUser({ ...user, role: event.target.value });
  };

  return (
    <>
      <Metadata>
        <title>Sign In Page | Intellara</title>
        <meta
          name="Intellara"
          content="Description of your sign in page"
        />
        {/* Other meta tags */}
      </Metadata>

      <section className="relative overflow-hidden">
        {/* SVG Background and Styles */}
        <div className="absolute inset-0 z-[-1]">
          <svg
            className="absolute top-0 left-0 z-[-1]"
            width="100%"
            height="100%"
            viewBox="0 0 1440 960"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="960">
              <rect width="1440" height="960" fill="#090E34" />
            </mask>
            <g mask="url(#mask0)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                  <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                    Sign in to your account
                  </h3>
                  <p className="mb-11 text-center text-base font-medium text-body-color">
                    Login to your account for a faster checkout.
                  </p>
                  <div className="mb-8 flex items-center justify-center">
                    <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                    <p className="w-full px-5 text-center text-base font-medium text-body-color">
                      Sign in with your email
                    </p>
                    <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                  </div>
                  <form onSubmit={onSignin}>
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-8">
                      <label
                        htmlFor="password"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Your Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        value={user.password}
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-8">
                      <label
                        htmlFor="role"
                        className="block text-sm text-dark dark:text-white mb-2"
                      >
                        Sign in as:
                      </label>
                      <select
                        name="role"
                        id="role"
                        value={user.role}
                        onChange={handleRoleChange}
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      >
                        <option value="user">User</option>
                        <option value="team">Team</option>
                      </select>
                    </div>
                    <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                      <div className="mb-4 sm:mb-0">
                        <label
                          htmlFor="checkboxLabel"
                          className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
                        >
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="checkboxLabel"
                              className="sr-only"
                            />
                            <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                              <span className="opacity-0">
                                <svg
                                  width="11"
                                  height="8"
                                  viewBox="0 0 11 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.0915 0.951972L10.0867 0.946075L10.0924 0.941177L10.0965 0.93628L10.0915 0.951972ZM3.96653 6.44613L2.16172 4.63241L1.23624 5.57887L3.96197 7.80364L9.71023 2.07448L8.78476 1.12801L3.96653 6.44613ZM0.918122 0.586845L1.83566 1.50439L2.73195 0.607033L3.65743 1.5535L2.16172 3.02726L0.918122 1.81294V0.586845ZM5.57179 0.541772L4.63249 0.581106L4.63252 0.581096L5.57619 1.4871L6.51359 0.541775L5.57179 0.541772Z"
                                    fill="#4A6CF7"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                          <span className="ml-2">Remember me</span>
                        </label>
                      </div>
                      <Link href="/forgot-password">
                        <span className="text-primary text-sm sm:text-base font-semibold hover:text-primary-dark dark:hover:text-white dark:text-white">
                          Forgot your password?
                        </span>
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className={`${
                        buttonDisabled || loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-primary"
                      } w-full rounded-sm py-3 text-white text-base font-medium mt-7 transition-all duration-300 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark`}
                      disabled={buttonDisabled || loading}
                    >
                      {loading ? "Loading..." : "Sign In"}
                    </button>
                  </form>
                  <p className="mt-9 text-center text-sm text-body-color dark:text-white">
                    Don't have an account?{" "}
                    <Link href="/signup">
                      <span className="text-primary font-semibold hover:underline dark:hover:text-primary">
                        Sign up
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
