import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { setToken } from "../lib/auth";

function Register() {
  const [formData, setFormData] = useState({
    username:"",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch("http://localhost:1337/api/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
       formData
      ),
    });
    const data = await response.json();

    setToken(data);
    window.location.href = "/";
  }
  catch(err){
    console.log(err)

  }
  };

  const [show, setShow] = useState(false);
  const showPassword = () => {
    setShow(!show);
  };
  return (
    <>
      <div className=" bg-gray-50">
        <div className=" flex bg-gray-50  md:pt-10 justify-center">

          <div className=" md:w-[350px] lg:w-[500px] bg-white lg:rounded-r-2xl lg:p-16 p-4 pt-10  max-[400px] shadow-2xl">
            <h1 className="font-poppins text-2xl md:text-4xl font-bold pb-5">
              Welcome to T&P Portal
            </h1>
            <p className="font-poppins md:text-xl  pb-4">
              Welcome back! Please enter your credentials to access your
              account.
            </p>
            <div className="my-2">Name</div>
            <div className="flex flex-row border-gray-400 placeholder:text-[#667086] placeholder:text-[16px]  border-[0.5px] mt-2 rounded-[5px]">
              <input
                type="text"
                name="username"
                value={formData.username}
                placeholder="Enter your name"
                className="w-full p-2 px-6 py-2 rounded placeholder:text-[#667086]"
                onChange={handleChange}
                required
              />
            </div>
            <div className="my-2">Email</div>
            <div className="flex flex-row border-gray-400 placeholder:text-[#667086] placeholder:text-[16px]  border-[0.5px] mt-2 rounded-[5px]">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                className="w-full p-2 px-6 py-2 rounded placeholder:text-[#667086]"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-3">Password</div>
            <div className="flex flex-row border-gray-400 items-center placeholder:text-[#667086] placeholder:text-[16px]  border-[0.5px] mt-2 rounded-[5px]">
              <input
                type={show ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="Enter your Password"
                className="w-full p-2 px-6 py-2 rounded placeholder:text-[#667086]"
                width="90vw"
                onChange={handleChange}
                required
              />
              <FaEye className="text-3xl pr-2" onClick={()=>{
                showPassword(!show)
              }}/>
            </div>


            <div className="w-full mt-4">
              <button
                className="w-full p-[10px] md:py-[16px] md:px-[16px] text-white bg-[#346373] mb-4 font-medium rounded-lg"
                onClick={handleSubmit}
              >
                Sign Up
                
              </button>
            </div>
            <div>
              By signing up you are agreeing to our{" "}
              <span className="text-[#346373]">Terms of Service</span> and our
              <span className="text-[#346373]"> Privacy Policy</span> .
            </div>


            <div className=" text-center p-8">
              {" "}
              Already have an account?{" "}
              <Link to={"/login"}>
                <span className=" text-[#346373]"> Sign in</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;