import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { setToken } from "../lib/auth";


function Loginpage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        identifier: formData.email,
        password: formData.password,
      }),
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
      <div className=" bg-gray-50 h-screen ">
        <div className=" flex  md:pt-10 bg-gray-50 justify-center">
          

          <div className=" md:w-[350px] lg:w-[500px] bg-white lg:rounded-r-2xl lg:p-16 p-4 pt-10  max-[400px] shadow-2xl">
            <h1 className="font-poppins text-2xl md:text-4xl font-bold pb-5">
              Login to your account
            </h1>
            <p className="font-poppins md:text-xl  pb-4">
              Welcome back! Please enter your credentials to access your
              account.
            </p>
            <div className="my-2">Username or Email</div>
            <div className="flex flex-row border-gray-400 placeholder:text-[#667086] placeholder:text-[16px]  border-[0.5px] mt-2 rounded-[5px]">
              <input
                type="email"
                name="email"
                placeholder="Enter your email or username"
                className="w-full p-2 px-6 py-2 rounded placeholder:text-[#667086]"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-3">Password</div>
            <div className="flex flex-row border-gray-400 placeholder:text-[#667086] placeholder:text-[16px]  border-[0.5px] mt-2 rounded-[5px]">
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Enter your Password"
                className="w-full p-2 px-6 py-2 rounded placeholder:text-[#667086]"
                width="90vw"
                onChange={handleChange}
                required
              />
             <FaEye className="text-3xl pr-2"
             onClick={()=>{
                showPassword(!show)  
             }}
             />
            </div>
            <div className="w-full mt-4">
              <button
                className="w-full p-[10px] md:py-[16px] md:px-[16px] text-white bg-[#346373] mb-4 font-medium rounded-lg"
                onClick={handleSubmit}
              >
                Sign In
              </button>
             
            </div>
            
            
            
            <div className=" text-center p-8">
              {" "}
              Don’t have an account?{" "}
              <Link to={"/register"}>
              <span className=" text-[#346373]"> Sign up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;