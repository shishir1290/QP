import React from "react";

const LeftAside = () => {
  return (
    <div className=" hidden sm:block w-[250px] md:w-[282px] lg:w-[300px] max-h-screen overflow-y-auto scroll-smooth custom-scrollbar mt-1">
      <div className="sticky bottom-0">
      <div className="relative">
        <img src="/icons/Rectangle 9.png" alt="logo" className="w-[300px]" />
        <div className="absolute h-[90px] bottom-0 flex justify-center items-center p-1 pl-2 pb-4 bg-black bg-opacity-80 text-white">
          <p>
            Karabakh humanitarian fears grow with thousands sleeping on
            Stepanakert streets
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center my-4">
        <svg
          width="82"
          height="9"
          viewBox="0 0 82 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Group 13">
            <path
              id="Ellipse 3"
              d="M9.5 4.5C9.5 6.98528 7.48528 9 5 9C2.51472 9 0.5 6.98528 0.5 4.5C0.5 2.01472 2.51472 0 5 0C7.48528 0 9.5 2.01472 9.5 4.5Z"
              fill="#444343"
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
              id="Ellipse 4"
              d="M33.5 4.5C33.5 6.98528 31.4853 9 29 9C26.5147 9 24.5 6.98528 24.5 4.5C24.5 2.01472 26.5147 0 29 0C31.4853 0 33.5 2.01472 33.5 4.5Z"
              fill="#8C8888"
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
              id="Ellipse 5"
              d="M57.5 4.5C57.5 6.98528 55.4853 9 53 9C50.5147 9 48.5 6.98528 48.5 4.5C48.5 2.01472 50.5147 0 53 0C55.4853 0 57.5 2.01472 57.5 4.5Z"
              fill="#8C8888"
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
              id="Ellipse 6"
              d="M81.5 4.5C81.5 6.98528 79.4853 9 77 9C74.5147 9 72.5 6.98528 72.5 4.5C72.5 2.01472 74.5147 0 77 0C79.4853 0 81.5 2.01472 81.5 4.5Z"
              fill="#8C8888"
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

      <div className="bg-white rounded-md">
        <div className="text-cyan-950 text-base font-bold text-center py-4">
          Pages You Might Like
        </div>

        {/* 1st */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-start space-x-3 px-3">
            <div>
              <img
                src="/icons/Ellipse 15.png"
                alt="icon"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-cyan-950 text-md font-bold font-['Roboto']">
                Angelina Super..
              </p>
              <p className="text-teal-700 text-[12px] font-normal font-['Poppins']">
                Fashion Brand
              </p>
            </div>
            <div className="pl-8">
              <button className="w-[60px] h-[26px] bg-teal-700 rounded text-white text-center text-xs font-medium font-['Roboto']">
                Follow
              </button>
            </div>
          </div>

          {/* 2nd */}
          <div className="flex justify-start space-x-3 px-3">
            <div>
              <img
                src="/icons/image1.png"
                alt="icon"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-cyan-950 text-md font-bold font-['Roboto']">
                Angelina Super..
              </p>
              <p className="text-teal-700 text-[12px] font-normal font-['Poppins']">
                Fashion Brand
              </p>
            </div>
            <div className="pl-8">
              <button className="w-[60px] h-[26px] bg-teal-700 rounded text-white text-center text-xs font-medium font-['Roboto']">
                Follow
              </button>
            </div>
          </div>

          {/* 3rd */}
          <div className="flex justify-start space-x-3 px-3">
            <div>
              <img
                src="/icons/Ellipse 15.png"
                alt="icon"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-cyan-950 text-md font-bold font-['Roboto']">
                Angelina Super..
              </p>
              <p className="text-teal-700 text-[12px] font-normal font-['Poppins']">
                Fashion Brand
              </p>
            </div>
            <div className="pl-8">
              <button className="w-[60px] h-[26px] bg-teal-700 rounded text-white text-center text-xs font-medium font-['Roboto']">
                Follow
              </button>
            </div>
          </div>

          {/* 4th */}
          <div className="flex justify-start space-x-3 px-3">
            <div>
              <img
                src="/icons/Ellipse 15.png"
                alt="icon"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-cyan-950 text-md font-bold font-['Roboto']">
                Angelina Super..
              </p>
              <p className="text-teal-700 text-[12px] font-normal font-['Poppins']">
                Fashion Brand
              </p>
            </div>
            <div className="pl-8">
              <button className="w-[60px] h-[26px] bg-teal-700 rounded text-white text-center text-xs font-medium font-['Roboto']">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* pages you may know */}
      <div className="bg-white rounded-md mt-2">
        <div className="flex justify-between items-center px-4">
          <div className="text-cyan-950 text-base font-bold text-center py-4">
            Pages You May Know
          </div>
          <div>
            <div className="text-teal-700 text-xs font-medium font-['Poppins']">
              See All
            </div>
          </div>
        </div>

        {/* 1st */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between px-3">
            <div className="flex justify-start space-x-3">
              <div>
                <img
                  src="/icons/image1.png"
                  alt="image1"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-start">
                <div className="text-cyan-950 text-md font-bold font-['Roboto']">
                  Angelina Anika
                </div>
                <div className="text-teal-700 text-[12px] font-normal font-['Poppins']">
                  6 Friends in Common
                </div>
              </div>
            </div>
            <div className=" cursor-pointer">
              <img className="w-6 h-[23.30px]" src="/icons/friend1.png" />
            </div>
          </div>

          {/* 2nd */}
          <div className="flex justify-between px-3">
            <div className="flex justify-start space-x-3">
              <div>
                <img
                  src="/icons/image1.png"
                  alt="image1"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-start">
                <div className="text-cyan-950 text-md font-bold font-['Roboto']">
                  Angelina Anika
                </div>
                <div className="text-teal-700 text-[12px] font-normal font-['Poppins']">
                  6 Friends in Common
                </div>
              </div>
            </div>
            <div className=" cursor-pointer">
              <img className="w-6 h-[23.30px]" src="/icons/friend1.png" />
            </div>
          </div>

          {/* 3rd */}
          <div className="flex justify-between px-3">
            <div className="flex justify-start space-x-3">
              <div>
                <img
                  src="/icons/image1.png"
                  alt="image1"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-start">
                <div className="text-cyan-950 text-md font-bold font-['Roboto']">
                  Angelina Anika
                </div>
                <div className="text-teal-700 text-[12px] font-normal font-['Poppins']">
                  6 Friends in Common
                </div>
              </div>
            </div>
            <div className=" cursor-pointer">
              <img className="w-6 h-[23.30px]" src="/icons/friend1.png" />
            </div>
          </div>

          {/* 4th */}
          <div className="flex justify-between px-3">
            <div className="flex justify-start space-x-3">
              <div>
                <img
                  src="/icons/image1.png"
                  alt="image1"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-start">
                <div className="text-cyan-950 text-md font-bold font-['Roboto']">
                  Angelina Anika
                </div>
                <div className="text-teal-700 text-[12px] font-normal font-['Poppins']">
                  6 Friends in Common
                </div>
              </div>
            </div>
            <div className=" cursor-pointer">
              <img className="w-6 h-[23.30px]" src="/icons/friend1.png" />
            </div>
          </div>

          {/* 5th */}
          <div className="flex justify-between px-3">
            <div className="flex justify-start space-x-3">
              <div>
                <img
                  src="/icons/image1.png"
                  alt="image1"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-start">
                <div className="text-cyan-950 text-md font-bold font-['Roboto']">
                  Angelina Anika
                </div>
                <div className="text-teal-700 text-[12px] font-normal font-['Poppins']">
                  6 Friends in Common
                </div>
              </div>
            </div>
            <div className=" cursor-pointer">
              <img className="w-6 h-[23.30px]" src="/icons/friend1.png" />
            </div>
          </div>

          {/* 6th */}
          <div className="flex justify-between px-3 pb-4">
            <div className="flex justify-start space-x-3">
              <div>
                <img
                  src="/icons/image1.png"
                  alt="image1"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-start">
                <div className="text-cyan-950 text-md font-bold font-['Roboto']">
                  Angelina Anika
                </div>
                <div className="text-teal-700 text-[12px] font-normal font-['Poppins']">
                  6 Friends in Common
                </div>
              </div>
            </div>
            <div className=" cursor-pointer">
              <img className="w-6 h-[23.30px]" src="/icons/friend1.png" />
            </div>
          </div>
        </div>
      </div>

      {/* Sponsored */}
      <div className="bg-white rounded-md mt-2">
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
    </div>
    </div>
  );
};

export default LeftAside;
