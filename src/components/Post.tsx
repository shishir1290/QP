import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { format, set } from "date-fns";

const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
const Frontend_url = process.env.NEXT_PUBLIC_FRONTEND_URL;

interface Emoji {
  emoji: string;
  name: string;
}

interface Comment {
  id: number;
  comment_text: string;
  user_id: string;
  post_id: string;
  created_at: Date;
}

interface User {
  profile_pic?: string;
  first_name?: string;
  last_name?: string;
}

interface PostProps {
  post: {
    _id: number;
    description: string;
    media?: { media: string }[];
    user_id: string;
    createdAt: Date;
    comments?: postComments[];
    link_image?: string;
  };
}

interface postComments {
  text: string;
  comment_id: string;
}

interface Media {
  media: string;
  // Add other properties if needed
}



// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------
const Post = ({ post }: PostProps) => {
  const {
    _id: postId,
    description,
    media,
    user_id,
    createdAt,
    comments: postComments,
    link_image,
  } = post;

  // const comments:postComments = post.comments || [];
  const [reactions, setReactions] = useState<{
    [key: string]: number;
  }>({
    like: 0,
    heart: 0,
    haha: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  });
  const [fstselectedEmoji, setfstSelectedEmoji] = useState<Emoji | null>(null);
  const [fstshowPopup, setfstShowPopup] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [Comments, setComments] = useState<Comment[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [user, setUser] = useState<User>({});
  const [commentUser, setCommentUser] = useState<any>({});
  const [commentUserPic, setCommentUserPic] = useState<string>("");
  const [commentUserId, setCommentUserId] = useState<string>("");
  const [postUserPic, setPostUserPic] = useState<string>("");
  const [getCommentUserId, setGetCommentUserId] = useState<string>("");
  const popupRefComment = useRef<HTMLDivElement>(null);


  const emojis: Emoji[] = [
    { emoji: "likeemoji.png", name: "Like" },
    { emoji: "heartemoji.png", name: "Heart" },
    { emoji: "hahaemoji.png", name: "Haha" },
    { emoji: "wowemoji.png", name: "Wow" },
    { emoji: "sademoji.png", name: "Sad" },
    { emoji: "angryemoji.png", name: "Angry" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }

    const userToken = JSON.parse(localStorage.getItem("userToken") || "{}");
    const UserId = userToken._id;
    setCommentUserId(UserId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${Backend_url}/api/user/${user_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.data) {
          setUser(res.data);
          setPostUserPic(res.data.profile_pic);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchData();
  }, [accessToken, user_id]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setfstShowPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchComments(); // Fetch comments on component mount
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get<Comment[]>(
        `${Backend_url}/api/get-comments-by-post/${postId}`
      );
      if (res.data) {
        setComments(res.data);
        setGetCommentUserId(res.data[0].user_id);
      }
    } catch (error) {
    }
  };

  const handleFstEmojiClick = (emoji: Emoji | null) => {
    if (emoji) {
      setfstSelectedEmoji(emoji);
      setfstShowPopup(false);
      postReactionToBackend(emoji.name.toLowerCase());
    }
  };

  const updateReactionCount = (
    reactionType: string,
    increase: boolean = true
  ) => {
    setReactions((prevReactions) => {
      const updatedReactions = { ...prevReactions };
      if (increase) {
        updatedReactions[reactionType] += 1; // Increase by 1
      } else {
        if (updatedReactions[reactionType] > 0) {
          updatedReactions[reactionType] -= 1; // Decrease by 1, if greater than 0
        }
      }
      return updatedReactions;
    });
  };

  const postReactionToBackend = async (reactionType: string) => {
    try {
      const res = await axios.post(
        `${Backend_url}/api/reactions/save-reaction-main-post`,
        {
          post_id: postId,
          reaction_type: reactionType,
          user_id: commentUserId, // Assuming user_id contains an id field
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data) {
        if (res.data.message === "Post reaction removed successfully") {
          updateReactionCount(reactionType, false);
        } else if (res.data.message === "Post reaction added successfully") {
          updateReactionCount(reactionType); // Increase count by 1
        } else if (res.data.message === "Post reaction updated successfully") {
          updateReactionCount(reactionType); // Increase count by 1
        }
      } else {
        console.error("Failed to update reaction:", res.data.message);
      }
    } catch (error) {
      console.error("Error posting reaction:", error);
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setTimeout(() => {
      if (event.targetTouches.length > 0) {
        setfstShowPopup(true);
      }
    }, 500); // Adjust the timeout duration for the click-and-hold event
  };

  const handleMouseOver = () => {
    if (window.innerWidth >= 1024) {
      // Assuming 1024px is the breakpoint for desktop
      setfstShowPopup(true);
    }
  };

  const handleCommentClick = (postId: any) => {
    setShowCommentBox(!showCommentBox); // Toggle comment box visibility
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRefComment.current && !popupRefComment.current.contains(event.target as Node)) {
      setShowCommentBox(false);
    }
  };

  useEffect(() => {
    if (showCommentBox) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCommentBox]);



  // post comments------------------------------------------------------------------

  const handleCommentPost = async () => {
    console.log(commentUserId);
    try {
      const res = await axios.post(
        `${Backend_url}/api/save-user-comment-by-post`,
        {
          user_id: commentUserId,
          post_id: postId,
          comment_text: commentText,
          image_or_video: "", // Replace with actual image or video URL if applicable
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data) {
        setCommentText(""); // Clear input after successful post
        fetchComments(); // Fetch updated comments
      } else {
        console.error("Failed to post comment:", res.data);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleShareClick = () => {
    // Function to share via Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: "Share Example",
          text: "Check out this awesome content!",
          url: `${Frontend_url}/${post._id}`, // Replace with actual URL
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that do not support Web Share API
      console.log("Web Share API not supported");
      // Example: Implement fallback share functionality (e.g., open a popup with share options)
      // Replace the alert with your actual sharing logic
      alert(
        "Sharing not supported on this browser. You can implement a fallback here."
      );
    }
  };

  const renderDescription = () => {
    if (!description) {
      return null; // Return null or handle the case where description is undefined/null
    }

    const words = description.split(/\s+/);
    const maxWordsToShow = 20;

    const truncatedDescription = words.slice(0, maxWordsToShow).join(" ");
    const fullDescription = words.join(" ");

    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };

    return (
      <>
        <p className="mt-4">
          {showFullDescription ? fullDescription : truncatedDescription}
        </p>
        {words.length > maxWordsToShow && (
          <button
            className="text-blue-500 mt-2 cursor-pointer"
            onClick={toggleDescription}
          >
            {showFullDescription ? "See less" : "See more"}
          </button>
        )}
      </>
    );
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url); // URL constructor will throw an error if the URL is invalid
      return true;
    } catch (e) {
      return false;
    }
  };

  const profilePicUrl = postUserPic? `${Backend_url}/api/profile-pics/${postUserPic}` : "/icons/profilepic.jpg";
  const mediaUrl = link_image && isValidUrl(link_image) ? link_image : '';

  


  // commented user info
  useEffect(() => {
    const fetchComments = async () => {
      const userId = Comments.map((comment) => comment.user_id);
      
      try {
        const res = await axios.get(`${Backend_url}/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.data) {
          setCommentUser(res.data);
          setCommentUserPic(res.data.profile_pic);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchComments();
  }, [Comments]);


  return (
    <div className="shadow rounded-lg p-4 my-4" key={postId}>
      <div className="flex items-center">
        <img
          src={profilePicUrl}
          alt={`${user.first_name} ${user.last_name}`}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="ml-3">
          <p className="font-semibold">{`${user.first_name} ${user.last_name}`}</p>
          <p className="text-sm text-gray-500">
            {format(new Date(createdAt), "PPP")}
          </p>
        </div>
      </div>

      {renderDescription()}
      {mediaUrl && (
        <div className="mt-4">
          <img
            src={`${mediaUrl}`}
            alt="Post media"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      )}
      <div className="mt-4 flex space-x-4">
        {Object.entries(reactions).map(([reactionType, count]) => (
          <div key={reactionType} className="flex items-center space-x-1">
            <img
              src={`/icons/${reactionType}emoji.png`}
              alt={reactionType}
              className="w-6 h-6"
            />
            <span>{count}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-x-2">
        <div className="flex justify-between items-center ">
          <div className="relative">
            <div
              className="px-8 z-10 text-base font-medium py-2 rounded-md text-gray-600 relative  font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-gray-200 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 flex justify-center items-center space-x-2"
              onMouseOver={handleMouseOver}
              onTouchStart={handleTouchStart}
              onTouchEnd={() => setfstShowPopup(false)}
            >
              {fstselectedEmoji ? (
                <img
                  src={`/icons/${fstselectedEmoji.emoji}`}
                  alt={fstselectedEmoji.name}
                  className="w-6 h-6"
                />
              ) : (
                <img
                  src="/icons/likedefault.png"
                  alt="like emoji"
                  className="w-6 h-6"
                />
              )}
              {fstselectedEmoji ? (
                <button
                  className="text-base font-semibold font-['Poppins'] tracking-wider"
                  style={{ color: "#384CFF" }}
                >
                  {fstselectedEmoji.name}
                </button>
              ) : (
                <button className="text-base font-medium font-['Poppins'] tracking-wider">
                  Like
                </button>
              )}
            </div>
            {fstshowPopup && (
              <div
                ref={popupRef}
                className="absolute -top-28 mt-2 left-0 bg-white border rounded-full shadow-lg p-2 z-10"
              >
                <div className="flex space-x-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji.name}
                      className="p-2 hover:bg-gray-200 rounded"
                      onClick={() => handleFstEmojiClick(emoji)}
                    >
                      <div className=" w-8 sm:w-10 h-auto">
                        <img src={`/icons/${emoji.emoji}`} alt={emoji.name} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              className="px-8 z-10 text-base font-medium py-2 rounded-md text-gray-600 relative  font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-gray-200 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 flex justify-center items-center space-x-2"
              onClick={ () => handleCommentClick(post._id)}
            >
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="comment 1" clip-path="url(#clip0_1_650)">
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M15.1755 11.92H8.88114L4.04106 15.3488V11.92H2.5884C1.78541 11.92 1.13574 11.2608 1.13574 10.4512V2.12C1.13574 1.3072 1.78541 0.651199 2.58682 0.651199H15.1739C15.9769 0.651199 16.6265 1.3088 16.6265 2.12V10.4512C16.6265 11.2608 15.9753 11.92 15.1755 11.92ZM15.6592 2.3648C15.6592 1.96 15.3335 1.6304 14.9336 1.6304H2.83025C2.43033 1.6304 2.10471 1.96 2.10471 2.3648V10.2048C2.10471 10.6112 2.43033 10.9392 2.83025 10.9392H5.00844V13.3904L8.39587 10.9392H14.9305C15.3304 10.9392 15.656 10.6112 15.656 10.2048L15.6592 2.3648Z"
                      fill="#A7A9AC"
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
                  <clipPath id="clip0_1_650">
                    <rect
                      width="15.8069"
                      height="16"
                      fill="white"
                      transform="translate(0.977783)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <p>Comment</p>
            </button>
          </div>
          <div>
            <button
              className="px-8 z-10 text-base font-medium py-2 rounded-md text-gray-600 relative  font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-gray-200 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 flex justify-center items-center space-x-2"
              onClick={handleShareClick}
            >
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="share 1" clip-path="url(#clip0_1_655)">
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M10.4711 13.7104L17.4613 8.7343L10.4317 3.648L10.4711 7.2029H10.1032C7.15053 7.2029 2.33208 8.1263 1.51743 14.3678C3.14485 11.9225 6.55737 10.2657 10.1032 10.2657H10.4711V13.7104ZM9.73526 2.2268L18.9329 8.7343L9.73526 15.2418V11.0295C5.80091 11.1701 1.89285 13.7446 1.27341 16.7732H0.537598C0.537598 12.4716 1.92851 9.5133 4.4269 7.8736C6.17821 6.726 8.23736 6.479 9.73526 6.4372V2.2268Z"
                      fill="#A7A9AC"
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
                  <clipPath id="clip0_1_655">
                    <rect
                      width="18.7707"
                      height="19"
                      fill="white"
                      transform="translate(0.349854)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <p>Share</p>
            </button>
          </div>
        </div>
        {showCommentBox && (
          <div className="mt-4 space-y-4" ref={popupRefComment}>
            <div className="flex-1 bg-gray-100 p-2 rounded-lg">
              <div className="flex items-center justify-between">
                
              </div>
              {postComments &&
              postComments.map((comment) => (
                <p key={comment.comment_id} className="mt-1">{comment.text}</p>
              ))}
            </div>
            
            {Comments.length > 0 &&
              Comments.map((comment, index) => (
                <div key={comment.id} className="flex items-start space-x-4">
                  
                  <img
                    src={`${Backend_url}/api/profile-pics/${commentUserPic}`}
                    alt={`${commentUser.first_name} ${commentUser.last_name}`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1 bg-gray-100 p-2 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">
                        {commentUser.first_name} {commentUser.last_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(comment.created_at), "PPP")}
                      </p>
                    </div>
                    <p className="mt-1">{comment.comment_text}</p>
                  </div>
                </div>
              ))}
            <div className="w-[320.14px] sm:w-[801px] h-[38.34px] sm:h-[49px] pl-[15px] pr-[15px] py-3.5 bg-gray-200 rounded-lg flex items-center">
              <input
                className="border rounded-lg p-2 w-full text-sm text-neutral-400 bg-transparent overflow-hidden overflow-ellipsis"
                placeholder="Write a public comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              {commentText && ( // Show arrow button only when there's text in the input
                <button className="ml-2" onClick={handleCommentPost}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M12 5l7 7-7 7"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                    />
                  </svg>
                </button>
              )}
              <div className="flex justify-end items-center space-x-1 sm:space-x-4">
                <div>
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 225 225"
                    enable-background="new 0 0 225 225"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      clipPath="url(#clip)"
                      fillOpacity="1"
                      enableBackground="new"
                      fill="#A8ABAF"
                      opacity="1.000000"
                      stroke="none"
                      d="M123.531097,10.254028 
            C154.612762,14.021380 179.420105,27.947336 197.602859,52.955883 
            C242.226379,114.331062 206.849991,201.895782 132.153915,215.235672 
            C74.999046,225.442886 21.676987,188.323822 11.224279,131.053009 
            C1.322196,76.799095 38.941044,21.928339 93.295982,12.063489 
            C103.016190,10.299373 113.139328,10.755342 123.531097,10.254028 
            M109.500008,127.048767 
            C107.001709,127.048767 104.503403,127.048782 102.005104,127.048782 
            C85.682808,127.048805 69.360443,127.023766 53.038235,127.061081 
            C46.446102,127.076149 44.625427,129.426849 46.417313,135.754913 
            C47.406918,139.249710 48.630371,142.694778 49.985279,146.067093 
            C62.512142,177.245911 92.841194,195.527786 125.703362,189.636398 
            C155.071579,184.371368 173.103790,165.216553 181.904236,137.149521 
            C184.413940,129.145401 182.547211,127.049957 173.957108,127.049301 
            C152.804749,127.047691 131.652374,127.048767 109.500008,127.048767 
            M149.799561,61.210983 
            C133.703049,63.294338 130.575546,85.556160 139.759811,95.236687 
            C143.588684,99.272446 148.008347,101.301628 153.562057,100.254707 
            C162.076340,98.649689 167.862061,90.062561 167.369705,79.902138 
            C166.841858,69.008957 160.581299,62.015709 149.799561,61.210983 
            M71.929390,61.963112 
            C64.086082,64.149643 59.200954,69.928719 58.389336,78.961182 
            C57.664417,87.028801 59.870487,94.389626 67.230904,98.650627 
            C70.086807,100.303947 74.334000,100.916664 77.589935,100.252075 
            C86.190422,98.496574 91.773148,88.553101 90.410095,78.858406 
            C88.857430,67.815094 82.700020,61.882351 71.929390,61.963112 
            z"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="camera 1">
                      <g id="Group">
                        <g id="Group_2">
                          <path
                            id="Vector"
                            d="M8.10477 2.29611C7.58667 2.42239 6.99707 2.84369 6.69369 3.29865C6.61361 3.42075 6.42837 3.83787 6.28515 4.22529L6.01565 4.93281H4.02333C1.78681 4.93281 1.64359 4.94535 1.20139 5.21089C1.06653 5.29097 0.877111 5.43837 0.780091 5.53099C0.565371 5.74153 0.329531 6.17537 0.266171 6.48293C0.232511 6.63869 0.219971 8.39517 0.219971 12.4091C0.219971 17.8721 0.224151 18.1205 0.300051 18.3649C0.342071 18.504 0.426331 18.702 0.485291 18.7988C0.628511 19.043 0.999211 19.3884 1.26453 19.5232C1.75315 19.7716 1.20557 19.7591 11.0026 19.7591C20.9303 19.7591 20.2142 19.7802 20.7493 19.4937C21.1156 19.2999 21.4273 18.9715 21.6128 18.5838L21.7644 18.2637L21.7769 12.5145C21.7852 8.33621 21.7769 6.69765 21.7432 6.51241C21.642 6.00267 21.3389 5.55629 20.8839 5.26149C20.4081 4.95393 20.4543 4.95833 18.0578 4.93303L15.9139 4.91191L15.5938 4.13267C15.4169 3.70301 15.2317 3.28193 15.1769 3.19349C15.042 2.97019 14.6588 2.64591 14.3598 2.49433C13.8417 2.23737 13.8587 2.23737 10.9608 2.24155C8.98103 2.24133 8.27329 2.25827 8.10477 2.29611ZM13.5678 3.63129C13.6563 3.65659 13.8037 3.73667 13.9049 3.80817C14.0776 3.93885 14.1029 3.98923 14.4861 4.93281C14.8693 5.88475 14.9831 6.08693 15.1936 6.20903C15.2526 6.24687 15.9559 6.26381 17.6451 6.28053C19.9617 6.30165 20.0123 6.30165 20.1302 6.39009C20.1933 6.43651 20.2904 6.54167 20.3449 6.61757L20.4375 6.75661L20.4292 12.4135L20.4166 18.0701L20.2945 18.1964C20.223 18.2679 20.1009 18.348 20.0209 18.3691C19.8145 18.4281 2.19161 18.4281 1.98503 18.3691C1.90495 18.348 1.78285 18.2679 1.71135 18.1964L1.58925 18.0701L1.57671 12.4177C1.56835 6.02379 1.53887 6.55883 1.90517 6.37337L2.09041 6.28075H4.35641C6.75727 6.28075 6.79511 6.27657 6.96781 6.08275C7.00983 6.04073 7.22477 5.55629 7.44367 5.01289C7.87333 3.96415 7.95341 3.83347 8.28187 3.66935C8.45039 3.58927 8.53465 3.58509 10.9355 3.58509C12.6159 3.58509 13.4666 3.60181 13.5678 3.63129Z"
                            fill="#A8ABAF"
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
                            d="M10.2234 5.71624C8.12589 6.03216 6.43277 7.25382 5.54397 9.09016C5.11431 9.97896 4.95855 10.6992 4.96273 11.7775C4.96691 12.5945 5.03005 13.0158 5.25753 13.6855C6.02401 15.9726 8.08387 17.5773 10.5098 17.7753C13.4708 18.0195 16.1623 16.0989 16.8784 13.2347C17.6407 10.1811 15.9896 7.07254 13.0455 6.02798C12.3464 5.78378 12.0263 5.729 11.1502 5.71206C10.712 5.7037 10.2951 5.70788 10.2234 5.71624ZM11.5418 7.12314C13.7867 7.4054 15.5768 9.30906 15.7075 11.5458C15.7834 12.8726 15.282 14.17 14.3301 15.1261C13.7152 15.7452 13.016 16.1453 12.1484 16.3812C11.7818 16.4782 11.6639 16.4907 11.0026 16.4907C10.3413 16.4907 10.2234 16.4782 9.85685 16.3812C8.82483 16.1031 7.96991 15.5513 7.32971 14.747C5.82601 12.8726 5.97341 10.2234 7.67511 8.50914C8.71549 7.46436 10.1477 6.95044 11.5418 7.12314Z"
                            fill="#A8ABAF"
                          />
                          <path
                            id="Vector_3"
                            d="M18.7268 7.38822C18.3013 7.57346 18.2004 8.13798 18.533 8.47062C19.0047 8.94648 19.7797 8.52122 19.6576 7.85572C19.5817 7.45994 19.1059 7.2197 18.7268 7.38822Z"
                            fill="#A8ABAF"
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
                <div>
                  <div className="w-6 pl-0.5 pr-px pt-0.5 rounded-md border border-[#A8ABAF] justify-center items-center inline-flex">
                    <p className="text-[#A8ABAF] text-[11px] font-normal font-['Poppins']">
                      GIF
                    </p>
                  </div>
                </div>
                <div className="w-6">
                  <img src="/icons/h1.png" alt="emoji" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
