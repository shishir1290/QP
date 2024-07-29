import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";

const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

interface StoryImage {
  _id: string;
  image: string;
  image_scale: string;
  image_position_x: string;
  image_position_y: string;
  background_color: string;
  CreatedAt: string;
  user_id: string;
  title: string;
  text_color: string;
  text_size: string;
}

interface Friend {
  _id: string;
  image: string;
  image_scale: string;
  image_position_x: string;
  image_position_y: string;
  background_color: string;
  CreatedAt: string;
  user_id: string;
  title: string;
  text_color: string;
  text_size: string;
}

const Index = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [stories, setStories] = useState<StoryImage[]>([]);
  const [userStories, setUserStories] = useState<StoryImage[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [storyUser, setStoryUser] = useState<any>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    setAccessToken(token);
    const userToken = JSON.parse(localStorage.getItem("userToken") || "{}");
    setUser(userToken);
    setUserId(userToken._id);
  }, []);

  useEffect(() => {
    if (userId && accessToken) {
      const fetchStories = async () => {
        try {
          const res = await axios.get(
            `${Backend_url}/api/story/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (res.data) {
            setUserStories(res.data);
          }
        } catch (err) {
          console.log("Error fetching user stories:", err);
        }
      };

      const fetchFriends = async () => {
        try {
          const res = await axios.get(
            `${Backend_url}/api/story/all-user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (res.data) {
            setFriends(res.data);
          }
        } catch (err) {
          console.log("Error fetching friends stories:", err);
        }
      };

      fetchStories();
      fetchFriends();
    }
  }, [userId, accessToken]);

  const friendsStory = async (friendsId: string) => {
    if (!friendsId) {
      return;
    }

    if (!accessToken) {
      return;
    }

    try {
      const res = await axios.get(
        `${Backend_url}/api/story/user/${friendsId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data) {
        return res.data;
      } else {
        console.log("No stories data found");
        stopAutoChange(); // Stop the auto-change interval if no stories data found
      }
    } catch (err) {
      console.log("Error fetching stories:", err);
    }
  };

  const storyUserInfo = async (userId: string) => {
    if (!userId) {
      return;
    }

    if (!accessToken) {
      return;
    }

    try {
      const res = await axios.get(`${Backend_url}/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data) {
        setStoryUser(res.data);
      } else {
        console.log("No user data found");
      }
    } catch (err) {
      console.log("Error fetching user data:", err);
    }
  };


  const handlePopUpClick = async (clickedUserId: string) => {
    storyUserInfo(clickedUserId);
    const resData = await friendsStory(clickedUserId);
    if (resData && resData.length > 0) {
      setStories(resData);
      for (let i = 0; i < resData.length; i++) {
        if (resData[i].user_id === clickedUserId) {
          setCurrentStoryIndex(i);
          break;
        }
        if (i === resData.length - 1) {
          handleClosePopup(); // Close the popup if no stories data found
          setCurrentStoryIndex(0);
          stopAutoChange(); // Stop the auto-change interval if no stories data found
        }
      }
      setActiveUserId(clickedUserId);
      setShowPopup(true);
      startAutoChange(); // Start the auto-change interval
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    stopAutoChange(); // Stop the auto-change interval when the popup is closed
  };

  const handleNextStory = () => {
    if (currentStoryIndex + 1 >= stories.length) {
      handleClosePopup(); // Close the popup if all stories are shown
    } else {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex === 0) {
      handleClosePopup(); // Close the popup if it is the first story
    } else {
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  const startAutoChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      handleNextStory();
    }, 5000); // Change story every 3 seconds
  };

  const stopAutoChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleIconClick = () => {
    router.push("/stories");
  };

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

  const timeAgo = (date: string) => {
    // calculate time ago in hours or minutes
    const currentDate = new Date();
    const storyDate = new Date(date);
    const diff = currentDate.getTime() - storyDate.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);

    if (hours >= 1) {
      return `${hours}h ago`;
    } else if (minutes >= 1) {
      return `${minutes}m ago`;
    } else {
      return `Just now`;
    }
  };

  return (
    <div className="bg-white ssm:mt-[2px] pb-10">
      <div className="flex justify-start items-start space-x-4 px-6 sm:px-20 py-6">
        <div className="flex justify-center items-center space-x-4">
          <div className="relative  flex justify-center items-end ">
            {userStories.length > 0 && !showPopup ? (
              <div>
                {userStories[0].image ? (
                  <div
                    className={`w-[90.6px] h-[126px] sm:w-[189px] sm:h-[256px] rounded-[20px] overflow-hidden shadow-lg ${userStories[0].background_color}`}
                  >
                    <img
                      src={`${Backend_url}/api/story/stories/${userStories[0].image}`}
                      alt="Preview"
                      className={`rounded-lg w-full h-full object-cover shadow-lg`}
                      style={{
                        objectFit: "cover", // Ensure image covers the container
                        overflow: "hidden", // Hide any overflow
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Example shadow style
                        transform: `scale(${
                          parseFloat(userStories[0].image_scale) / 100
                        })`,
                        left: `${
                          parseFloat(userStories[0].image_position_x) || 0
                        }px`,
                        top: `${
                          parseFloat(userStories[0].image_position_y) || 0
                        }px`,
                      }}
                      onClick={() => handlePopUpClick(userStories[0].user_id)}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => handlePopUpClick(userStories[0].user_id)}
                    className={`w-[90.6px] h-[126px] sm:w-[189px] sm:h-[256px] rounded-[20px] overflow-hidden shadow-lg ${userStories[0].background_color} cursor-pointer`}
                  >
                    <p
                      className={`${userStories[0].text_color} w-full h-full bg-transparent cursor-pointer`}
                      style={{
                        fontSize: `${Number(userStories[0].text_size)}px`,
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                        textAlign: "center",
                        resize: "none",
                        paddingTop: "50%",
                      }}
                    >
                      {userStories[0].title}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <img
                src="/icons/profilepic.jpg"
                alt="profile picture"
                className="w-[90.6px] h-[126px] sm:w-[189px] sm:h-[256px] rounded-[20px] object-cover overflow-hidden shadow-lg"
              />
            )}
            <div
              className="absolute -bottom-[10px] sm:-bottom-[22px] cursor-pointer"
              onClick={handleIconClick}
            >
              <svg
                width={isSmallScreen ? "21.5" : "47"}
                height={isSmallScreen ? "21.5" : "47"}
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Group 1000003348">
                  <rect
                    id="Rectangle 30085"
                    x="7"
                    y="5.89062"
                    width="31"
                    height="40"
                    fill="white"
                  />
                  <path
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    clipPath="url(#clip)"
                    fillOpacity="1"
                    enableBackground="new"
                    id="Icon"
                    d="M26.1426 23.2517V23.7517H26.6426H36.62C37.528 23.7517 38.2626 24.4862 38.2626 25.3906C38.2626 26.295 37.528 27.0296 36.62 27.0296H26.6426H26.1426V27.5296V37.4903C26.1426 38.3946 25.408 39.1292 24.5 39.1292C23.5921 39.1292 22.8575 38.3946 22.8575 37.4903V27.5296V27.0296H22.3575H12.3802C11.4723 27.0296 10.7377 26.295 10.7377 25.3906C10.7377 24.4862 11.4723 23.7517 12.3802 23.7517H22.3575H22.8575V23.2517V13.2909C22.8575 12.3865 23.5921 11.652 24.5 11.652C25.408 11.652 26.1426 12.3865 26.1426 13.2909V23.2517ZM37.8547 2.1274C29.0504 1.14503 19.9496 1.14503 11.1453 2.1274C6.02591 2.69861 1.89175 6.72488 1.28964 11.8643C0.236786 20.8512 0.236786 29.93 1.28964 38.9169C1.89175 44.0564 6.0259 48.0826 11.1453 48.6538C19.9496 49.6362 29.0504 49.6362 37.8547 48.6538C42.9741 48.0826 47.1082 44.0564 47.7104 38.9169C48.7632 29.93 48.7632 20.8512 47.7104 11.8643C47.1082 6.72488 42.9741 2.69861 37.8547 2.1274Z"
                    fill={isSmallScreen ? "#384CFF" : "#307777"}
                    stroke="white"
                  />
                </g>
              </svg>
            </div>
          </div>

          <div className="relative  flex justify-center items-end">
            {friends.length > 0 &&
              friends.map((friend) => (
                <div>
                  {friend.image ? (
                    <div
                      key={friend._id}
                      className={`w-[90.6px] h-[126px] sm:w-[189px] sm:h-[256px] rounded-[20px] overflow-hidden shadow-lg ${friend.background_color}`}
                    >
                      <img
                        src={`${Backend_url}/api/story/stories/${friend.image}`}
                        alt={`${friend.user_id}'s story`}
                        className={`rounded-lg w-full h-full object-cover shadow-lg`}
                        style={{
                          objectFit: "cover",
                          overflow: "hidden",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          transform: `scale(${
                            parseFloat(friend.image_scale) / 100
                          })`,
                          left: `${parseFloat(friend.image_position_x)}px`,
                          top: `${parseFloat(friend.image_position_y)}px`,
                        }}
                        onClick={() =>
                          handlePopUpClick(friend.user_id as string)
                        }
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => handlePopUpClick(friend.user_id as string)}
                      key={friend._id}
                      className={`w-[90.6px] h-[126px] sm:w-[189px] sm:h-[256px] rounded-[20px] overflow-hidden shadow-lg ${friend.background_color} cursor-pointer`}
                    >
                      <p
                        className={`${friend.text_color} w-full h-full bg-transparent  cursor-pointer`}
                        style={{
                          fontSize: `${Number(friend.text_size)}px`,
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                          textAlign: "center",
                          resize: "none",
                          paddingTop: "50%",
                        }}
                      >
                        {friend.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            <div className="absolute -bottom-[10px] sm:-bottom-[22px] cursor-pointer">
              <img
                src="/icons/profilepic.jpg"
                alt="profile picture"
                className="w-[21.5px] h-[21.5px] sm:w-[57px] sm:h-[57px] rounded-[20px] object-cover overflow-hidden shadow-lg"
              />
            </div>
          </div>
        </div>

        {showPopup && currentStoryIndex < stories.length && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-black rounded-lg shadow-xl w-full">
              <div className="flex justify-center sm:justify-between items-center">
                <div className=" W-[350px] bg-white p-6 h-screen hidden sm:block">
                  <div className="grid grid-cols-1 gap-4">
                    <div
                      className="bg-gray-200 p-1 rounded-full w-[35px] h-[35px] flex justify-center items-center cursor-pointer"
                      onClick={() => handleClosePopup()}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Close_round">
                          <path
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            clipPath="url(#clip)"
                            fillOpacity="1"
                            enableBackground="new"
                            id="Vector 47"
                            d="M18 6L6 18"
                            stroke="#141414"
                          />
                          <path
                            id="Vector 48"
                            d="M6 6L18 18"
                            stroke="#141414"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            clipPath="url(#clip)"
                            fillOpacity="1"
                            enableBackground="new"
                          />
                        </g>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-950 text-2xl font-bold font-['SF Pro Text'] leading-[18px]">
                        All stories
                      </p>
                    </div>
                    <div className="flex justify-between items-center space-x-3">
                      <div className=" cursor-pointer">
                        <img
                          src="/icons/friend2.png"
                          alt="story1"
                          className="rounded-full bg-teal-700 p-1"
                        />
                      </div>
                      <div className="">
                        <p className="text-zinc-800 text-xl font-medium font-['SF Pro Text'] leading-[18px]">
                          Priya Mallik
                        </p>
                        <p className="text-stone-500 text-sm font-medium font-['SF Pro Text'] leading-[18px]">
                          18h
                        </p>
                      </div>

                      <div className="flex justify-center items-center">
                        <svg
                          width="39"
                          height="39"
                          viewBox="0 0 39 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Frame 1000003672">
                            <path
                              id="Vector"
                              d="M35.4748 21.7483C36.9516 12.6905 30.806 4.15065 21.7483 2.67388C12.6906 1.19712 4.15069 7.3427 2.67392 16.4004C1.19716 25.4582 7.34274 33.9981 16.4005 35.4748C25.4582 36.9516 33.998 30.806 35.4748 21.7483Z"
                              fill="#F25268"
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
                              d="M19.2729 28.5612L27.4658 22.1953C28.3655 21.4931 29.0972 20.5491 29.4571 19.4555C30.9565 14.9315 26.6861 10.0852 21.612 11.9846C20.2446 12.5026 19.2609 14.2178 19.2609 14.2178C19.2609 14.2178 18.2773 12.5026 16.9098 11.9846C11.8478 10.0852 7.56538 14.9315 9.06481 19.4555C9.43667 20.5606 10.1564 21.4931 11.0561 22.1953L19.2489 28.5612H19.2729Z"
                              fill="white"
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
                        <svg
                          width="39"
                          height="39"
                          viewBox="0 0 39 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Frame 1000003672">
                            <path
                              id="Vector"
                              d="M35.4748 21.7483C36.9516 12.6905 30.806 4.15065 21.7483 2.67388C12.6906 1.19712 4.15069 7.3427 2.67392 16.4004C1.19716 25.4582 7.34274 33.9981 16.4005 35.4748C25.4582 36.9516 33.998 30.806 35.4748 21.7483Z"
                              fill="#F25268"
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
                              d="M19.2729 28.5612L27.4658 22.1953C28.3655 21.4931 29.0972 20.5491 29.4571 19.4555C30.9565 14.9315 26.6861 10.0852 21.612 11.9846C20.2446 12.5026 19.2609 14.2178 19.2609 14.2178C19.2609 14.2178 18.2773 12.5026 16.9098 11.9846C11.8478 10.0852 7.56538 14.9315 9.06481 19.4555C9.43667 20.5606 10.1564 21.4931 11.0561 22.1953L19.2489 28.5612H19.2729Z"
                              fill="white"
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
                        <svg
                          width="39"
                          height="39"
                          viewBox="0 0 39 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="Frame 1000003672">
                            <path
                              id="Vector"
                              d="M35.4748 21.7483C36.9516 12.6905 30.806 4.15065 21.7483 2.67388C12.6906 1.19712 4.15069 7.3427 2.67392 16.4004C1.19716 25.4582 7.34274 33.9981 16.4005 35.4748C25.4582 36.9516 33.998 30.806 35.4748 21.7483Z"
                              fill="#F25268"
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
                              d="M19.2729 28.5612L27.4658 22.1953C28.3655 21.4931 29.0972 20.5491 29.4571 19.4555C30.9565 14.9315 26.6861 10.0852 21.612 11.9846C20.2446 12.5026 19.2609 14.2178 19.2609 14.2178C19.2609 14.2178 18.2773 12.5026 16.9098 11.9846C11.8478 10.0852 7.56538 14.9315 9.06481 19.4555C9.43667 20.5606 10.1564 21.4931 11.0561 22.1953L19.2489 28.5612H19.2729Z"
                              fill="white"
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

                    <div className="flex justify-start items-center space-x-3">
                      <div>
                        <img
                          src="/icons/friend2.png"
                          alt="story1"
                          className="rounded-full bg-teal-700 p-1"
                        />
                      </div>
                      <div className="">
                        <p className="text-zinc-800 text-xl font-medium font-['SF Pro Text'] leading-[18px]">
                          Priya Mallik
                        </p>
                        <p className="text-stone-500 text-sm font-medium font-['SF Pro Text'] leading-[18px]">
                          18h
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-start items-center space-x-3">
                      <div>
                        <img
                          src="/icons/friend2.png"
                          alt="story1"
                          className="rounded-full bg-teal-700 p-1"
                        />
                      </div>
                      <div className="">
                        <p className="text-zinc-800 text-xl font-medium font-['SF Pro Text'] leading-[18px]">
                          Priya Mallik
                        </p>
                        <p className="text-stone-500 text-sm font-medium font-['SF Pro Text'] leading-[18px]">
                          18h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="min-h-screen flex justify-center items-center sm:pr-[600px]">
                  {stories.length > 0 && currentStoryIndex < stories.length && (
                    <div className="flex justify-center items-center relative">
                      <div>
                        {stories[currentStoryIndex].image ? (
                          <div
                            key={stories[currentStoryIndex]._id}
                            className={`relative w-[447px] min-h-screen sm:min-h-[90vh] rounded-lg flex flex-col justify-center items-center overflow-hidden ${stories[currentStoryIndex].background_color}`}
                          >
                            <img
                              src={`${Backend_url}/api/story/stories/${stories[currentStoryIndex].image}`}
                              alt="story"
                              className="items-center pt-16 sm:pt-20 object-cover overflow-hidden shadow-lg"
                              style={{
                                objectFit: "cover",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                position: "absolute",
                                transform: `scale(${
                                  parseFloat(
                                    stories[currentStoryIndex].image_scale
                                  ) / 100
                                })`,
                                left: `${parseFloat(
                                  stories[currentStoryIndex].image_position_x ||
                                    "0"
                                )}px`,
                                top: `${parseFloat(
                                  stories[currentStoryIndex].image_position_y ||
                                    "0"
                                )}px`,
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            key={stories[currentStoryIndex]._id}
                            className={`relative w-[447px] min-h-screen sm:min-h-[90vh] rounded-lg flex flex-col justify-center items-center overflow-hidden ${stories[currentStoryIndex].background_color}`}
                          >
                            <p
                              className={`${stories[currentStoryIndex].text_color} w-full bg-transparent overflow-y-auto custom-scrollbar`}
                              style={{
                                fontSize: `${
                                  Number(stories[currentStoryIndex].text_size) *
                                  2
                                }px`,
                                wordBreak: "break-word",
                                whiteSpace: "pre-wrap",
                                textAlign: "center",
                                resize: "none",
                                padding: "50% 0",
                                maxHeight: "90vh",
                              }}
                            >
                              {stories[currentStoryIndex].title}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-0">
                        <div className="relative w-[447px] h-1 bg-white overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-teal-700"
                            style={{
                              width: "0%",
                              animation: "fillBackground 5s linear infinite",
                            }}
                          />
                        </div>
                        <div className="flex justify-between sm:justify-start items-center sm:space-x-2 p-4 px-6 sm:px-0">
                          <div className="p-2">
                            {/* Render User Image */}
                            {storyUser?.profile_pic ? (
                              <img
                                src={`${Backend_url}/api/profile-pics/${storyUser?.profile_pic}`}
                                alt="profile picture"
                                className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-full object-cover"
                              />
                            ) : (
                              <img
                                src="/icons/profilepic.jpg"
                                alt="profile picture"
                                className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex flex-col justify-start items-start pr-32">
                            <p className="text-white text-lg font-semibold">
                              {/* User's Full Name */}
                              {storyUser?.first_name} {storyUser?.last_name}
                            </p>
                            <p className="text-white text-sm font-medium">
                              {/* Calculate Time Ago */}
                              {/* {stories[currentStoryIndex].CreatedAt} */}
                              {timeAgo(stories[currentStoryIndex].CreatedAt)}
                            </p>
                          </div>
                          <div className="flex justify-end items-center space-x-3 block sm:hidden">
                            <div>
                              <svg
                                width="27"
                                height="6"
                                viewBox="0 0 27 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="Icon">
                                  <path
                                    d="M2.77407 0.838867C1.34096 0.838867 0.179199 1.94861 0.179199 3.31754C0.179199 4.68647 1.34096 5.79621 2.77407 5.79621C4.20718 5.79621 5.36894 4.68647 5.36894 3.31754C5.36894 1.94861 4.20718 0.838867 2.77407 0.838867Z"
                                    fill="white"
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
                                    d="M10.5587 3.31754C10.5587 1.94861 11.7204 0.838867 13.1536 0.838867C14.5867 0.838867 15.7484 1.94861 15.7484 3.31754C15.7484 4.68647 14.5867 5.79621 13.1536 5.79621C11.7204 5.79621 10.5587 4.68647 10.5587 3.31754Z"
                                    fill="white"
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
                                    d="M20.9382 3.31754C20.9382 1.94861 22.0999 0.838867 23.533 0.838867C24.9662 0.838867 26.1279 1.94861 26.1279 3.31754C26.1279 4.68647 24.9662 5.79621 23.533 5.79621C22.0999 5.79621 20.9382 4.68647 20.9382 3.31754Z"
                                    fill="white"
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
                            <div
                              onClick={() => setShowPopup(false)}
                              className="cursor-pointer"
                            >
                              <svg
                                width="14"
                                height="12"
                                viewBox="0 0 14 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  id="Union"
                                  d="M12.719 1.96112C13.1623 1.56476 13.1623 0.922141 12.719 0.525784C12.2756 0.129426 11.5568 0.129426 11.1134 0.525784L6.56433 4.59257L2.01525 0.525784C1.57188 0.129427 0.853049 0.129427 0.409685 0.525784C-0.0336783 0.922141 -0.033678 1.56476 0.409685 1.96112L4.95877 6.0279L0.409671 10.0947C-0.0336921 10.4911 -0.0336926 11.1337 0.409671 11.53C0.853034 11.9264 1.57187 11.9264 2.01523 11.53L6.56433 7.46324L11.1134 11.53C11.5568 11.9264 12.2756 11.9264 12.719 11.53C13.1623 11.1337 13.1623 10.4911 12.719 10.0947L8.16989 6.0279L12.719 1.96112Z"
                                  fill="white"
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
                        </div>
                      </div>
                      <div className="absolute bottom-0 py-4 px-6 sm:px-0">
                        <div className="flex justify-between items-center space-x-2">
                          <div>
                            <input
                              type="text"
                              className="w-[150px] sm:w-[200px] h-[40px] p-2 rounded-lg border bg-zinc-100 opacity-50"
                              placeholder="Replay"
                            />
                          </div>
                          <img
                            src="/icons/like 1.png"
                            alt="like"
                            className="w-[30px] h-[30px]"
                          />
                          <img
                            src="/icons/love 2.png"
                            alt="love"
                            className="w-[30px] h-[30px]"
                          />
                          <img
                            src="/icons/haha 1.png"
                            alt="haha"
                            className="w-[30px] h-[30px]"
                          />
                          <img
                            src="/icons/wowemoji.png"
                            alt="wow"
                            className="w-[30px] h-[30px]"
                          />
                          <img
                            src="/icons/sademoji.png"
                            alt="sad"
                            className="w-[30px] h-[30px]"
                          />
                          <img
                            src="/icons/angryemoji.png"
                            alt="angry"
                            className="w-[30px] h-[30px]"
                          />
                        </div>
                      </div>
                      <div
                        className=" absolute left-0 h-full "
                        onClick={handlePrevStory}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
