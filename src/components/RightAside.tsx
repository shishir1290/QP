import React from "react";

const RightAside = () => {
  return (
    <div className="hidden sm:block w-[250px] md:w-[282px] lg:w-[320px] max-h-screen overflow-y-auto scroll-smooth custom-scrollbar">
      <div className="sticky bottom-0">
        {/* Sponsored */}
        <div className="bg-white rounded-tl-md rounded-tr-md mt-[2px]">
          <div className="text-neutral-900 text-md font-semibold font-['Poppins'] tracking-tight px-4 pt-2">
            Sponsored
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between p-4 cursor-pointer">
              <div>
                <img src="/icons/sponsor1.png" alt="sponsor1" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-neutral-900 text-[16px] font-medium font-['Poppins'] tracking-tight">
                  আপনার অফিসের লাঞ্চ
                </p>
                <p className="text-zinc-400 text-[14px] font-medium font-['Poppins'] tracking-tight">
                  homefectionery.com
                </p>
              </div>
            </div>

            <div className="flex justify-between p-4 cursor-pointer">
              <div>
                <img src="/icons/sponsor2.png" alt="sponsor1" />
              </div>
              <div className="flex flex-col justify-center pl-2">
                <p className="text-neutral-900 text-[15px] font-medium font-['Poppins'] tracking-tight">
                  SEMrush এর সাথে Ubersuggest
                </p>
                <p className="text-zinc-400 text-[13px] font-medium font-['Poppins'] tracking-tight">
                  https://groupbuyservices.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Friend request */}
        <div className="bg-white mt-[2px]">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="text-neutral-900 text-lg font-medium font-['Poppins'] tracking-tight">
              Friend requests
            </div>
            <div>
              <div className="text-teal-700 text-sm font-normal font-['Poppins']">
                See All
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pl-2">
            {/* request 1 */}
            <div className="flex justify-start px-4 space-x-3">
              <div className="flex justify-center items-center">
                <img
                  src="/icons/friend2.png"
                  alt="friend 2"
                  className=" rounded-full"
                />
              </div>
              <div className="pl-4">
                <div className="flex justify-between items-center ">
                  <div className="text-black text-base font-medium font-['Poppins']">
                    Harmain Shakeel
                  </div>
                  <div className="flex justify-end px-2 relative">
                    <div className="text-teal-700 text-xs font-normal font-['Poppins']">
                      2h
                    </div>
                    <div className=" absolute top-2 right-0 w-[5px] h-[5px] bg-teal-700 rounded" />
                  </div>
                </div>

                <div className="flex justify-between space-x-3">
                  <div className="w-[95px] h-[30px] pl-[19px] pr-5 py-1.5 bg-teal-700 rounded-[5px] justify-center items-center inline-flex">
                    <button className="text-white text-base font-medium font-['Poppins'] tracking-tight">
                      Confirm
                    </button>
                  </div>

                  <div className="w-[95px] h-[30px] pl-[21px] pr-[23px] pt-1 pb-[5px] bg-zinc-800 rounded-[5px] justify-center items-center inline-flex">
                    <button className="text-white text-base font-normal font-['Poppins'] tracking-tight">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* request 2 */}
            <div className="flex justify-start px-4 space-x-3">
              <div className="flex justify-center items-center">
                <img
                  src="/icons/friend3.png"
                  alt="friend 3"
                  className=" rounded-full"
                />
              </div>
              <div className="pl-4">
                <div className="flex justify-between items-center ">
                  <div className="text-black text-base font-medium font-['Poppins']">
                    Wade Warren
                  </div>
                  <div className="flex justify-end px-2 relative">
                    <div className="text-teal-700 text-xs font-normal font-['Poppins']">
                      2Day
                    </div>
                    <div className=" absolute top-2 right-0 w-[5px] h-[5px] bg-teal-700 rounded" />
                  </div>
                </div>

                <div className="flex justify-between space-x-3">
                  <div className="w-[95px] h-[30px] pl-[19px] pr-5 py-1.5 bg-teal-700 rounded-[5px] justify-center items-center inline-flex">
                    <button className="text-white text-base font-medium font-['Poppins'] tracking-tight">
                      Confirm
                    </button>
                  </div>

                  <div className="w-[95px] h-[30px] pl-[21px] pr-[23px] pt-1 pb-[5px] bg-zinc-800 rounded-[5px] justify-center items-center inline-flex">
                    <button className="text-white text-base font-normal font-['Poppins'] tracking-tight">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* request 3 */}
            <div className="flex justify-start px-4 pb-6 space-x-3">
              <div className="flex justify-center items-center">
                <img
                  src="/icons/friend4.png"
                  alt="friend 4"
                  className=" rounded-full"
                />
              </div>
              <div className="pl-4">
                <div className="flex justify-between items-center ">
                  <div className="text-black text-base font-medium font-['Poppins']">
                    Cameron Williamson
                  </div>
                  <div className="flex justify-end px-2 relative">
                    <div className="text-teal-700 text-xs font-normal font-['Poppins']">
                      2h
                    </div>
                    <div className=" absolute top-2 right-0 w-[5px] h-[5px] bg-teal-700 rounded" />
                  </div>
                </div>

                <div className="flex justify-between space-x-3">
                  <div className="w-[95px] h-[30px] pl-[19px] pr-5 py-1.5 bg-teal-700 rounded-[5px] justify-center items-center inline-flex">
                    <button className="text-white text-base font-medium font-['Poppins'] tracking-tight">
                      Confirm
                    </button>
                  </div>

                  <div className="w-[95px] h-[30px] pl-[21px] pr-[23px] pt-1 pb-[5px] bg-zinc-800 rounded-[5px] justify-center items-center inline-flex">
                    <button className="text-white text-base font-normal font-['Poppins'] tracking-tight">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Birthdays */}
        <div className="bg-white mt-[2px] pb-4">
          <div className="p-4">
            <div className="text-neutral-900 text-[16px] font-medium font-['Poppins'] tracking-tight">
              Birthdays
            </div>
          </div>

          <div className="flex justify-start px-4  space-x-2">
            <div>
              <img
                src="/icons/birthday 1.png"
                alt="birthday1"
                className="w-12"
              />
            </div>
            <div>
              <p className="text-sm">
                <span className=" font-bold">Ibn Lokman</span> and{" "}
                <span className="font-bold">3 others</span> have birthdays
                today.
              </p>
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="bg-white mt-[2px] pb-4">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="text-neutral-900 text-lg font-medium font-['Poppins'] tracking-tight">
              Contacts
            </div>
            <div className=" cursor-pointer">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="search 1" clip-path="url(#clip0_1_958)">
                  <path
                    id="Vector"
                    d="M14.8169 13.9331L11.0862 10.2025C12.1029 8.95912 12.6027 7.37256 12.4824 5.77098C12.3621 4.16939 11.6307 2.67533 10.4397 1.59783C9.24871 0.52032 7.6891 -0.0581913 6.08351 -0.0180464C4.47792 0.0220985 2.94917 0.677828 1.81349 1.81351C0.677813 2.94919 0.0220832 4.47793 -0.0180617 6.08353C-0.0582065 7.68912 0.520305 9.24872 1.59781 10.4397C2.67532 11.6308 4.16938 12.3621 5.77096 12.4824C7.37254 12.6027 8.95911 12.1029 10.2025 11.0863L13.9331 14.8169C14.051 14.9307 14.2089 14.9937 14.3727 14.9923C14.5366 14.9909 14.6934 14.9251 14.8092 14.8093C14.9251 14.6934 14.9909 14.5366 14.9923 14.3728C14.9937 14.2089 14.9307 14.051 14.8169 13.9331ZM6.24998 11.25C5.26108 11.25 4.29438 10.9568 3.47213 10.4073C2.64989 9.85794 2.00903 9.07705 1.63059 8.16342C1.25215 7.24979 1.15313 6.24445 1.34606 5.27455C1.53899 4.30464 2.01519 3.41373 2.71445 2.71447C3.41371 2.0152 4.30463 1.539 5.27453 1.34607C6.24444 1.15315 7.24977 1.25216 8.1634 1.6306C9.07703 2.00904 9.85793 2.6499 10.4073 3.47215C10.9567 4.29439 11.25 5.26109 11.25 6.25C11.2485 7.57563 10.7212 8.84653 9.78387 9.78389C8.84651 10.7212 7.57561 11.2485 6.24998 11.25Z"
                    fill="#AEB1B5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_958">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4">
            {/* 1 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="relative">
                <img
                  src="/icons/contact1.png"
                  alt="contact1"
                  className="w-12"
                />
                <div className=" absolute right-0 bottom-1 w-[12px] h-[12px] bg-green-600 rounded-[9px] border-2 border-teal-700" />
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  Mubashra Ansari
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="relative">
                <img
                  src="/icons/contact2.png"
                  alt="contact2"
                  className="w-12"
                />
                <div className=" absolute right-0 bottom-[2px] w-6 h-3 px-[3px] bg-neutral-800 rounded-[7px] border border-teal-700 flex justify-center items-center ">
                  <div className=" text-green-600 text-[8px] font-semibold font-['Raleway'] leading-none tracking-wide">
                    39m
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  Walija Ansari
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="relative">
                <img
                  src="/icons/contact3.png"
                  alt="contact3"
                  className="w-12"
                />
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  Esther Howard
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="relative">
                <img
                  src="/icons/contact3.png"
                  alt="contact4"
                  className="w-12"
                />
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  Brooklyn Simmons
                </p>
              </div>
            </div>

            {/* 5 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="relative">
                <img
                  src="/icons/contact3.png"
                  alt="contact5"
                  className="w-12"
                />
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  Leslie Alexander
                </p>
              </div>
            </div>

            {/* 6 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="relative">
                <img
                  src="/icons/contact4.png"
                  alt="contact6"
                  className="w-12"
                />
                <div className=" absolute right-0 bottom-[2px] w-6 h-3 px-[3px] bg-neutral-800 rounded-[7px] border border-teal-700 flex justify-center items-center ">
                  <div className=" text-green-600 text-[8px] font-semibold font-['Raleway'] leading-none tracking-wide">
                    39m
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  Aoun Haider
                </p>
              </div>
            </div>

            {/* 7 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="relative">
                <img
                  src="/icons/contact5.png"
                  alt="contact7"
                  className="w-12"
                />
                <div className=" absolute right-0 bottom-[2px] w-6 h-3 px-[3px] bg-neutral-800 rounded-[7px] border border-teal-700 flex justify-center items-center ">
                  <div className=" text-green-600 text-[8px] font-semibold font-['Raleway'] leading-none tracking-wide">
                    20m
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  Aoun Haider
                </p>
              </div>
            </div>

            {/* 8 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="relative">
                <img
                  src="/icons/contact6.png"
                  alt="contact8"
                  className="w-12"
                />
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  Hams Ahmed Ansari
                </p>
              </div>
            </div>

            {/* 9 */}
            <div className="flex justify-start px-4 space-x-4 ">
              <div className="relative">
                <img
                  src="/icons/contact7.png"
                  alt="contact9"
                  className="w-12"
                />
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  Rabia Ansari
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Group conversations */}
        <div className="bg-white rounded-bl-md rounded-br-md mt-[2px]">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="text-neutral-900 text-lg font-medium font-['Poppins'] tracking-tight">
              Group conversations
            </div>
            <div className=" cursor-pointer">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="search 1" clip-path="url(#clip0_1_958)">
                  <path
                    id="Vector"
                    d="M14.8169 13.9331L11.0862 10.2025C12.1029 8.95912 12.6027 7.37256 12.4824 5.77098C12.3621 4.16939 11.6307 2.67533 10.4397 1.59783C9.24871 0.52032 7.6891 -0.0581913 6.08351 -0.0180464C4.47792 0.0220985 2.94917 0.677828 1.81349 1.81351C0.677813 2.94919 0.0220832 4.47793 -0.0180617 6.08353C-0.0582065 7.68912 0.520305 9.24872 1.59781 10.4397C2.67532 11.6308 4.16938 12.3621 5.77096 12.4824C7.37254 12.6027 8.95911 12.1029 10.2025 11.0863L13.9331 14.8169C14.051 14.9307 14.2089 14.9937 14.3727 14.9923C14.5366 14.9909 14.6934 14.9251 14.8092 14.8093C14.9251 14.6934 14.9909 14.5366 14.9923 14.3728C14.9937 14.2089 14.9307 14.051 14.8169 13.9331ZM6.24998 11.25C5.26108 11.25 4.29438 10.9568 3.47213 10.4073C2.64989 9.85794 2.00903 9.07705 1.63059 8.16342C1.25215 7.24979 1.15313 6.24445 1.34606 5.27455C1.53899 4.30464 2.01519 3.41373 2.71445 2.71447C3.41371 2.0152 4.30463 1.539 5.27453 1.34607C6.24444 1.15315 7.24977 1.25216 8.1634 1.6306C9.07703 2.00904 9.85793 2.6499 10.4073 3.47215C10.9567 4.29439 11.25 5.26109 11.25 6.25C11.2485 7.57563 10.7212 8.84653 9.78387 9.78389C8.84651 10.7212 7.57561 11.2485 6.24998 11.25Z"
                    fill="#AEB1B5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_958">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4">
            {/* 1 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="relative">
                <img
                  src="/icons/contact1.png"
                  alt="contact1"
                  className="w-12"
                />
                <div className=" absolute right-0 bottom-1 w-[12px] h-[12px] bg-green-600 rounded-[9px] border-2 border-teal-700" />
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  3 Idiots
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="relative">
                <img
                  src="/icons/contact2.png"
                  alt="contact2"
                  className="w-12"
                />
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  NZS Batch 16
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="relative">
                <img
                  src="/icons/contact3.png"
                  alt="contact3"
                  className="w-12"
                />
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  Developers Conversation
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="flex justify-start px-4 space-x-4">
              <div className="flex justify-center items-center w-12 h-12 bg-teal-700 rounded-full">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Frame 1000003632">
                    <path
                      id="Vector 8"
                      d="M8 14L8 1"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="square"
                    />
                    <path
                      id="Vector 9"
                      d="M14 8L1 8"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="square"
                    />
                  </g>
                </svg>
              </div>
              <div className="flex justify-center items-center">
                <p className="text-black text-lg font-semibold font-['Raleway'] leading-none tracking-tight">
                  Create new group
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightAside;
