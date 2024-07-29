import Header from "@/components/header";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Jwt, { JwtPayload } from "jsonwebtoken";


const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Index = () => {
  const router = useRouter();
  const [bgColor, setBgColor] = useState("bg-blue-700");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageScale, setImageScale] = useState<number>(100);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [access_token, setAccessToken] = useState<string | null>(null);
  const [refresh_token, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);


  useEffect(() => {
    const access_token = localStorage.getItem("accessToken");
    const refresh_token = localStorage.getItem("refreshToken");
    const user = localStorage.getItem("userToken");

    if(!access_token || !refresh_token || !user){
      router.push("/login");
      return; // Exit early if tokens are missing
    }

    // Check if tokens are not null and then decode
    if (access_token && refresh_token && user) {
        const decoded = Jwt.decode(access_token) as JwtPayload;
        setUser(decoded.userId);
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
    }
}, []);

  const handleColorClick = (color: any) => {
    setBgColor(color);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDivClick = (e: React.MouseEvent) => {
    if (!isMobile && imagePreview) {
      e.preventDefault();
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDoubleClick = () => {
    if (!isMobile && imagePreview) {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(event.target.files?.[0]);
    
    if (file) {
      // setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImagePosition({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageScale(Number(event.target.value));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && imageRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      setImagePosition({
        x: e.clientX - rect.left - imageRef.current.clientWidth / 2,
        y: e.clientY - rect.top - imageRef.current.clientHeight / 2,
      });
    }
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && imageRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      setImagePosition({
        x: touch.clientX - rect.left - imageRef.current.clientWidth / 2,
        y: touch.clientY - rect.top - imageRef.current.clientHeight / 2,
      });
    }
  };

  // post story
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append("image", image as Blob);
    formData.append("image_scale", imageScale.toString());
    formData.append("background_color", bgColor);
    formData.append("image_position_x", imagePosition.x.toString());
    formData.append("image_position_y", imagePosition.y.toString());

    try {
      const res = await axios.post(`${BackendUrl}/api/story/create-story-image/${user}`, 
        {
          image: image,
          image_scale: imageScale,
          background_color: bgColor,
          image_position_x: imagePosition.x,
          image_position_y: imagePosition.y,
        
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${access_token}`,
          }
        }
      );
      if (res.data) {
        router.push("/home");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('AxiosError:', err.message);
        console.error('Response Data:', err.response?.data);
      } else {
        console.error('Error:', err);
      }
    }
  };


  return (
    <div className={`bg-white sm:bg-[#E5E6EC] w-full h-full `}>
      {/* <div className={`${bgColor}`}> */}
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
            <div className="mx-6">
              <textarea
                className="w-full h-40 border border-gray-300 rounded-lg px-2 pt-2 placeholder-gray-500"
                placeholder="Start Typing"
              />
            </div>

            <div className="flex justify-center items-center border border-neutral-300 mx-6">
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
            <div className="flex justify-start items-center">
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
              <div className="w-full">
                <p className="text-zinc-800 text-center sm:text-left text-lg font-bold font-['Public Sans'] leading-[8.36px] tracking-tight">
                  Preview
                </p>
              </div>
              <div className="w-auto block sm:hidden">
                <button className="bg-teal-700 text-white rounded-lg w-16 h-10"  onClick={handleSubmit}>
                  Done
                </button>
              </div>
            </div>
            <div className="sm:bg-gray-100 min-h-[60vh] sm:m-4 mt-6 sm:mt-0 flex flex-col justify-center items-center gap-8">
              <div
                className={`${bgColor} w-[247px] h-[449px] bg-gradient-to-b  rounded-lg flex flex-col justify-center items-center`}
                onClick={handleDivClick}
                onDoubleClick={handleDoubleClick}
              >
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                {imagePreview && (
                  <div
                    className={`${bgColor} relative w-[247px] h-[449px]  bg-gradient-to-b rounded-lg flex flex-col justify-center items-center overflow-hidden`}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchMove={handleTouchMove}
                  >
                    <img
                      ref={imageRef}
                      src={imagePreview}
                      alt="Preview"
                      className="rounded-lg"
                      style={{
                        transform: `scale(${imageScale / 100})`,
                        position: "absolute",
                        left: `${imagePosition.x}px`,
                        top: `${imagePosition.y}px`,
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
              <input
        type="range"
        min="50"
        max="200"
        value={imageScale}
        onChange={handleRangeChange}
        className="w-[304.34px] h-1.5 appearance-none bg-teal-700 rounded-sm"
      />

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          background-color: #ffffff; // Change this to the color you want for the thumb
          drop-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); // Add shadow to the thumb
          border: 2px solid #65B6B6; // Border color
          border-radius: 50%;
          cursor: pointer;
          transition: width 0.2s, height 0.2s; // Smooth transition for size change
        }

        input[type='range']:hover::-webkit-slider-thumb {
          width: calc(14px * 1.2); // Increase thumb size on hover
          height: calc(14px * 1.2);
        }
      `}</style>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
