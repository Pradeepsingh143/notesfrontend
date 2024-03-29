import React, { useState, useEffect } from "react";
import axios from "axios";
import useUserData from "../hooks/useUserData";

export const Form = () => {
  const { fetchUserData } = useUserData();
  // To Store the value from Frontend
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [errMessage, setErrMessage] = useState({ message: "", status: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const clearErrMessagge = setTimeout(() => {
      setErrMessage({
        message: "",
        status: false,
      });
    }, 4000);
    return () => {
      clearTimeout(clearErrMessagge);
    };
  }, [errMessage.status]);

  // Function to send the Data
  const submitData = async () => {
    setLoading(true);
    try {
      const data = {
        name: userName,
        email: userEmail,
      };
      await axios.post("/createUser", data);
      fetchUserData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrMessage({
        message:
          error?.response?.data?.message ||
          "SomeThing went wrong or email already in list",
        status: true,
      });
    } finally {
      setLoading(false);
    }
  };
  // To handle the Default
  const handleSubmit = (event) => {
    event.preventDefault();
    // To submit the Data
    submitData();
    // But Empty the previous Details
    setUserName("");
    setUserEmail("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-8 mx-auto">
            <div className="flex flex-col text-center w-full mb-6">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                Create User
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={userEmail}
                      onChange={(event) => {
                        setUserEmail(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    disabled={loading ? true : false}
                    type="submit"
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Submit
                  </button>
                </div>
                {loading? <p className="mx-auto text-green mt-3">...Loading</p> :errMessage.status ? (
                  <p className="mx-auto text-red mt-3">{errMessage.message}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};
