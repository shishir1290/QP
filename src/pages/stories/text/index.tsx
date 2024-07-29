import Header from "@/components/header";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";


const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const Index = () => {
  const router = useRouter();
  const [bgColor, setBgColor] = useState("bg-blue-700");
  const [textColor, setTextColor] = useState("text-white");
  const [textInput, setTextInput] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<number>(16); // Initial font size
  const textInputRef = useRef<HTMLInputElement | null>(null); 
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      const userToken = JSON.parse(localStorage.getItem("userToken") || "{}");
      setUserToken(userToken);
      setUserId(userToken._id);

    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleColorClick = (color: string) => {
    setBgColor(color);
  };

  const handleTextColorClick = (color: string) => {
    setTextColor(color);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(event.target.value);
  };

  const handleTextSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextSize(parseInt(event.target.value));
  };



  const handleSubmit = async () => {
    console.log("Submitted", bgColor, textColor, textSize, textInput);
    try{
      const res = await axios.post(`${Backend_url}/api/story/create-story-text/${userId}`, {
        background_color: bgColor,
        text_color: textColor,
        text_size: textSize,
        title: textInput,
      });
      if(res.data){
        console.log(res.data);
        router.push("/home");
      }
    }catch(err){
      console.log(err);
    }
    
  };

  return (
    <div className="bg-white sm:bg-[#E5E6EC] w-full h-full">
      <div className="hidden sm:block">
        <Header />
      </div>
      <div className="flex justify-start items-center">
        <div className="hidden sm:block">
          <div className="bg-white max-h-[90vh] sm:block w-[250px] md:w-[382px] lg:w-[400px]">
            <div>
              <p className="text-black text-2xl font-semibold font-['Poppins'] px-8 py-4">
                Create Your story
              </p>
            </div>

            <p className="text-black text-lg font-medium font-['Poppins'] px-8 py-4">
              Select Background color
            </p>
            <div className="flex justify-center items-center border border-neutral-300 mx-6 mb-4">
              <div className="flex flex-col">
                <div className="relative inline-block w-full">
                  <div className="flex justify-center items-center space-x-2 p-4">
                    <div
                      className="w-[26px] h-[26px] bg-teal-400 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-teal-400")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-blue-700 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-blue-700")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-cyan-800 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-cyan-800")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-sky-500 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-sky-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-rose-500 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-rose-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-orange-500 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-orange-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-yellow-400 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-yellow-400")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-lime-500 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-lime-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-red-600 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-red-600")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-black text-lg font-medium font-['Poppins'] px-8 py-4">
              Select Text color
            </p>
            <div className="flex justify-center items-center border border-neutral-300 mx-6 mb-4">
              <div className="flex flex-col">
                <div className="relative inline-block w-full">
                  <div className="flex justify-center items-center space-x-2 p-4">
                    <div
                      className="w-[26px] h-[26px] bg-teal-400 rounded-full cursor-pointer"
                      onClick={() => handleTextColorClick("text-teal-400")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-blue-700 rounded-full cursor-pointer"
                      onClick={() => handleTextColorClick("text-blue-700")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-cyan-800 rounded-full cursor-pointer"
                      onClick={() => handleTextColorClick("text-cyan-800")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-sky-500 rounded-full cursor-pointer"
                      onClick={() => handleTextColorClick("text-sky-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-rose-500 rounded-full cursor-pointer"
                      onClick={() => handleTextColorClick("text-rose-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-orange-500 rounded-full cursor-pointer"
                      onClick={() => handleTextColorClick("text-orange-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-yellow-400 rounded-full cursor-pointer"
                      onClick={() => handleTextColorClick("text-yellow-400")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-lime-500 rounded-full cursor-pointer"
                      onClick={() => handleTextColorClick("text-lime-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-red-600 rounded-full cursor-pointer"
                      onClick={() => handleTextColorClick("text-red-600")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6">
              <select className="w-full h-10 border border-gray-300 rounded-lg px-2">
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex flex-col justify-end items-center min-h-[55vh] mx-8">
              <button className="bg-teal-700 text-white rounded-lg w-full h-10 mb-6" onClick={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white min-h-[70vh] w-full p-6 m-6 sm:m-16 rounded-xl">
          <div className="bg-white sm:m-6 w-full h-2/3">
            <div className="flex justify-between items-center block sm:hidden w-full">
              <div className="block sm:hidden">
                <Link href="/stories">
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
              <div className="w-auto">
                <button className="bg-teal-700 text-white rounded-lg w-16 h-10" onClick={handleSubmit}>
                  Done
                </button>
              </div>
            </div>
            <div className="sm:bg-gray-100 min-h-[60vh] sm:m-4 mt-6 sm:mt-0 flex flex-col justify-center items-center gap-8">
              <div
                className={`${bgColor} w-[247px] h-[449px] rounded-lg flex flex-col justify-center items-center relative overflow-hidden`}
              >
                <textarea
                  className={`${textColor} w-full h-full bg-transparent overflow-y-auto custom-scrollbar`}
                  style={{
                    fontSize: `${textSize}px`,
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    textAlign: "center",
                    resize: "none",
                    paddingTop: "80%", // Adjusts top padding to start text from top center
                    // paddingBottom: "50%", // Adjusts bottom padding to start text from bottom center
                  }}
                  value={textInput}
                  onChange={handleTextChange}
                />
              </div>

              <div className="flex items-center justify-center w-96 px-4">
                <input
                  type="range"
                  min="10"
                  max="32"
                  value={textSize}
                  onChange={handleTextSizeChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-center items-center space-x-2 p-4 block sm:hidden">
                <div
                  className="w-[26px] h-[26px] bg-teal-400 rounded-full cursor-pointer"
                  onClick={() => handleTextColorClick("text-teal-400")}
                />
                <div
                  className="w-[26px] h-[26px] bg-blue-700 rounded-full cursor-pointer"
                  onClick={() => handleTextColorClick("text-blue-700")}
                />
                <div
                  className="w-[26px] h-[26px] bg-cyan-800 rounded-full cursor-pointer"
                  onClick={() => handleTextColorClick("text-cyan-800")}
                />
                <div
                  className="w-[26px] h-[26px] bg-sky-500 rounded-full cursor-pointer"
                  onClick={() => handleTextColorClick("text-sky-500")}
                />
                <div
                  className="w-[26px] h-[26px] bg-rose-500 rounded-full cursor-pointer"
                  onClick={() => handleTextColorClick("text-rose-500")}
                />
                <div
                  className="w-[26px] h-[26px] bg-orange-500 rounded-full cursor-pointer"
                  onClick={() => handleTextColorClick("text-orange-500")}
                />
                <div
                  className="w-[26px] h-[26px] bg-yellow-400 rounded-full cursor-pointer"
                  onClick={() => handleTextColorClick("text-yellow-400")}
                />
                <div
                  className="w-[26px] h-[26px] bg-lime-500 rounded-full cursor-pointer"
                  onClick={() => handleTextColorClick("text-lime-500")}
                />
                <div
                  className="w-[26px] h-[26px] bg-red-600 rounded-full cursor-pointer"
                  onClick={() => handleTextColorClick("text-red-600")}
                />
              </div>

              <div className="flex justify-center items-center border border-neutral-300 mx-6 mb-4 block sm:hidden">
              <div className="flex flex-col">
                <div className="relative inline-block w-full">
                  <div className="flex justify-center items-center space-x-2 p-4">
                    <div
                      className="w-[26px] h-[26px] bg-teal-400 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-teal-400")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-blue-700 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-blue-700")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-cyan-800 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-cyan-800")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-sky-500 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-sky-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-rose-500 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-rose-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-orange-500 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-orange-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-yellow-400 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-yellow-400")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-lime-500 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-lime-500")}
                    />
                    <div
                      className="w-[26px] h-[26px] bg-red-600 rounded-full cursor-pointer"
                      onClick={() => handleColorClick("bg-red-600")}
                    />
                  </div>
                </div>
              </div>
            </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
