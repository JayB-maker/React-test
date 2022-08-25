import React from "react";
import arrow from "./assets/arrow.png";
import avatar from "./assets/avatar.png";
import arrowup from "./assets/arrow-up.png";

const AdminDashboardPage = () => {
  const [data, setData] = React.useState({});

  const getMovieData = async () => {
    await fetch(`https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    }).then((response) => setData(response));
  };

  React.useEffect(() => {
    getMovieData();
  }, []);

  return (
    <>
      <div className="w-full fixed top-0 left-0 bg-secondary flex justify-center text-7xl h-screen text-gray-700 h-100vh position-fixed py-5 px-20">
        <div className="container">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-4xl font-bold text-text_white">App</h1>
            <a
              href=""
              className="px-6 py-2
               text-lg px-6 text-text_black bg-accent rounded-full block"
            >
              Logout
            </a>
          </div>
          <div className="flex items-center justify-between w-full mt-10">
            <h1 className="text-2xl font-bold text-text_white">
              Todays LeaderBoard
            </h1>
            <div className="w-418 bg-card_gray h-10 rounded-md flex gap-4 justify-center items-center p-5 py-7">
              <h6 className="text-sm text-text_white">30 May 2022</h6>
              <div className="bg-text_gray rounded-full h-1 w-1"></div>
              <h6 className="text-sm text-white bg-accent p-2 py-1 rounded">
                SUBMISSION OPEN
              </h6>
              <div className="bg-text_gray rounded-full h-1 w-1"></div>
              <h6 className="text-sm text-text_white">11:34</h6>
            </div>
          </div>
          <div className="flex justify-between items-center">
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
          <div className="flex items-center border-2 border-text_gray rounded-2xl h-15">
            <div className="flex items-center w-6/12 gap-3 p-5">
              <p className="text-sm text-text_gray">01</p>
              <img
                src="https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-760x400.png"
                alt=""
                className="w-32 rounded-lg"
              />
              <p className="text-xl pr-10 text-text_white font-light">
                Rune raises $100,000 for marketing through NFT butterflies sale
              </p>
            </div>
            <div className="flex justify-between items-center w-6/12 ">
              <div className="flex items-center gap-4 -mx-10">
                <img src={avatar} alt="" className="rounded-full h-10 w-10" />
                <p className="text-xl pr-10 text-text_green font-light">
                  ninjanft
                </p>
              </div>
              <div className="flex items-center gap-4 pr-5">
                <p className="text-xl text-text_white font-light">256</p>
                <img src={arrowup} className="h-5 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
