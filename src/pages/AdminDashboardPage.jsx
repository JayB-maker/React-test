import React from "react";
import arrow from "./assets/arrow.png";
import avatar from "./assets/avatar.png";
import arrow_up from "./assets/arrow-up.png";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router";
import { useDrag, useDrop } from "react-dnd/dist/hooks";

const AdminDashboardPage = () => {
  const [pageNumber, setPageNumber] = React.useState(1);
  const [movieList, setMovieList] = React.useState([]);
  const navigate = useNavigate();

  //IMPLEMENTING THE LOGOUT FUNCTION
  const logoutFunction = () => {
    localStorage.clear();
    navigate("/");
  };

  //IMPLEMENTING THE MOVIE API
  const getMovies = () => {
    const sdk = new MkdSDK();
    sdk
      .callRestAPI(
        {
          payload: {},
        },
        "PAGINATE"
      )
      .then((response) => {
        setMovieList(response.list);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //IMPLEMENTING THE NEXT PAGE API
  const nextPage = () => {
    console.log("go");
    pageNumber > 11 ? setPageNumber(12) : setPageNumber(pageNumber + 1);
    const sdk = new MkdSDK();
    sdk
      .callRestAPI(
        {
          payload: {},
          page: pageNumber,
        },
        "PAGINATE"
      )
      .then((response) => {
        setMovieList(response.list);
      })
      .catch((err) => {});
  };

  //IMPLEMENTING THE PREVIOUS PAGE API
  const prevPage = () => {
    console.log("go");
    pageNumber > 1 ? setPageNumber(pageNumber - 1) : setPageNumber(1);
    const sdk = new MkdSDK();
    sdk
      .callRestAPI(
        {
          payload: {},
          page: pageNumber,
        },
        "PAGINATE"
      )
      .then((response) => {
        setMovieList(response.list);
      })
      .catch((err) => {});
  };

  //CALLING THE MOVIE API
  React.useEffect(() => {
    getMovies();
  }, []);

  // IMPLEMENTING THE DRAG AND DROP
  // const [{ isOver }, addToTeamRef] = useDrop({
  //   accept: "player",
  //   collect: (monitor) => ({ isOver: !!monitor.isOver }),
  // });
  // const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
  //   accept: "team",
  //   collect: (monitor) => ({ isOver: !!monitor.isOver }),
  // });

  // const [{ isDraggable }, dragRef] = useDrag({
  //   type: player,
  //   item: id,
  //   end: (item, monitor) => {
  //     const dropResult = monitor.getDropResult();

  //     if (dropResult && item) {
  //       onDropPlayer(item);
  //     }
  //   },
  //   collect: (monitor) => {
  //     isDragging: monitor.isDragging();
  //   },
  // });

  return (
    <>
      <div className="w-screen absolute block top-0 left-0 bg-secondary min-h-screen text-gray-700 py-5 px-20 m-0 my-0">
        <div className="w-full h-full">
          {/* HEADER */}
          <div className="flex items-center justify-between w-full">
            <h1 className="text-4xl font-bold text-text_white">App</h1>
            <button
              className="bg-accent rounded-full text-text_black text-bold text-lg py-2 px-6"
              onClick={() => logoutFunction()}
            >
              Logout
            </button>
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

          {/* TABLE */}
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
          <div className="flex flex-col gap-4">
            {movieList.map((movie, index) => (
              <div
                className="flex items-center border-2 border-text_gray rounded-2xl h-15"
                key={index}
                // ref={dragRef}
              >
                <div className="flex items-center w-6/12 gap-3 p-5">
                  <p className="text-sm text-text_gray">{movie.id}</p>
                  <img
                    src={movie.photo}
                    alt={movie.username}
                    className="w-32 h-16 rounded-lg"
                  />
                  <p className="text-xl pr-10 text-text_white font-light">
                    {movie.title}
                  </p>
                </div>
                <div className="flex justify-between items-center w-6/12 ">
                  <div className="flex items-center gap-4 -mx-10">
                    <img
                      src={avatar}
                      alt=""
                      className="rounded-full h-10 w-10"
                    />
                    <p className="text-xl pr-10 text-text_green font-light">
                      {movie.username}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pr-5">
                    <p className="text-xl text-text_white font-light">
                      {movie.like}
                    </p>
                    <img src={arrow_up} className="h-5 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER OR ACTION BUTTON */}
          <div className="flex gap-4 mt-10 justify-end">
            <button
              className="bg-accent rounded text-text_black text-bold text-lg p-3 px-6"
              onClick={() => prevPage()}
            >
              Previous
            </button>
            <button
              className="bg-accent rounded text-text_black text-bold text-lg p-3 px-6"
              onClick={() => nextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
