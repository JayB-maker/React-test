import React from "react";
import arrow from "../assets/arrow.png";
import profile from "../assets/profile.png";
import { useNavigate } from "react-router";
import Draggable from "../adminDashboard/Draggable";

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  //IMPLEMENTING THE LOGOUT FUNCTION
  const logoutFunction = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="w-full absolute block top-0 left-0 bg-secondary min-h-screen text-gray-700 py-5 px-20 m-0 my-0">
        <div className="w-full h-full">
          {/* HEADER */}
          <div className="flex items-center justify-between w-full">
            <h1 className="text-4xl font-bold text-text_white">App</h1>
            <button
              className="bg-accent rounded-full flex items-center gap-1 text-text_black text-bold text-lg py-2 px-6"
              onClick={() => logoutFunction()}
            >
              <img src={profile} alt="arrow" /> Logout
            </button>
          </div>

          <div className="flex items-center justify-between w-full mt-10">
            <h1 className="text-2xl font-bold text-text_white">
              Todays LeaderBoard
            </h1>
            <div className="w-418 bg-card_gray h-10 rounded-md flex gap-4 justify-center items-center p-5 py-7">
              <h6 className="text-sm text-text_white">30 May 2022</h6>
              <div className="bg-text_gray rounded-full h-1 w-1"></div>
              <h6 className="text-sm text-white bg-accent p-2 py-1 rounded-xl">
                SUBMISSION OPEN
              </h6>
              <div className="bg-text_gray rounded-full h-1 w-1"></div>
              <h6 className="text-sm text-text_white">11:34</h6>
            </div>
          </div>

          {/* TABLE */}
          <div className="flex justify-between items-center -mb-4">
            <div className="flex gap-4 p-5">
              <p className="text-sm text-text_gray">#</p>
              <p className="text-sm text-text_gray">Title</p>
            </div>
            <p className="text-sm text-text_gray">Author</p>
            <div className="flex gap-2 p-2 items-center">
              <p className="text-sm text-text_gray">Most Liked</p>
              <img src={arrow} alt="" className="w-4 h-2 rounded-lg" />
            </div>
          </div>

          <Draggable />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
