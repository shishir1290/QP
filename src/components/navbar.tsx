import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProfileImage from "./profileImage";

const Backend_url = process.env.NEXT_PUBLIC_BACKEND_PORT;

const Navbar = () => {
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState<string | null>(null);

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
      setFullName(userToken.fullName); // Set first name state if available
    }
  }, [router]);

  return (
    <div className="bg-white w-[300px] sticky top-[69px]">
      <div className="left-0 p-6 hidden sm:block ">
        <div className=" grid grid-cols-1 gap-5">
          <div className="flex items-center justify-start space-x-4 cursor-pointer">
            <div>
              <ProfileImage />
            </div>
            <div className="text-xl font-semibold font-sans-serif">
              {fullName}
            </div>
          </div>

          {/* Explore */}
          <div className="flex items-center justify-start space-x-4 cursor-pointer">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Map_duotone_line">
                  <path
                    id="Vector 372"
                    d="M4.5 7.5L8.5 5.5V15.5L5.5 17H4.5V7.5Z"
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
                  <path
                    id="Vector 373"
                    d="M19.5 15.5L15.5 17.5V7.5L18.5 6H19.5V15.5Z"
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
                  <path
                    id="Vector 326"
                    d="M19.5 15.2219V6.22812C19.5 5.89359 19.148 5.67602 18.8488 5.82562L15.6566 7.42172C15.5559 7.47207 15.4399 7.48284 15.3317 7.45191L8.66831 5.54809C8.56005 5.51716 8.44414 5.52793 8.34344 5.57828L4.74875 7.37562C4.5963 7.45185 4.5 7.60767 4.5 7.77812V16.7719C4.5 17.1064 4.85204 17.324 5.15125 17.1744L8.34344 15.5783C8.44414 15.5279 8.56005 15.5172 8.66831 15.5481L15.3317 17.4519C15.4399 17.4828 15.5559 17.4721 15.6566 17.4217L19.2512 15.6244C19.4037 15.5482 19.5 15.3923 19.5 15.2219Z"
                    stroke="#222222"
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
                    id="Vector 327"
                    d="M15.5 17.5V7.5"
                    stroke="#222222"
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
                    id="Vector 328"
                    d="M8.5 15.5V5.5"
                    stroke="#222222"
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

            <div className="text-lg font-normal">Explore</div>
          </div>

          {/* Friends */}
          <div className="flex items-center justify-start space-x-4 cursor-pointer">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group">
                  <circle
                    id="Ellipse 46"
                    cx="12"
                    cy="8"
                    r="3.25"
                    stroke="#307777"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    id="Ellipse 47"
                    d="M15.0514 7.875C15.3498 7.35821 15.8413 6.98111 16.4177 6.82667C16.9941 6.67222 17.6082 6.75307 18.125 7.05144C18.6418 7.34981 19.0189 7.84125 19.1733 8.41766C19.3278 8.99406 19.2469 9.60821 18.9486 10.125C18.6502 10.6418 18.1587 11.0189 17.5823 11.1733C17.0059 11.3278 16.3918 11.2469 15.875 10.9486C15.3582 10.6502 14.9811 10.1587 14.8267 9.58234C14.6722 9.00594 14.7531 8.39179 15.0514 7.875L15.0514 7.875Z"
                    stroke="#307777"
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
                    d="M5.05144 7.875C5.34981 7.35821 5.84125 6.98111 6.41766 6.82667C6.99406 6.67222 7.60821 6.75307 8.125 7.05144C8.64179 7.34981 9.01889 7.84125 9.17333 8.41766C9.32778 8.99406 9.24693 9.60821 8.94856 10.125C8.65019 10.6418 8.15875 11.0189 7.58234 11.1733C7.00594 11.3278 6.39179 11.2469 5.875 10.9486C5.35821 10.6502 4.98111 10.1587 4.82667 9.58234C4.67222 9.00594 4.75307 8.39179 5.05144 7.875L5.05144 7.875Z"
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
                  <path
                    id="Subtract"
                    d="M16.8816 18L16.1463 18.1481L16.2676 18.75H16.8816V18ZM20.7201 16.9042L21.427 16.6534L20.7201 16.9042ZM14.7808 14.7105L14.3271 14.1133L13.4597 14.7721L14.3847 15.3474L14.7808 14.7105ZM19.8672 17.25H16.8816V18.75H19.8672V17.25ZM20.0133 17.1549C20.0173 17.1663 20.0182 17.1732 20.0185 17.1759C20.0187 17.1787 20.0185 17.1799 20.0184 17.1802C20.0183 17.1805 20.0181 17.1817 20.0171 17.1839C20.016 17.1861 20.0139 17.19 20.01 17.1949C19.9933 17.2156 19.9474 17.25 19.8672 17.25V18.75C20.877 18.75 21.8363 17.8073 21.427 16.6534L20.0133 17.1549ZM17 14.75C18.8049 14.75 19.627 16.0658 20.0133 17.1549L21.427 16.6534C20.9732 15.374 19.7851 13.25 17 13.25V14.75ZM15.2344 15.3078C15.6617 14.9833 16.2264 14.75 17 14.75V13.25C15.8935 13.25 15.0111 13.5937 14.3271 14.1133L15.2344 15.3078ZM14.3847 15.3474C15.51 16.0473 15.9666 17.2559 16.1463 18.1481L17.6168 17.8519C17.4043 16.7969 16.8192 15.0951 15.1769 14.0737L14.3847 15.3474Z"
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
                  <path
                    id="Subtract_2"
                    d="M9.21924 14.7105L9.61533 15.3474L10.5403 14.7721L9.67288 14.1133L9.21924 14.7105ZM3.27986 16.9041L3.98671 17.1549L3.98671 17.1549L3.27986 16.9041ZM7.11841 18V18.75H7.73242L7.85365 18.1481L7.11841 18ZM7.00008 14.75C7.77358 14.75 8.33834 14.9833 8.7656 15.3078L9.67288 14.1133C8.98887 13.5937 8.10647 13.25 7.00008 13.25V14.75ZM3.98671 17.1549C4.37301 16.0658 5.19512 14.75 7.00008 14.75V13.25C4.21493 13.25 3.02681 15.374 2.57301 16.6534L3.98671 17.1549ZM4.13284 17.25C4.05257 17.25 4.00667 17.2156 3.99004 17.1949C3.98608 17.19 3.98396 17.1861 3.98291 17.1839C3.9819 17.1817 3.98166 17.1805 3.98159 17.1802C3.98154 17.1799 3.98132 17.1787 3.98155 17.1759C3.98178 17.1732 3.98266 17.1663 3.98671 17.1549L2.57301 16.6534C2.16372 17.8073 3.12296 18.75 4.13284 18.75V17.25ZM7.11841 17.25H4.13284V18.75H7.11841V17.25ZM7.85365 18.1481C8.03334 17.2559 8.49001 16.0473 9.61533 15.3474L8.82315 14.0736C7.18083 15.0951 6.59567 16.7969 6.38318 17.8519L7.85365 18.1481Z"
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
                  <path
                    id="Rectangle 4160"
                    d="M12 14C15.5715 14 16.5919 16.5512 16.8834 18.0089C16.9917 18.5504 16.5523 19 16 19H8C7.44772 19 7.00829 18.5504 7.11659 18.0089C7.4081 16.5512 8.42846 14 12 14Z"
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
                </g>
              </svg>
            </div>

            <div className="text-lg font-normal">Friends</div>
          </div>

          {/* Groups */}
          <div className="flex items-center justify-start space-x-4 cursor-pointer">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="User_circle_duotone_line">
                  <circle
                    id="Ellipse 46"
                    cx="12"
                    cy="10"
                    r="3"
                    fill="#307777"
                  />
                  <circle
                    id="Ellipse 47"
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="#307777"
                    stroke-width="1.2"
                  />
                  <path
                    id="Ellipse 48"
                    d="M17.8719 18.8083C17.9489 18.7468 17.9799 18.6436 17.9452 18.5513C17.5693 17.5518 16.8134 16.6706 15.7814 16.0332C14.6966 15.3632 13.3674 15 12 15C10.6326 15 9.30341 15.3632 8.21858 16.0332C7.18663 16.6706 6.43066 17.5518 6.05477 18.5513C6.02009 18.6436 6.05115 18.7468 6.12813 18.8083C9.56196 21.552 14.438 21.552 17.8719 18.8083Z"
                    fill="#97BABA"
                    stroke="#307777"
                    stroke-width="1.2"
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

            <div className="text-lg font-normal">Groups</div>
          </div>

          {/* Pages */}
          <div className="flex items-center justify-start space-x-4 cursor-pointer">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="File_dock_duotone_line">
                  <path
                    id="Rectangle 4"
                    d="M13 7V3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V9H15C14.0572 9 13.5858 9 13.2929 8.70711C13 8.41421 13 7.94281 13 7Z"
                    fill="#97BABA"
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
                    id="Rectangle 1"
                    d="M13.1716 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8.82843C19 8.41968 19 8.2153 18.9239 8.03153C18.8478 7.84776 18.7032 7.70324 18.4142 7.41421L14.5858 3.58579C14.2968 3.29676 14.1522 3.15224 13.9685 3.07612C13.7847 3 13.5803 3 13.1716 3Z"
                    stroke="#307777"
                    stroke-width="1.2"
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
                    id="Vector 55"
                    d="M9 13L15 13"
                    stroke="#307777"
                    stroke-width="1.2"
                    stroke-linecap="round"
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
                    id="Vector 58"
                    d="M9 17L13 17"
                    stroke="#307777"
                    stroke-width="1.2"
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
                    d="M13 3V7C13 7.94281 13 8.41421 13.2929 8.70711C13.5858 9 14.0572 9 15 9H19"
                    stroke="#307777"
                    stroke-width="1.2"
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

            <div className="text-lg font-normal">Pages</div>
          </div>

          {/* Bookmarks */}
          <div className="flex items-center justify-start space-x-4 cursor-pointer">
            <div>
              <svg
                width="17"
                height="19"
                viewBox="0 0 17 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 1000003339">
                  <rect
                    id="Rectangle 25"
                    x="3"
                    y="1"
                    width="13"
                    height="17"
                    rx="2"
                    fill="#97BABA"
                    stroke="#307777"
                    stroke-width="1.2"
                  />
                  <path
                    id="Vector 58"
                    d="M12 7V5"
                    stroke="#307777"
                    stroke-width="1.2"
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
                    id="Vector 59"
                    d="M1 6H5"
                    stroke="#307777"
                    stroke-width="1.2"
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
                    id="Vector 60"
                    d="M1 10H5"
                    stroke="#307777"
                    stroke-width="1.2"
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
                    id="Vector 61"
                    d="M1 14H5"
                    stroke="#307777"
                    stroke-width="1.2"
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

            <div className="text-lg font-normal">Bookmarks</div>
          </div>

          {/* Wallet */}
          <div className="flex items-center justify-start space-x-4 cursor-pointer">
            <div>
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 1000003340">
                  <rect
                    id="Rectangle 4003"
                    x="13"
                    y="10"
                    width="6"
                    height="4"
                    fill="#97BABA"
                  />
                  <path
                    id="Vector 213"
                    d="M18 4V1H3.5C2.11929 1 1 2.11929 1 3.5C1 4.88071 2.11929 6 3.5 6H16L18 4Z"
                    fill="#97BABA"
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
                    id="Vector 57"
                    d="M1.00001 3.5V3.5C1.00001 2.11929 2.1193 1 3.50001 1L17.2857 1C17.4852 1 17.585 1 17.6651 1.02806C17.8088 1.07831 17.9217 1.19124 17.9719 1.33486C18 1.41505 18 1.51479 18 1.71429V1.71429C18 2.91124 18 3.50972 17.8317 3.99084C17.5301 4.85258 16.8526 5.53011 15.9908 5.83165C15.5097 6 14.9112 6 13.7143 6L13 6M1.00001 3.5V3.5C1.00001 4.88071 2.11929 6 3.50001 6L17 6C17.9428 6 18.4142 6 18.7071 6.29289C19 6.58579 19 7.05719 19 8L19 10M1.00001 3.5L1.00001 14C1.00001 15.8856 1.00001 16.8284 1.58579 17.4142C2.17158 18 3.11439 18 5.00001 18L17 18C17.9428 18 18.4142 18 18.7071 17.7071C19 17.4142 19 16.9428 19 16L19 14M19 14H15C14.0572 14 13.5858 14 13.2929 13.7071C13 13.4142 13 12.9428 13 12V12C13 11.0572 13 10.5858 13.2929 10.2929C13.5858 10 14.0572 10 15 10H19M19 14L19 10"
                    stroke="#307777"
                    stroke-width="1.2"
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

            <div className="text-lg font-normal">Wallet</div>
          </div>

          {/* Market Place */}
          <div className="flex items-center justify-start space-x-4 cursor-pointer">
            <div>
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 1000003341">
                  <path
                    id="Rectangle 1"
                    d="M1 5.65685C1 4.83935 1 4.4306 1.15224 4.06306C1.30448 3.69552 1.59351 3.40649 2.17157 2.82843L2.82843 2.17157C3.40649 1.59351 3.69552 1.30448 4.06306 1.15224C4.4306 1 4.83935 1 5.65685 1H12.3431C13.1606 1 13.5694 1 13.9369 1.15224C14.3045 1.30448 14.5935 1.59351 15.1716 2.17157L15.8284 2.82843C16.4065 3.40649 16.6955 3.69552 16.8478 4.06306C17 4.4306 17 4.83935 17 5.65685V12C17 13.8856 17 14.8284 16.4142 15.4142C15.8284 16 14.8856 16 13 16H5C3.11438 16 2.17157 16 1.58579 15.4142C1 14.8284 1 13.8856 1 12V5.65685Z"
                    stroke="#307777"
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
                    d="M1 6H17"
                    stroke="#307777"
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
                    d="M11.8327 5L6.16602 5C5.93031 5 5.81246 5 5.73924 5.07322C5.66602 5.14645 5.66602 5.2643 5.66602 5.5L5.66602 9.66667C5.66602 10.4315 5.66602 10.8139 5.76492 11.0194C5.98572 11.4782 6.51601 11.6979 6.99656 11.5296C7.21184 11.4542 7.48224 11.1838 8.02304 10.643C8.27351 10.3925 8.39875 10.2673 8.53191 10.1969C8.82436 10.0422 9.17434 10.0422 9.46678 10.1969C9.59994 10.2673 9.72518 10.3925 9.97566 10.643C10.5165 11.1838 10.7869 11.4542 11.0021 11.5296C11.4827 11.6979 12.013 11.4782 12.2338 11.0194C12.3327 10.8139 12.3327 10.4315 12.3327 9.66667V5.5C12.3327 5.2643 12.3327 5.14645 12.2595 5.07322C12.1862 5 12.0684 5 11.8327 5Z"
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
              </svg>
            </div>

            <div className="text-lg font-normal">Market Place</div>
          </div>

          {/* Seller Panel */}
          <div className="flex items-center justify-start space-x-4 cursor-pointer">
            <div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 1000003342">
                  <path
                    id="Ellipse 119"
                    d="M6 9C6 9.79565 6.31607 10.5587 6.87868 11.1213C7.44129 11.6839 8.20435 12 9 12C9.79565 12 10.5587 11.6839 11.1213 11.1213C11.6839 10.5587 12 9.79565 12 9"
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
                  <path
                    id="Rectangle 1"
                    d="M1.5 5.7111C1.5 5.10998 1.5 4.80941 1.58582 4.52598C1.67163 4.24255 1.83835 3.99247 2.1718 3.4923L2.31253 3.2812C2.89382 2.40927 3.18447 1.9733 3.62665 1.73665C4.06884 1.5 4.5928 1.5 5.64074 1.5H12.3593C13.4072 1.5 13.9312 1.5 14.3733 1.73665C14.8155 1.9733 15.1062 2.40927 15.6875 3.2812L15.8282 3.4923C16.1616 3.99247 16.3284 4.24255 16.4142 4.52598C16.5 4.80941 16.5 5.10998 16.5 5.7111V12.5C16.5 14.3856 16.5 15.3284 15.9142 15.9142C15.3284 16.5 14.3856 16.5 12.5 16.5H5.5C3.61438 16.5 2.67157 16.5 2.08579 15.9142C1.5 15.3284 1.5 14.3856 1.5 12.5V5.7111Z"
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
                  <path
                    id="Vector 3"
                    d="M1.5 6.5H16.5"
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
                </g>
              </svg>
            </div>
            <div className="text-lg font-normal">Seller Panel</div>
          </div>

          {/* Buyer Panel */}
          <div className="flex items-center justify-start space-x-4 cursor-pointer">
            <div>
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 1000003343">
                  <path
                    id="Rectangle 1"
                    d="M4 7.65685C4 6.83935 4 6.4306 4.15224 6.06306C4.30448 5.69552 4.59351 5.40649 5.17157 4.82843L5.82843 4.17157C6.40649 3.59351 6.69552 3.30448 7.06306 3.15224C7.4306 3 7.83935 3 8.65685 3H11.3431C12.1606 3 12.5694 3 12.9369 3.15224C13.3045 3.30448 13.5935 3.59351 14.1716 4.17157L14.8284 4.82843C15.4065 5.40649 15.6955 5.69552 15.8478 6.06306C16 6.4306 16 6.83935 16 7.65685V12C16 13.8856 16 14.8284 15.4142 15.4142C14.8284 16 13.8856 16 12 16H8C6.11438 16 5.17157 16 4.58579 15.4142C4 14.8284 4 13.8856 4 12V7.65685Z"
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
                  <path
                    id="Vector 3"
                    d="M7 3L4.13868 1.09245C4.0547 1.03647 3.9453 1.03647 3.86132 1.09245L1.25373 2.83084C1.12247 2.91835 1.10408 3.10408 1.21563 3.21563L3.79289 5.79289C3.9255 5.9255 4 6.10536 4 6.29289V6.29289C4 6.68342 4.31658 7 4.70711 7H15.2929C15.6834 7 16 6.68342 16 6.29289V6.29289C16 6.10536 16.0745 5.9255 16.2071 5.79289L18.7844 3.21563C18.8959 3.10408 18.8775 2.91835 18.7463 2.83084L16.1387 1.09245C16.0547 1.03647 15.9453 1.03647 15.8613 1.09245L13 3"
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
                </g>
              </svg>
            </div>
            <div className="text-lg font-normal">Buyer Panel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
