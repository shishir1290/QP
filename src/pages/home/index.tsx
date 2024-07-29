import Header from "@/components/header";
import Layout from "@/components/Layout";
import LeftAside from "@/components/LeftAside";
import MiddleBar from "@/components/middle";
import Navbar from "@/components/navbar";
import RightAside from "@/components/RightAside";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Replace 'accessToken' with the actual name of the token variable.
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // Use useEffect to detect screen width on the client side
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-[#E5E6EC] w-full h-full">
      <Header />
      <div className="md:flex md:justify-start md:space-x-2">
        <div className=" sticky top-0 bg-white shadow-md z-10">
          <Navbar />
        </div>
        <div>
          <div className="sticky top-0">
            <LeftAside />
          </div>
        </div>
        <MiddleBar />
        <div className=" ml-auto">
          <div className="sticky top-0">
            <RightAside />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
