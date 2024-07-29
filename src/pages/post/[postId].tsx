import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const PostById = () => {
    const router = useRouter();
    const { postId } = router.query;
    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState<any>(null);
    const [postUserPic, setPostUserPic] = useState<string>("");
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${Backend_url}/api/post-by-id/${postId}`);
                if (res.data) {
                    setPost(res.data);
                    // Assuming post data includes user picture URL
                    setPostUserPic(res.data.userPic); // Update this according to your API response
                }
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const res = await axios.get(`${Backend_url}/api/get-comments-by-post/${postId}`);
                if (res.data) {
                    setComments(res.data);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        if (postId) {
            fetchData();
            fetchComments();
        }
    }, [postId]);

    const renderDescription = () => {
        if (!post?.description) {
            return null;
        }
    
        const words = post.description.split(/\s+/);
        const maxWordsToShow = 20;
    
        const truncatedDescription = words.slice(0, maxWordsToShow).join(" ");
        const fullDescription = words.join(" ");
    
        const toggleDescription = () => {
            setShowFullDescription(!showFullDescription);
        };
    
        return (
            <>
                <p className="text-gray-800 mt-2">
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

    const mediaUrl = post?.link_image && isValidUrl(post?.link_image) ? post?.link_image : '';

    return (
        <div className="max-w-4xl mx-auto my-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center p-4 border-b border-gray-200">
                <img
                    src={postUserPic || "/default-profile-pic.jpg"} // Default profile picture
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                    <p className="font-semibold text-lg">{post?.userName || "User Name"}</p>
                    <p className="text-sm text-gray-500">{new Date(post?.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="p-4">
                {renderDescription()}
                {mediaUrl && (
                    <div className="mt-4">
                        <img
                            src={`${mediaUrl}`}
                            alt="Post media"
                            className="w-full rounded-lg"
                        />
                    </div>
                )}
            </div>
            <div className="border-t border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800">Comments:</h3>
                <div>
                    {comments?.map((comment: any) => (
                        <div key={comment.comment_id} className="mt-2">
                            <p className="text-gray-800">{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostById;
