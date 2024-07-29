import axios from "axios";
import { useRouter } from "next/router";
import React, { use, useEffect, useRef, useState } from "react";
import ProfileImage from "./profileImage";
import Link from "next/link";

const Backend_url = process.env.NEXT_PUBLIC_BACKEND_PORT;

const Header = () => {
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // Replace 'accessToken' with the actual name of the token variable.
    const refreshToken = localStorage.getItem("refreshToken"); // Replace 'refreshToken' with the actual name of the token variable.
    const userToken = JSON.parse(localStorage.getItem("userToken") || "{}"); // Parse userToken from localStorage

    // Check if tokens are missing or empty
    if (!accessToken || !refreshToken || Object.keys(userToken).length === 0) {
      router.push("/login"); // Redirect to login page if tokens are missing
    } else {
      setUserToken(userToken); // Set userToken state
      setProfilePicture(userToken.profile_pic); // Set profile picture state if available
      setFirstName(userToken.first_name); // Set first name state if available
    }
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleProfile = () => {
    setShowPopUp(!showPopUp);
  };

  const handleLogout = async () => {
    localStorage.removeItem("accessToken"); // Remove accessToken from localStorage
    localStorage.removeItem("refreshToken"); // Remove refreshToken from localStorage
    localStorage.removeItem("userToken"); // Remove userToken from localStorage
    router.push("/login"); // Redirect to login page
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopUp(false);
    }
  };

  useEffect(() => {
    if (showPopUp) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopUp]);

  return (
    <>
      <div className="grid gird-cols-1 sm:grid-cols-5 p-4 sm:shadow-xl w-full sm:h-[69px] gap-4 sticky top-0 z-30 bg-white">
        <div className="flex sm:justify-start justify-between ">
          {/* Image */}
          <div className="flex justify-center items-center">
            <img src="/icons/qp.png" alt="qp" className="" />
          </div>

          <div className="flex justify-center items-center space-x-2">
            <div className="sm:hidden block flex items-center justify-center">
              <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-600"
                >
                  <g id="fluent:add-12-filled">
                    <path
                      id="Vector"
                      d="M8.4889 2.75107C8.4889 2.51079 8.39345 2.28035 8.22354 2.11045C8.05364 1.94054 7.8232 1.84509 7.58292 1.84509C7.34265 1.84509 7.11221 1.94054 6.9423 2.11045C6.7724 2.28035 6.67695 2.51079 6.67695 2.75107V6.67695H2.75107C2.51079 6.67695 2.28035 6.7724 2.11045 6.9423C1.94054 7.11221 1.84509 7.34265 1.84509 7.58292C1.84509 7.8232 1.94054 8.05364 2.11045 8.22354C2.28035 8.39345 2.51079 8.4889 2.75107 8.4889H6.67695V12.4148C6.67695 12.6551 6.7724 12.8855 6.9423 13.0554C7.11221 13.2253 7.34265 13.3208 7.58292 13.3208C7.8232 13.3208 8.05364 13.2253 8.22354 13.0554C8.39345 12.8855 8.4889 12.6551 8.4889 12.4148V8.4889H12.4148C12.6551 8.4889 12.8855 8.39345 13.0554 8.22354C13.2253 8.05364 13.3208 7.8232 13.3208 7.58292C13.3208 7.34265 13.2253 7.11221 13.0554 6.9423C12.8855 6.7724 12.6551 6.67695 12.4148 6.67695H8.4889V2.75107Z"
                      fill="#0B3243"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                  </g>
                </svg>
              </div>
            </div>

            {/* Search Bar */}
            <div className=" w-8 lg:w-[70%] h-8 sm:h-10 pl-3 sm:pl-12 pr-[12px] sm:pr-[100px] md:pr-[156px] sm:py-2.5 bg-sky-100 md:bg-gray-200 rounded-full md:rounded-[43px] flex items-center justify-center gap-2.5">
              <div className="flex md:justify-center items-center">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="search 1" clipPath="url(#clip0_1_1016)">
                    <path
                      id="Vector"
                      d="M14.8169 13.9331L11.0862 10.2025C12.1029 8.95911 12.6027 7.37254 12.4824 5.77096C12.3621 4.16938 11.6307 2.67532 10.4397 1.59781C9.24871 0.520305 7.6891 -0.0582065 6.08351 -0.0180617C4.47792 0.0220832 2.94917 0.677813 1.81349 1.81349C0.677813 2.94917 0.0220832 4.47792 -0.0180617 6.08351C-0.0582065 7.6891 0.520305 9.24871 1.59781 10.4397C2.67532 11.6307 4.16938 12.3621 5.77096 12.4824C7.37254 12.6027 8.95911 12.1029 10.2025 11.0862L13.9331 14.8169C14.051 14.9307 14.2089 14.9937 14.3727 14.9923C14.5366 14.9909 14.6934 14.9251 14.8092 14.8092C14.9251 14.6934 14.9909 14.5366 14.9923 14.3727C14.9937 14.2089 14.9307 14.051 14.8169 13.9331ZM6.24998 11.25C5.26108 11.25 4.29438 10.9567 3.47213 10.4073C2.64989 9.85793 2.00903 9.07703 1.63059 8.1634C1.25215 7.24977 1.15313 6.24444 1.34606 5.27453C1.53899 4.30463 2.01519 3.41371 2.71445 2.71445C3.41371 2.01519 4.30463 1.53899 5.27453 1.34606C6.24444 1.15313 7.24977 1.25215 8.1634 1.63059C9.07703 2.00903 9.85793 2.64989 10.4073 3.47213C10.9567 4.29438 11.25 5.26108 11.25 6.24998C11.2485 7.57561 10.7212 8.84651 9.78387 9.78387C8.84651 10.7212 7.57561 11.2485 6.24998 11.25Z"
                      fill="black"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_1016">
                      <rect width="15" height="15" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="text-black text-base font-normal font-poppins, Arial, sans-serif tracking-tight sm:block hidden">
                Search
              </div>
            </div>

            <div className="block sm:hidden flex justify-center items-center">
              <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 1000003342">
                    <path
                      id="Vector 7"
                      d="M1.5 5L10.5 5C10.7761 5 11 5.22386 11 5.5L11 10.2778C11 10.5539 10.7761 10.7778 10.5 10.7778L2.83704 10.7778C2.67513 10.7778 2.52324 10.8562 2.42945 10.9882L1.90759 11.7227C1.62548 12.1197 0.999999 11.9201 0.999999 11.433L0.999998 5.5C0.999998 5.22386 1.22386 5 1.5 5Z"
                      fill="white"
                      stroke="#454B54"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                    <path
                      id="Vector 6"
                      d="M14 1H5.5C5.22386 1 5 1.22386 5 1.5V7C5 7.27614 5.22386 7.5 5.5 7.5H12.7169C12.8925 7.5 13.0553 7.59215 13.1457 7.74275L13.5713 8.45209C13.8322 8.88693 14.5 8.70195 14.5 8.19484V1.5C14.5 1.22386 14.2761 1 14 1Z"
                      fill="white"
                      stroke="#454B54"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* navbar icons  */}
        <div className="flex justify-center col-span-1 md:col-span-3 md:pl-8">
          <div className="flex justify-between w-full sm:pl-20 md:pl-40 lg:pl-60">
            <div className=" w-full md:w-[300rem] h-[33px] flex justify-between">
              {/* 1st icon */}
              <Link href="/home">
                <div className="relative">
                  <div className=" hidden sm:block">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="home 1" clipPath="url(#clip0_1_1035)">
                        <g id="Group">
                          <path
                            id="Vector"
                            d="M23.477 12.3144C23.1914 12.612 23.1722 12.588 22.3034 12.588H20.5922V21.54C20.5922 22.9056 19.8698 23.7048 18.5498 23.7048H16.157L15.2282 23.688V15.9528C15.2282 15.024 14.7458 14.7888 14.1938 14.7888H9.94582C9.32662 14.7888 8.83702 15.048 8.83702 15.9096V23.7L7.60582 23.7072H5.52022C4.26502 23.7072 3.47782 22.9944 3.47782 21.4128V12.5928H1.71382C0.785022 12.5928 0.729822 12.4488 0.506622 12.18C0.0674224 11.6448 0.0914224 10.98 1.20982 10.0608L11.0066 0.945627C11.297 0.724827 11.5898 0.295227 11.9594 0.295227H12.1154C12.485 0.295227 12.7778 0.636027 13.0682 0.856827L22.7738 10.056C23.7074 10.6776 24.0578 11.7072 23.477 12.3144Z"
                            fill="#307777"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            clipPath="url(#clip)"
                            fillOpacity="1"
                            enableBackground="new"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_1_1035">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>

                  <div className=" block sm:hidden ">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Frame 37">
                        <g id="Group 445">
                          <path
                            id="Vector"
                            opacity="0.1"
                            d="M14.0319 4.83205L11.2383 2.37943C10.0362 1.32403 9.43508 0.796326 8.7037 0.796326C7.97232 0.796326 7.37122 1.32403 6.16911 2.37943L3.37546 4.83205C2.78894 5.34697 2.49569 5.60442 2.34043 5.94104C2.18518 6.27765 2.18518 6.65602 2.18518 7.41274V12.682C2.18518 14.3422 2.18518 15.1723 2.73068 15.6881C3.27617 16.2037 4.15413 16.2037 5.91005 16.2037H6.60846V12.682C6.60846 11.588 7.54657 10.7011 8.7037 10.7011C9.86083 10.7011 10.7989 11.588 10.7989 12.682V16.2037H11.4973C13.2533 16.2037 14.1312 16.2037 14.6767 15.6881C15.2222 15.1723 15.2222 14.3422 15.2222 12.682V7.41274C15.2222 6.65602 15.2222 6.27765 15.067 5.94104C14.9117 5.60442 14.6184 5.34696 14.0319 4.83205Z"
                            fill="#154C65"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            clipPath="url(#clip)"
                            fillOpacity="1"
                            enableBackground="new"
                          />
                          <g id="Group 444">
                            <path
                              id="Vector_2"
                              d="M15.2222 4.94446V12.6482C15.2222 14.3243 15.2222 15.1623 14.6767 15.683C14.1312 16.2037 13.2533 16.2037 11.4973 16.2037H10.5661H6.84127H5.91005C4.15413 16.2037 3.27617 16.2037 2.73068 15.683C2.18518 15.1623 2.18518 14.3243 2.18518 12.6482V5.53705"
                              stroke="#154C65"
                              stroke-width="1.5"
                              strokeWidth="2"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              clipPath="url(#clip)"
                              fillOpacity="1"
                              enableBackground="new"
                            />
                            <path
                              id="Vector_3"
                              d="M1 6.72225L5.14815 3.48585L8.07149 1.20507C8.76994 0.660079 9.82265 0.660079 10.5211 1.20507L13.4444 3.48585L17 6.72225"
                              stroke="#154C65"
                              stroke-width="1.5"
                              strokeWidth="2"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              clipPath="url(#clip)"
                              fillOpacity="1"
                              enableBackground="new"
                            />
                            <path
                              id="Vector_4"
                              d="M6.92593 16.2038V12.2531C6.92593 11.1622 7.72184 10.2778 8.70371 10.2778C9.68558 10.2778 10.4815 11.1622 10.4815 12.2531V16.2038"
                              stroke="#154C65"
                              stroke-width="1.5"
                              strokeWidth="2"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              clipPath="url(#clip)"
                              fillOpacity="1"
                              enableBackground="new"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="absolute top-[51px] left-1/2 transform -translate-x-1/2">
                    <div className="sm:w-[110px] h-1 bg-teal-700" />
                  </div>
                </div>
              </Link>

              {/* 2nd icon */}
              <div>
                <svg
                  // width="32"
                  width={isSmallScreen ? "24" : "33"}
                  height={isSmallScreen ? "24" : "33"}
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Frame 1000003427">
                    <path
                      id="Vector"
                      d="M8.5 3.50673C10.7063 2.23046 13.2679 1.5 16 1.5C24.2842 1.5 31 8.21572 31 16.5C31 24.7842 24.2842 31.5 16 31.5C7.71572 31.5 1 24.7842 1 16.5C1 13.7679 1.73046 11.2063 3.00673 9"
                      stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                      stroke-width="2"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                    <path
                      id="Vector_2"
                      d="M16 31.5H31"
                      stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                      stroke-width="1.5"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                    <path
                      id="Vector_3"
                      d="M18 10C18 10.8284 17.1045 11.5 16 11.5C14.8955 11.5 14 10.8284 14 10C14 9.17157 14.8955 8.5 16 8.5C17.1045 8.5 18 9.17157 18 10Z"
                      stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                      stroke-width="2"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                    <path
                      id="Vector_4"
                      d="M18 23C18 23.8284 17.1045 24.5 16 24.5C14.8955 24.5 14 23.8284 14 23C14 22.1716 14.8955 21.5 16 21.5C17.1045 21.5 18 22.1716 18 23Z"
                      stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                      stroke-width="2"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                    <path
                      id="Vector_5"
                      d="M9.5 14.5C10.3284 14.5 11 15.3955 11 16.5C11 17.6045 10.3284 18.5 9.5 18.5C8.67157 18.5 8 17.6045 8 16.5C8 15.3955 8.67157 14.5 9.5 14.5Z"
                      stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                      stroke-width="2"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                    <path
                      id="Vector_6"
                      d="M22.5 14.5C23.3284 14.5 24 15.3955 24 16.5C24 17.6045 23.3284 18.5 22.5 18.5C21.6716 18.5 21 17.6045 21 16.5C21 15.3955 21.6716 14.5 22.5 14.5Z"
                      stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                      stroke-width="2"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                  </g>
                </svg>
              </div>

              {/* 3rd icon */}
              <div>
                {/* 3rd but 1st icon */}
                <div className="sm:block hidden">
                  <svg
                    width={isSmallScreen ? "24" : "33"}
                    height={isSmallScreen ? "24" : "33"}
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Group_light">
                      <circle
                        id="Ellipse 46"
                        cx="16.5"
                        cy="12.375"
                        r="2"
                        stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        id="Ellipse 47"
                        d="M21.6429 11.375C21.9082 10.9156 22.345 10.5804 22.8574 10.4431C23.3697 10.3059 23.9156 10.3777 24.375 10.6429C24.8344 10.9082 25.1696 11.345 25.3069 11.8574C25.4441 12.3697 25.3723 12.9156 25.1071 13.375C24.8418 13.8344 24.405 14.1696 23.8926 14.3069C23.3803 14.4441 22.8344 14.3723 22.375 14.1071C21.9156 13.8418 21.5804 13.405 21.4431 12.8926C21.3059 12.3803 21.3777 11.8344 21.6429 11.375L21.6429 11.375Z"
                        stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                        stroke-width="1.5"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                      <path
                        id="Ellipse 48"
                        d="M7.89295 11.375C8.15817 10.9156 8.595 10.5804 9.10736 10.4431C9.61972 10.3059 10.1656 10.3777 10.625 10.6429C11.0844 10.9082 11.4196 11.345 11.5569 11.8574C11.6941 12.3697 11.6223 12.9156 11.3571 13.375C11.0918 13.8344 10.655 14.1696 10.1426 14.3069C9.63028 14.4441 9.08437 14.3723 8.625 14.1071C8.16563 13.8418 7.83043 13.405 7.69315 12.8926C7.55586 12.3803 7.62773 11.8344 7.89295 11.375L7.89295 11.375Z"
                        stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                        stroke-width="1.5"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                      <path
                        id="Subtract"
                        d="M28.0783 21.6964L29.0615 21.5138V21.5138L28.0783 21.6964ZM19.3875 18.1299L18.8061 17.3162L17.7414 18.0769L18.755 18.9045L19.3875 18.1299ZM21.2167 21.6947L22.2037 21.5342L21.2167 21.6947ZM27.1874 21.6875H20.3124V23.6875H27.1874V21.6875ZM27.095 21.8789C27.0914 21.859 27.0911 21.8274 27.1017 21.792C27.1119 21.7582 27.1283 21.7331 27.1433 21.7168C27.1721 21.6858 27.1932 21.6875 27.1874 21.6875V23.6875C28.2535 23.6875 29.2959 22.7768 29.0615 21.5138L27.095 21.8789ZM22.6874 18.1875C24.415 18.1875 25.4103 18.8019 26.0227 19.5049C26.6682 20.2458 26.9647 21.1765 27.095 21.8789L29.0615 21.5138C28.8978 20.6324 28.5044 19.3087 27.5307 18.1911C26.5239 17.0356 24.9708 16.1875 22.6874 16.1875V18.1875ZM19.9688 18.9436C20.5674 18.516 21.4255 18.1875 22.6874 18.1875V16.1875C21.0542 16.1875 19.7793 16.621 18.8061 17.3162L19.9688 18.9436ZM18.755 18.9045C19.6826 19.6619 20.0768 20.9152 20.2296 21.8552L22.2037 21.5342C22.0273 20.4496 21.5262 18.5852 20.0199 17.3553L18.755 18.9045ZM20.2296 21.8552C20.2268 21.8376 20.2271 21.8097 20.2369 21.7786C20.2462 21.749 20.2608 21.7272 20.2739 21.7131C20.2992 21.686 20.3177 21.6875 20.3124 21.6875V23.6875C21.384 23.6875 22.4063 22.7797 22.2037 21.5342L20.2296 21.8552Z"
                        fill={isSmallScreen ? "#154C65" : "#AFB2B7"}
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                      <path
                        id="Subtract_2"
                        d="M13.6125 18.1299L14.245 18.9045L15.2586 18.0769L14.1938 17.3162L13.6125 18.1299ZM4.9217 21.6963L5.90491 21.8789L4.9217 21.6963ZM11.7833 21.6947L10.7962 21.5342L11.7833 21.6947ZM10.3125 18.1875C11.5744 18.1875 12.4326 18.516 13.0312 18.9436L14.1938 17.3162C13.2207 16.621 11.9457 16.1875 10.3125 16.1875V18.1875ZM5.90491 21.8789C6.03529 21.1765 6.33176 20.2458 6.97727 19.5049C7.58971 18.8019 8.585 18.1875 10.3125 18.1875V16.1875C8.02919 16.1875 6.47606 17.0356 5.46932 18.1911C4.49562 19.3087 4.10212 20.6324 3.9385 21.5138L5.90491 21.8789ZM5.81255 21.6875C5.8068 21.6875 5.8279 21.6858 5.85661 21.7168C5.87162 21.7331 5.88807 21.7582 5.89824 21.792C5.9089 21.8274 5.90859 21.859 5.90491 21.8789L3.9385 21.5138C3.70405 22.7768 4.74649 23.6875 5.81255 23.6875V21.6875ZM12.6875 21.6875H5.81255V23.6875H12.6875V21.6875ZM12.6875 21.6875C12.6822 21.6875 12.7007 21.686 12.726 21.7131C12.7392 21.7272 12.7537 21.749 12.7631 21.7786C12.7729 21.8097 12.7732 21.8376 12.7703 21.8552L10.7962 21.5342C10.5937 22.7797 11.6159 23.6875 12.6875 23.6875V21.6875ZM12.7703 21.8552C12.9232 20.9152 13.3173 19.6619 14.245 18.9045L12.9801 17.3553C11.4737 18.5852 10.9726 20.4496 10.7962 21.5342L12.7703 21.8552Z"
                        fill={isSmallScreen ? "#154C65" : "#AFB2B7"}
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                      <path
                        id="Rectangle 4161"
                        d="M16.5 17.1875C20.0083 17.1875 20.9591 20.1105 21.2167 21.6947C21.3054 22.2398 20.8648 22.6875 20.3125 22.6875H12.6875C12.1352 22.6875 11.6946 22.2398 11.7833 21.6947C12.0409 20.1105 12.9917 17.1875 16.5 17.1875Z"
                        stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                        stroke-width="2"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                      <path
                        id="Vector 280"
                        d="M25.4375 29.5625H28.0625C28.8909 29.5625 29.5625 28.8909 29.5625 28.0625V25.4375"
                        stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                        stroke-width="2"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                      <path
                        id="Vector 282"
                        d="M25.4375 3.4375H28.0625C28.8909 3.4375 29.5625 4.10907 29.5625 4.9375V7.5625"
                        stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                        stroke-width="2"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                      <path
                        id="Vector 281"
                        d="M7.5625 29.5625H4.9375C4.10907 29.5625 3.4375 28.8909 3.4375 28.0625V25.4375"
                        stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                        stroke-width="2"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                      <path
                        id="Vector 283"
                        d="M7.5625 3.4375H4.9375C4.10907 3.4375 3.4375 4.10907 3.4375 4.9375V7.5625"
                        stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                        stroke-width="2"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                    </g>
                  </svg>
                </div>
                {/* 3rd but 2nd icon */}
                <div className="block sm:hidden">
                  <svg
                    width={isSmallScreen ? "24" : "33"}
                    height={isSmallScreen ? "24" : "33"}
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
                      d="M2.56464 4.66899C2.56464 2.86414 3.99204 1.39899 5.74293 1.39899C7.49383 1.39899 8.92456 2.86757 8.92456 4.66899C8.92456 5.68464 8.47767 6.62481 7.69727 7.25273C7.13365 7.70223 6.45663 7.94242 5.74293 7.94242C5.56284 7.94242 5.38942 7.92526 5.216 7.89781C5.0926 7.87722 4.97254 7.84634 4.85581 7.81203C4.71574 7.77086 4.58234 7.72282 4.44894 7.66106C4.21549 7.55469 3.99871 7.41743 3.79194 7.25273H3.7886C3.01154 6.62824 2.56464 5.68464 2.56464 4.66899ZM10.3053 15.7348C10.2586 15.6731 10.2119 15.6147 10.1685 15.553C10.1418 15.5152 10.1185 15.4741 10.0918 15.4329C10.0551 15.378 10.0185 15.3196 9.98844 15.2613C9.96509 15.2201 9.94175 15.1755 9.92174 15.1309C9.89172 15.0726 9.86171 15.0108 9.83836 14.9525C9.81835 14.9079 9.80167 14.8633 9.78166 14.8152C9.75832 14.7535 9.73497 14.6917 9.71496 14.6265C9.69829 14.5819 9.68828 14.5373 9.67161 14.4893C9.6516 14.4207 9.63826 14.352 9.62158 14.2868C9.61158 14.2457 9.60157 14.201 9.5949 14.153C9.57823 14.0775 9.56822 14.002 9.55822 13.9231C9.55488 13.8854 9.54821 13.8476 9.54154 13.8099C9.53154 13.6967 9.52487 13.58 9.52487 13.4633C9.52487 13.3878 9.5282 13.3158 9.53154 13.2403C9.53154 13.2163 9.53487 13.1923 9.53821 13.1648C9.54154 13.1168 9.54488 13.0687 9.55155 13.0207C9.55488 12.9932 9.55822 12.9658 9.56155 12.9349C9.56822 12.8937 9.57489 12.8491 9.58156 12.808C9.58823 12.7771 9.59157 12.7462 9.59824 12.7153C9.60824 12.6776 9.61491 12.6364 9.62492 12.5952C9.63159 12.5643 9.64159 12.5335 9.64826 12.5026C9.65827 12.4648 9.66827 12.4237 9.67828 12.3893C9.68828 12.3585 9.69829 12.3276 9.70829 12.2967C9.72163 12.259 9.73164 12.2212 9.74498 12.1869C9.75499 12.156 9.76832 12.1251 9.78166 12.0943C9.795 12.0599 9.81168 12.0222 9.82502 11.9879C9.83836 11.9604 9.8517 11.9261 9.86504 11.8987L9.91507 11.7957C9.93174 11.7683 9.94175 11.7374 9.96176 11.71C9.97843 11.6756 9.99844 11.6448 10.0185 11.6104C10.0351 11.583 10.0518 11.5555 10.0685 11.5281C10.0885 11.4938 10.1085 11.4629 10.1318 11.4286C10.1519 11.4011 10.1685 11.3771 10.1852 11.3497C10.2086 11.3154 10.2352 11.2845 10.2586 11.2536C10.2786 11.2296 10.2953 11.2056 10.3119 11.1815C10.3386 11.1472 10.3686 11.1129 10.3953 11.082C10.412 11.0614 10.4287 11.0409 10.4487 11.0203C10.4854 10.9791 10.5254 10.9379 10.5654 10.8967L10.5954 10.8659C10.6454 10.8144 10.6988 10.7664 10.7488 10.7217C10.7655 10.7046 10.7822 10.6943 10.7989 10.6806C10.8322 10.6531 10.8656 10.6222 10.8989 10.5982C10.8756 10.5502 10.8522 10.5021 10.8255 10.4541C10.7888 10.3855 10.7522 10.3169 10.7155 10.2517C10.6688 10.1693 10.6188 10.087 10.5687 10.008C10.5287 9.94285 10.4854 9.88109 10.442 9.81589C10.3886 9.73697 10.3319 9.66148 10.2719 9.58943C10.2252 9.52766 10.1819 9.46933 10.1318 9.411C10.0718 9.33551 10.0084 9.26689 9.94175 9.19826C9.89172 9.14336 9.8417 9.08846 9.78833 9.03699C9.72163 8.96837 9.64826 8.90317 9.57823 8.84141C9.52487 8.79337 9.47151 8.74533 9.41815 8.6973C9.34144 8.6321 9.25806 8.57377 9.17802 8.51544C9.12466 8.47427 9.0713 8.43309 9.01794 8.39535C8.92456 8.33358 8.83118 8.27525 8.73446 8.21692C8.68444 8.18947 8.64108 8.15516 8.58772 8.12771C8.44098 8.04536 8.2909 7.96987 8.13749 7.90124C8.06412 7.86693 7.99075 7.83605 7.91738 7.8086C7.89737 7.82576 7.87069 7.83948 7.85068 7.85664C7.81399 7.88409 7.77397 7.90811 7.73395 7.93556C7.68726 7.96644 7.64057 7.99732 7.59388 8.02134C7.55386 8.04536 7.51384 8.06938 7.47382 8.08996C7.42379 8.11398 7.3771 8.14143 7.32374 8.16545C7.28372 8.18604 7.2437 8.2032 7.20368 8.22035C7.15366 8.24437 7.1003 8.26153 7.05027 8.28555C7.01025 8.3027 6.96689 8.31643 6.92687 8.33015C6.87351 8.35074 6.82015 8.36447 6.76346 8.38162C6.72344 8.39192 6.68342 8.40564 6.64006 8.41593C6.58003 8.42966 6.52333 8.43995 6.4633 8.45368C6.42328 8.46054 6.3866 8.47083 6.34658 8.4777C6.27988 8.48799 6.21318 8.49828 6.14647 8.50172C6.11312 8.50515 6.07977 8.51201 6.04976 8.51544C5.94637 8.5223 5.84632 8.52573 5.74627 8.52573C5.64288 8.52573 5.54283 8.5223 5.44278 8.51544C5.40943 8.51201 5.37608 8.50515 5.34273 8.50172C5.27603 8.49485 5.20933 8.48799 5.14596 8.4777C5.10594 8.47083 5.06926 8.46054 5.02924 8.45368C4.96921 8.44338 4.91251 8.42966 4.85248 8.41593C4.81246 8.40564 4.77244 8.39192 4.73242 8.38162C4.67906 8.36447 4.62236 8.35074 4.569 8.33015C4.52898 8.31643 4.48563 8.3027 4.44561 8.28211C4.39224 8.26153 4.34222 8.24437 4.29219 8.22035C4.25217 8.2032 4.21215 8.18261 4.1688 8.16545C4.11877 8.14143 4.07208 8.11741 4.02206 8.08996C3.98203 8.06938 3.94201 8.04536 3.90199 8.02134C3.8553 7.99389 3.80861 7.96644 3.76192 7.93556C3.7219 7.91154 3.68522 7.88409 3.6452 7.85664C3.62185 7.83948 3.59851 7.82919 3.5785 7.8086C1.43073 8.64926 0 10.7698 0 13.1339C0 13.5491 0.0466905 13.9712 0.136737 14.3898C0.373524 15.4741 1.29399 16.2324 2.37455 16.2324H9.11799C9.56822 16.2324 10.0118 16.0917 10.3853 15.8378C10.382 15.8343 10.3786 15.8309 10.3753 15.8275C10.352 15.7966 10.3286 15.7657 10.3053 15.7348ZM11.0323 5.00525C11.1924 5.13221 11.3625 5.23515 11.5392 5.3175C11.7293 5.40328 11.9261 5.46847 12.1329 5.50279C12.2663 5.52338 12.3997 5.5371 12.5397 5.5371C13.09 5.5371 13.6103 5.35524 14.0438 5.00525C14.6442 4.52488 14.9877 3.79745 14.9877 3.01855C14.9877 1.62889 13.8871 0.5 12.5364 0.5C11.1857 0.5 10.0852 1.62889 10.0852 3.01855C10.0885 3.79745 10.432 4.52488 11.0323 5.00525ZM15.7614 12.3001C15.9115 12.6707 15.9848 13.0619 15.9848 13.4668C15.9848 15.1378 14.6608 16.5 13.0367 16.5C12.2729 16.5 11.5492 16.2015 10.999 15.6593C10.4187 15.0897 10.0852 14.2903 10.0852 13.4668C10.0852 12.4408 10.5821 11.4938 11.4125 10.9311C11.8961 10.6051 12.4564 10.4301 13.0367 10.4301C13.2601 10.4301 13.4802 10.4541 13.6937 10.5056C13.787 10.5296 13.8804 10.557 13.9738 10.5879C14.5641 10.7904 15.0777 11.1781 15.4446 11.7065C15.4846 11.7683 15.5246 11.83 15.5646 11.8918C15.638 12.0222 15.7047 12.1594 15.7614 12.3001ZM14.8809 13.4668C14.8809 13.254 14.7142 13.0825 14.5074 13.0825H13.4102V11.9536C13.4102 11.7408 13.2434 11.5693 13.0367 11.5693C12.8299 11.5693 12.6631 11.7408 12.6631 11.9536V13.0825H11.5659C11.3625 13.0825 11.1924 13.254 11.1924 13.4668C11.1924 13.6761 11.3591 13.8511 11.5659 13.8511H12.6631V14.9799C12.6631 15.1927 12.8299 15.3642 13.0367 15.3642C13.2434 15.3642 13.4102 15.1927 13.4102 14.9799V13.8511H14.5074C14.7142 13.8511 14.8809 13.6795 14.8809 13.4668ZM14.2606 5.56112L14.2206 5.58857C14.1906 5.60916 14.1606 5.62631 14.1306 5.64347C14.0905 5.66749 14.0538 5.69494 14.0105 5.71896C13.9805 5.73611 13.9505 5.75327 13.9204 5.77043C13.8804 5.79101 13.8404 5.8116 13.7971 5.83219C13.767 5.84591 13.7337 5.85964 13.7037 5.87336C13.6603 5.89052 13.6203 5.90768 13.5736 5.92483C13.5403 5.93513 13.5102 5.94885 13.4802 5.95915C13.4335 5.9763 13.3902 5.9866 13.3435 6.00032C13.3101 6.01062 13.2801 6.02091 13.2501 6.02777C13.2034 6.03807 13.1567 6.04836 13.1067 6.05865C13.0767 6.06552 13.0467 6.06895 13.0167 6.07581C12.9633 6.08267 12.9099 6.08953 12.8566 6.0964C12.8299 6.09983 12.8032 6.10326 12.7765 6.10669C12.6965 6.11355 12.6164 6.11698 12.5331 6.11698C12.4497 6.11698 12.3697 6.11355 12.2896 6.10669C12.2629 6.10326 12.2363 6.09983 12.2096 6.0964C12.1562 6.08953 12.1029 6.0861 12.0495 6.07581C12.0161 6.06895 11.9861 6.06552 11.9561 6.05865C11.9094 6.04836 11.8627 6.03807 11.816 6.02777C11.7827 6.02091 11.7527 6.01062 11.7193 6.00032C11.676 5.99003 11.6293 5.9763 11.5859 5.95915C11.5526 5.94885 11.5226 5.93513 11.4892 5.92483C11.4458 5.90768 11.4058 5.89052 11.3625 5.87336C11.3291 5.85964 11.2991 5.84591 11.2691 5.83219C11.2291 5.8116 11.1857 5.79101 11.1457 5.77043C11.1157 5.75327 11.0857 5.73611 11.0556 5.71896C11.0156 5.69494 10.9756 5.67092 10.9356 5.64347C10.9056 5.62631 10.8756 5.60573 10.8489 5.58857C10.8355 5.57828 10.8222 5.56798 10.8089 5.56112C9.89506 5.92826 9.12133 6.61795 8.63108 7.49635C8.63775 7.49979 8.64108 7.50322 8.64775 7.50665C8.77782 7.57184 8.90455 7.6439 9.02795 7.71939C9.04462 7.72968 9.0613 7.73997 9.07464 7.74684C9.19803 7.82232 9.3181 7.90468 9.43482 7.98703C9.45483 8.00418 9.47818 8.01791 9.49819 8.03506C9.61491 8.12084 9.72497 8.21006 9.83503 8.3027C9.8517 8.31643 9.86838 8.33015 9.88505 8.34731C9.99511 8.44338 10.1052 8.54632 10.2086 8.64926C10.2119 8.65269 10.2119 8.65269 10.2119 8.65269C10.3186 8.75906 10.4187 8.86886 10.5154 8.98552C10.532 9.00268 10.5487 9.02327 10.5621 9.04042C10.6554 9.15022 10.7422 9.26346 10.8255 9.38012C10.8422 9.40414 10.8589 9.42816 10.8756 9.44875C10.9589 9.56884 11.039 9.68893 11.1157 9.81246C11.1257 9.82962 11.1357 9.84677 11.1424 9.8605C11.2157 9.98745 11.2891 10.1144 11.3525 10.2448C11.3558 10.2517 11.3625 10.262 11.3658 10.2688L11.4859 10.2071C11.5059 10.1968 11.5259 10.1865 11.5459 10.1727C11.6193 10.1384 11.6926 10.1075 11.7627 10.0801C11.7794 10.0732 11.7994 10.0664 11.816 10.0595C11.8727 10.0389 11.9328 10.0183 11.9895 9.99775C12.0161 9.99089 12.0428 9.98059 12.0695 9.97373C12.1195 9.96 12.1696 9.94628 12.2196 9.93255C12.2496 9.92569 12.2796 9.91883 12.3096 9.91197C12.3596 9.90167 12.4063 9.89138 12.4597 9.88452C12.4897 9.87765 12.5197 9.87422 12.5497 9.86736C12.6031 9.8605 12.6565 9.85707 12.7098 9.8502C12.7332 9.84677 12.7599 9.84334 12.7865 9.84334C12.8666 9.83648 12.9466 9.83648 13.0267 9.83648C13.11 9.83648 13.2001 9.83991 13.2801 9.84677C13.3068 9.8502 13.3368 9.85363 13.3635 9.85363C13.4169 9.8605 13.4736 9.86393 13.5302 9.87422C13.5636 9.88109 13.5936 9.88452 13.627 9.89138C13.677 9.90167 13.7237 9.90854 13.7737 9.91883C13.8104 9.92569 13.8404 9.93598 13.8771 9.94285C13.9238 9.95657 13.9705 9.96687 14.0172 9.98059C14.0538 9.99089 14.0839 10.0012 14.1205 10.0149C14.1672 10.0321 14.2106 10.0458 14.254 10.0629C14.2873 10.0732 14.3207 10.0904 14.354 10.1041C14.3974 10.1213 14.4407 10.1419 14.4841 10.159C14.5174 10.1762 14.5508 10.1899 14.5808 10.2071C14.6208 10.2276 14.6642 10.2482 14.7042 10.2723C14.7375 10.2928 14.7675 10.31 14.7976 10.3271L14.9176 10.4026C14.9476 10.4232 14.9777 10.4404 15.0077 10.4644C15.0477 10.4918 15.0844 10.5193 15.1244 10.5502C15.1511 10.5708 15.1811 10.5914 15.2078 10.6154C15.2445 10.6463 15.2845 10.6806 15.3178 10.7115C15.3445 10.732 15.3679 10.7561 15.3945 10.7801C15.4312 10.8144 15.4679 10.8521 15.5046 10.8899C15.5279 10.9105 15.5513 10.9311 15.5713 10.9551C15.6113 10.9997 15.6513 11.0477 15.6914 11.0958C15.7047 11.1129 15.7214 11.1301 15.7347 11.1472C15.7881 11.2124 15.8381 11.281 15.8881 11.3497C15.8981 11.3668 15.9081 11.3805 15.9181 11.3977C15.9548 11.4526 15.9915 11.5075 16.0249 11.5658C16.0415 11.5933 16.0515 11.6207 16.0682 11.6482C16.0916 11.6894 16.1149 11.7305 16.1382 11.7717C16.1849 11.7408 16.2316 11.7065 16.2716 11.6722C16.5818 11.4183 16.8019 11.058 16.8886 10.66C17.3722 8.5223 16.2416 6.35374 14.2606 5.56112Z"
                      fill="#154C65"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                  </svg>
                </div>
              </div>

              {/* 4th icon */}
              <div className="block sm:hidden relative">
                <svg
                  width={isSmallScreen ? "24" : "33"}
                  height={isSmallScreen ? "24" : "33"}
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="notification_12052729 1">
                    <g id="Group">
                      <path
                        id="Vector"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.25 8.93754V7.4794C14.1269 7.493 14.0017 7.50001 13.875 7.50001C13.6172 7.50001 13.3662 7.4711 13.125 7.41636V8.93754C13.125 9.67541 13.3935 10.3011 13.6623 10.7857C13.798 11.0303 13.9466 11.2611 14.0795 11.4637L14.1644 11.5928C14.2676 11.7496 14.3583 11.8873 14.4437 12.0272C14.5596 12.2171 14.625 12.4384 14.625 12.673C14.625 12.9226 14.4226 13.125 14.173 13.125H3.82702C3.57737 13.125 3.375 12.9226 3.375 12.673C3.375 12.4384 3.44041 12.2171 3.55633 12.0272C3.64174 11.8872 3.73232 11.7497 3.83562 11.5928L3.92054 11.4637C4.05338 11.2611 4.20203 11.0303 4.33766 10.7857C4.60645 10.3011 4.87499 9.67541 4.87499 8.93754V6.75C4.87499 4.47183 6.72183 2.62499 9 2.62499C9.60455 2.62499 10.1787 2.75504 10.6961 2.9887C10.8248 2.62849 11.0131 2.29657 11.249 2.00475C10.5673 1.68109 9.8048 1.5 9 1.5C6.10051 1.5 3.74999 3.85051 3.74999 6.75V8.93754C3.74999 9.67768 3.32015 10.3302 2.90138 10.966C2.79664 11.125 2.69255 11.283 2.59609 11.441C2.37508 11.8031 2.25 12.2265 2.25 12.673C2.25 13.544 2.95605 14.25 3.82702 14.25H6.1875C6.1875 15.8033 7.44669 17.0625 9 17.0625C10.5533 17.0625 11.8125 15.8033 11.8125 14.25H14.173C15.044 14.25 15.75 13.544 15.75 12.673C15.75 12.2265 15.6249 11.8031 15.4039 11.441C15.3075 11.283 15.2034 11.125 15.0986 10.966C14.6799 10.3303 14.25 9.67768 14.25 8.93754ZM10.6875 14.25H7.3125C7.3125 15.182 8.06801 15.9375 9 15.9375C9.93199 15.9375 10.6875 15.182 10.6875 14.25Z"
                        fill="#154C65"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                      <path
                        id="Vector_2"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.875 6.75C15.3247 6.75 16.5 5.57474 16.5 4.12501C16.5 2.67525 15.3247 1.5 13.875 1.5C12.4253 1.5 11.25 2.67525 11.25 4.12501C11.25 5.57474 12.4253 6.75 13.875 6.75ZM13.875 5.625C14.7034 5.625 15.375 4.95342 15.375 4.12501C15.375 3.29657 14.7034 2.62499 13.875 2.62499C13.0466 2.62499 12.375 3.29657 12.375 4.12501C12.375 4.95342 13.0466 5.625 13.875 5.625Z"
                        fill="#154C65"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                    </g>
                  </g>
                </svg>
                <div className="absolute top-1 left-5 transform -translate-x-1/2 -translate-y-1/2 bg-cyan-950 text-white rounded-full w-[17px] h-[17px] flex items-center justify-center text-[10px] font-medium">
                  3
                </div>
              </div>

              {/* 5th icon */}

              <div className="relative">
                <svg
                  width={isSmallScreen ? "24" : "33"}
                  height={isSmallScreen ? "24" : "33"}
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector"
                    d="M22.4836 17C23.6082 17 24.5979 16.385 25.1077 15.455L30.4757 5.72C31.0305 4.73 30.3107 3.5 29.1712 3.5H6.9794L5.56993 0.5H0.666748V3.5H3.66563L9.06363 14.885L7.03938 18.545C5.94479 20.555 7.38425 23 9.66341 23H27.6567V20H9.66341L11.3128 17H22.4836ZM8.40387 6.5H26.6221L22.4836 14H11.9576L8.40387 6.5ZM9.66341 24.5C8.01402 24.5 6.67952 25.85 6.67952 27.5C6.67952 29.15 8.01402 30.5 9.66341 30.5C11.3128 30.5 12.6623 29.15 12.6623 27.5C12.6623 25.85 11.3128 24.5 9.66341 24.5ZM24.6578 24.5C23.0085 24.5 21.6739 25.85 21.6739 27.5C21.6739 29.15 23.0085 30.5 24.6578 30.5C26.3072 30.5 27.6567 29.15 27.6567 27.5C27.6567 25.85 26.3072 24.5 24.6578 24.5Z"
                    fill={isSmallScreen ? "#154C65" : "#AFB2B7"}
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    clipPath="url(#clip)"
                    fillOpacity="1"
                    enableBackground="new"
                  />
                </svg>
                <div className="absolute top-1 left-[27px] transform -translate-x-1/2 -translate-y-1/2 bg-cyan-950 text-white rounded-full w-[17px] h-[17px] flex items-center justify-center text-[10px] font-medium">
                  3
                </div>
              </div>

              {/* 6th icon */}

              <div>
                <svg
                  width={isSmallScreen ? "24" : "33"}
                  height={isSmallScreen ? "24" : "33"}
                  viewBox="0 0 33 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group 1000003341">
                    <path
                      id="Rectangle 1"
                      d="M1 8.53185C1 7.71435 1 7.3056 1.15224 6.93806C1.30448 6.57052 1.59351 6.28149 2.17157 5.70343L5.57843 2.29657C6.15649 1.71851 6.44552 1.42948 6.81306 1.27724C7.1806 1.125 7.58935 1.125 8.40685 1.125H24.2598C25.0773 1.125 25.4861 1.125 25.8536 1.27724C26.2211 1.42948 26.5102 1.71851 27.0882 2.29657L30.4951 5.70343C31.0732 6.28149 31.3622 6.57052 31.5144 6.93806C31.6667 7.3056 31.6667 7.71435 31.6667 8.53185V25.875C31.6667 27.7606 31.6667 28.7034 31.0809 29.2892C30.4951 29.875 29.5523 29.875 27.6667 29.875H5C3.11438 29.875 2.17157 29.875 1.58579 29.2892C1 28.7034 1 27.7606 1 25.875V8.53185Z"
                      stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                      stroke-width="2"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                    <path
                      id="Vector 3"
                      d="M1 10.7083H31.6667"
                      stroke={isSmallScreen ? "#154C65" : "#AFB2B7"}
                      stroke-width="2"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                    <path
                      id="Rectangle 2"
                      d="M21.7626 8.79169L10.9014 8.79169C10.4497 8.79169 10.2238 8.79169 10.0835 8.93203C9.94312 9.07238 9.94312 9.29826 9.94312 9.75002L9.94312 17.7361C9.94312 19.202 9.94312 19.935 10.1327 20.3289C10.5559 21.2083 11.5723 21.6293 12.4933 21.3067C12.9059 21.1622 13.4242 20.6439 14.4607 19.6074C14.9408 19.1273 15.1809 18.8873 15.4361 18.7523C15.9966 18.4559 16.6674 18.4559 17.2279 18.7523C17.4831 18.8873 17.7232 19.1273 18.2033 19.6074C19.2398 20.6439 19.7581 21.1622 20.1707 21.3067C21.0917 21.6293 22.1081 21.2083 22.5313 20.3289C22.7209 19.935 22.7209 19.202 22.7209 17.7361V9.75002C22.7209 9.29826 22.7209 9.07238 22.5806 8.93203C22.4402 8.79169 22.2143 8.79169 21.7626 8.79169Z"
                      fill={isSmallScreen ? "#154C65" : "#AFB2B7"}
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                  </g>
                </svg>
              </div>

              <div className="block sm:hidden relative" onClick={handleProfile}>
                <ProfileImage />
              </div>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="hidden sm:block">
          <div className="flex justify-end ">
            <div className="flex items-center space-x-4">
              {/* Messenger */}
              <div className="hidden sm:block">
                <div className="w-[45px] h-[45px] pl-[13px] pr-3 pt-[13px] pb-3 bg-neutral-200 rounded-[26px] flex justify-center items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="msg 1" clipPath="url(#clip0_1_1021)">
                      <g id="Group">
                        <path
                          id="Vector"
                          d="M9.99995 0.140015C4.58795 0.140015 0.199951 4.22601 0.199951 9.27001C0.199951 12.142 1.62595 14.706 3.85195 16.38V19.86L7.18795 18.018C8.07995 18.266 9.02195 18.4 9.99995 18.4C15.412 18.4 19.8 14.312 19.8 9.27001C19.8 4.22601 15.412 0.140015 9.99995 0.140015ZM10.974 12.434L8.47795 9.75601L3.60795 12.434L8.96395 6.71201L11.52 9.39001L16.328 6.71201L10.974 12.434Z"
                          fill="#2A2A2A"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          clipPath="url(#clip)"
                          fillOpacity="1"
                          enableBackground="new"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_1_1021">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Notification */}
              <div className="hidden sm:block">
                <div className="w-[45px] h-[45px] pl-[13px] pr-3 pt-[13px] pb-3 bg-neutral-200 rounded-[26px] justify-center items-center inline-flex">
                  <div>
                    <svg
                      width="34"
                      height="33"
                      viewBox="0 0 34 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="bell 1" clip-path="url(#clip0_1_1025)">
                        <path
                          id="Vector"
                          d="M24.6503 17.3998L24.3014 15.5065C24.2645 15.3104 24.1478 15.1302 23.9811 15.0143C22.5781 14.0851 21.5973 12.6039 21.2924 10.9638L21.0715 9.75979C20.6667 7.57573 18.9696 5.897 16.8296 5.5007L16.714 4.87667C16.6178 4.37524 16.3241 3.9171 15.9131 3.63226C15.4918 3.33126 14.9699 3.2213 14.4487 3.31281C13.3869 3.51914 12.6871 4.53949 12.8883 5.59305L13.0058 6.23828C12.3883 6.61913 11.8591 7.125 11.4523 7.72921C10.6495 8.89161 10.3475 10.3115 10.6054 11.7113L10.821 12.8793C11.1329 14.5488 10.7399 16.294 9.73995 17.6732C9.62561 17.8335 9.57581 18.0436 9.61106 18.2463L9.9697 20.128C10.0223 20.404 10.2247 20.6324 10.4909 20.7094C10.6075 20.744 10.7324 20.7737 10.8572 20.8032C11.7635 21.0181 12.8715 21.1143 14.1023 21.073L14.1089 21.0746C14.5878 22.0969 15.5038 22.8274 16.5809 23.0827C17.0669 23.1979 17.5894 23.2178 18.1187 23.1212C19.7947 22.8109 21.0137 21.4142 21.1263 19.7691C22.4648 19.3026 23.5761 18.7404 24.3727 18.1314C24.5948 17.9554 24.6962 17.6742 24.6503 17.3998ZM14.709 4.78996C14.7743 4.77772 14.8349 4.78513 14.8941 4.79917C14.9466 4.81162 14.9977 4.83069 15.0521 4.86434C15.1397 4.93373 15.213 5.03425 15.2391 5.15844L15.2901 5.44105C15.2752 5.44448 15.2541 5.44628 15.2311 5.45478C15.1036 5.4662 14.9876 5.48717 14.865 5.50672C14.7637 5.52437 14.6674 5.54999 14.5645 5.57423C14.5074 5.58144 14.4618 5.59851 14.403 5.61227L14.3537 5.32311C14.3081 5.07647 14.4689 4.83711 14.709 4.78996ZM17.8501 21.6493C17.0595 21.7948 16.2932 21.516 15.7951 20.954C15.8377 20.9502 15.8802 20.9465 15.9242 20.936C16.1809 20.9067 16.4392 20.8707 16.6973 20.8348C16.7121 20.8314 16.7251 20.8344 16.7465 20.8325C17.0553 20.7878 17.3592 20.735 17.6647 20.6757C17.9555 20.6198 18.2396 20.5622 18.5253 20.4981C18.5988 20.4809 18.6788 20.4652 18.7457 20.4463C18.9809 20.3911 19.2093 20.3342 19.4394 20.2709C19.4606 20.269 19.4835 20.2606 19.5047 20.2587C19.2466 20.9676 18.6343 21.5023 17.8501 21.6493Z"
                          fill="#2A2A2A"
                          strokeWidth="2"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          clipPath="url(#clip)"
                          fillOpacity="1"
                          enableBackground="new"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_1025">
                          <rect
                            width="27"
                            height="27"
                            fill="white"
                            transform="translate(7) rotate(13.3371)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Avatar */}
              <div className="relative" onClick={handleProfile}>
                <ProfileImage />
                <div className=" absolute bottom-0 right-0">
                  <div className="w-3.5 h-3.5 bg-zinc-300 rounded-full flex justify-center items-center cursor-pointer">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="Vector 10"
                        d="M11 1L6 6L1 1"
                        stroke="#307777"
                        stroke-width="1.5"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        clipPath="url(#clip)"
                        fillOpacity="1"
                        enableBackground="new"
                      />
                    </svg>
                  </div>
                </div>
                {showPopUp && (
                  <div className=" absolute bottom-50 right-0" ref={popupRef}>
                    <div className="bg-white/50 rounded-lg shadow-lg p-4">
                      <button
                        className="flex items-center space-x-2 font-bold text-black bg-gray-200 p-2 rounded-lg w-full"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
