import Header from "@/components/header";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <div className="bg-white sm:bg-[#E5E6EC] w-full h-full">
      <div className="hidden sm:block">
        <Header />
      </div>
      {/* <div className='hidden sm:block'>
        <StoriesSidebar />

      </div> */}
      <div className="flex justify-start items-center">
        <div className="hidden sm:block">
          <div className="bg-white max-h-[90vh] sm:block w-[250px] md:w-[382px] lg:w-[400px]">
            <div>
              <p className="text-black text-2xl font-semibold font-['Poppins'] px-8 py-4">
                Create Your story
              </p>
            </div>
            <div className="px-6">
              <select className="w-full h-10 border border-gray-300 rounded-lg px-2">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex flex-col justify-end items-center min-h-[80vh]  mx-8">
              <button className="bg-teal-700 text-white rounded-lg w-full h-10 mb-6">
                Create
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white min-h-[70vh] w-full p-6 m-6 sm:m-16 rounded-xl">
          <div className="bg-white sm:m-6 w-full h-2/3">
            <div className="flex justify-start items-center">
              <div className="block sm:hidden">
              <Link href="/home">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Close_round">
                    <path
                      id="Vector 47"
                      d="M18 6L6 18"
                      stroke="#141414"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector 48"
                      d="M6 6L18 18"
                      stroke="#141414"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
                </Link>
              </div>
              <div className="w-full">
                <p className="text-zinc-800 text-center sm:text-left text-lg font-bold font-['Public Sans'] leading-[8.36px] tracking-tight">
                  Select Story Type
                </p>
              </div>
            </div>
            <div className="sm:bg-gray-100 min-h-[60vh] sm:m-4 flex justify-center items-center">
              <div className="flex justify-center items-center space-x-3 sm:space-x-6">
                <Link href="/stories/photo">
                  <div className="w-[154px] h-[271px] sm:w-[247px] sm:h-[449px] bg-gradient-to-b from-rose-500 to-pink-500 rounded-lg flex flex-col justify-center items-center">
                    <div className="bg-white rounded-full w-[57px] h-[57px] flex justify-center items-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          id="picture-svgrepo-com 1"
                          clip-path="url(#clip0_1_299)"
                        >
                          <path
                            id="Vector"
                            d="M0.5 0.5V23.5H23.5V0.5H0.5ZM13.6128 4.54396C14.5201 4.54396 15.2556 5.2795 15.2556 6.18681C15.2556 7.09413 14.5201 7.82967 13.6128 7.82967C12.7055 7.82967 11.9699 7.09413 11.9699 6.18681C11.9699 5.2795 12.7055 4.54396 13.6128 4.54396ZM19.456 19.456H4.54396V16.1422L8.74674 11.7078L13.6128 15.1852L17.1125 13.1495L19.456 15.6223V19.456Z"
                            fill="#307777"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_299">
                            <rect
                              width="23"
                              height="23"
                              fill="white"
                              transform="translate(0.5 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <p className="text-center text-white text-base font-semibold font-['Poppins'] mt-2 hidden sm:block">
                        Create Your Photo Story
                      </p>
                      <p className="text-center text-white text-base font-semibold font-['Poppins'] mt-2 sm:hidden block">
                        Image Story
                      </p>
                    </div>
                  </div>
                </Link>
                <Link href="/stories/text">
                  <div className="w-[154px] h-[271px] sm:w-[247px] sm:h-[449px] bg-gradient-to-b from-sky-700 to-teal-300 rounded-lg flex flex-col justify-center items-center">
                    <div className="bg-white rounded-full p-4 w-[57px] h-[57px] flex justify-center items-center">
                      <p className="text-xl text-zinc-800 font-bold font-['Public Sans'] leading-[8.36px] tracking-tight">
                        Aa
                      </p>
                    </div>
                    <div>
                      <p className="text-center text-white text-base font-semibold font-['Poppins'] mt-2 hidden sm:block">
                        Create Your Text Story
                      </p>
                      <p className="text-center text-white text-base font-semibold font-['Poppins'] mt-2 sm:hidden block">
                        Text Story
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
