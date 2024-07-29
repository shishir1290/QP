import React from 'react';

interface StoryProps {
  user: {
    first_name: string;
    last_name: string;
    profile_pic: string;
  };
}

const Story: React.FC<StoryProps> = ({ user }) => {
  return (
    <div className="relative flex-shrink-0 w-32 h-40 mx-2 rounded-xl overflow-hidden shadow-md">
      {/* Profile picture */}
      <div className="absolute top-0 left-0 w-full h-5/6 overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile-picture/${user.profile_pic}`}
          alt="Profile"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black opacity-50"></div>

      {/* User information */}
      <div className="absolute bottom-2 left-2 text-white">
        <p className="text-sm font-medium">{`${user.first_name} ${user.last_name}`}</p>
        <p className="text-xs">1h ago</p>
      </div>
    </div>
  );
};

export default Story;
