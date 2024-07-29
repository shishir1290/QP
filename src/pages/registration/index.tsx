import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IND" },
  { code: "+880", country: "BD" },
  { code: "+86", country: "CN" },
  { code: "+61", country: "AU" },
  { code: "+55", country: "BR" },
  { code: "+33", country: "FR" },
  { code: "+49", country: "DE" },
  { code: "+81", country: "JP" },
  { code: "+52", country: "MX" },
  { code: "+7", country: "RU" },
  { code: "+27", country: "ZA" },
  { code: "+82", country: "KR" },
  { code: "+34", country: "ES" },
  { code: "+46", country: "SE" },
  { code: "+41", country: "CH" },
  { code: "+90", country: "TR" },
  { code: "+971", country: "UAE" },
  { code: "+84", country: "VN" },
  // Add more as needed
];

type Gender = {
  _id: string;
  gender_name: string;
  data_status: string | null;
  ip_address: string;
  created_by: string | null;
  updated_by: string | null;
  CreatedAt: string;
  UpdatedAt: string;
  __v: number;
};

const RegistrationPage = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [gender, setGender] = useState<Gender[]>([]);


  const handleFocus = () => {
    setIsFocused(true);
    if (phoneNumber === "") {
      setPhoneNumber(selectedCountry);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (phoneNumber === selectedCountry) {
      setPhoneNumber("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ensure the phone number starts with the selected country code
    if (!value.startsWith(selectedCountry)) {
      setPhoneNumber(selectedCountry + value);
    } else {
      setPhoneNumber(value);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${Backend_url}/api/genders`);

        if (res.data) {
          setGender(res.data);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router]); // Empty dependency array ensures this effect runs only once

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Add your form submission logic here
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await axios.post(`${Backend_url}/api/signup`, {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        day: data.day,
        month: data.month,
        year: data.year,
        phone: data.phone,
      });

      if (res.data) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-950 px-4">
      <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-6xl mt-8">
        <div className="w-full lg:w-3/5 flex flex-col justify-start items-start space-y-7 mb-8 lg:mb-0">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold leading-[3rem] sm:leading-[4rem] md:leading-[4rem] mx-4 md:mx-0">
            Welcome to the first decentralized Social Network in the world
          </h1>
          <p className="text-white text-[15px] sm:text-[16.5px] font-medium leading-7 mx-4 md:mx-0">
            We are the only decentralized social network that gives opportunity
            to monetize your time even if you are a normal user who doesn’t
            create any content and use the earning to buy any service or goods
            from the native marketplace.
          </p>
          <div className="w-full sm:w-auto">
            <Link href="/login">
              <div className="w-full sm:w-[183px] h-[60px] bg-teal-700 rounded-lg flex justify-center items-center text-white text-xl font-semibold">
                Login Now!
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-[415px] p-6 bg-white rounded-sm flex flex-col space-y-6 mb-10">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="text-teal-700 text-2xl font-bold font-open-sans">
                Register your Account
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="firstName"
                    className="text-zinc-900 text-sm font-semibold font-manrope"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="h-10 px-3 py-2 rounded border border-slate-500 w-full"
                    placeholder="Enter your first name"
                    autoComplete="first-name"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="lastName"
                    className="text-zinc-900 text-sm font-semibold font-manrope"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="h-10 px-3 py-2 rounded border border-slate-500 w-full"
                    placeholder="Enter your last name"
                    autoComplete="last-name"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-zinc-900 text-sm font-semibold font-manrope"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="h-10 px-3 py-2 rounded border border-slate-500 w-full"
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-zinc-900 text-sm font-semibold font-manrope"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="h-10 px-3 py-2 rounded border border-slate-500 w-full"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required 
                />
              </div>

              {/* Date of Birth Selects */}
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="dob"
                  className="text-zinc-900 text-sm font-semibold font-['Manrope']"
                >
                  Date of Birth
                </label>
                <div className="flex gap-2">
                  <select
                    id="month"
                    name="month"
                    className="w-1/3 h-10 px-3 py-2 rounded-md border border-slate-500 text-sm text-black font-medium font-inter"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {`0${i + 1}`.slice(-2)}
                      </option>
                    ))}
                  </select>
                  <select
                    id="day"
                    name="day"
                    className="w-1/3 h-10 px-3 py-2 rounded-md border border-slate-500 text-sm text-black font-medium font-inter"
                  >
                    <option value="">DD</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {`0${i + 1}`.slice(-2)}
                      </option>
                    ))}
                  </select>
                  <select
                    id="year"
                    name="year"
                    className="w-1/3 h-10 px-3 py-2 rounded-md border border-slate-500 text-sm text-black font-medium font-inter"
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 75 }, (_, i) => (
                      <option key={2024 - i} value={2024 - i}>
                        {2024 - i}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-zinc-900 text-sm font-semibold font-manrope"
                >
                  Phone number
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <select
                    className="h-10 px-3 py-2 rounded-l border border-slate-500"
                    id="countryCode"
                    name="countryCode"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    {countryCodes.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={
                      isFocused
                        ? phoneNumber
                        : phoneNumber || `${selectedCountry} (555) 000-0000`
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="h-10 px-3 py-2 rounded-r border border-slate-500 flex-1"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="gender"
                  className="text-zinc-900 text-sm font-semibold font-manrope"
                >
                  Your Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="h-10 px-3 py-2 rounded border border-slate-500 w-full"
                >
                  <option value="">Choose Gender</option>
                  {gender.length > 0 &&
                    gender.map((g) => (
                      <option key={g._id} value={g._id}>
                        {g.gender_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="h-4 w-4 text-teal-700 border-gray-300 rounded accent-teal-700"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-zinc-900 text-sm font-normal font-manrope"
                >
                  I accept the{" "}
                  <span className="text-teal-700 font-bold">
                    Terms and Conditions
                  </span>{" "}
                  of the website
                </label>
              </div>

              <button
                type="submit"
                className=" w-[330px] md:w-[367px] h-11 px-3 py-1.5 bg-teal-700 rounded justify-center items-center gap-1 inline-flex"
              >
                <div className="text-center text-white text-base font-semibold font-['Manrope']">
                  Complete Registration!
                </div>
              </button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm font-normal text-zinc-900">
              Already have an account?{" "}
              <Link href="/login">
                <span className="text-teal-700 font-bold">Login here</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
