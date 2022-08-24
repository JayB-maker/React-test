import React from "react";

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
      <div className="w-full flex justify-center text-7xl h-screen text-gray-700 h-100vh position-fixed">
        <div className="container">
          <div
            className="header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1
              style={{
                fontSize: "48px",
                weight: "bold",
                color: "black",
              }}
            >
              App
            </h1>
            <button
              style={{
                backgroundColor: "purple",
                fontSize: "16px",
                color: "white",
                width: "128px",
                borderRadius: "40px",
                height: "48px",
              }}
            >
              Logout
            </button>
          </div>
          <div
            className="leaderboard"
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "112px 0 0",
            }}
          >
            <h4
              style={{
                fontSize: "40px",
                weight: "bold",
                color: "black",
              }}
            >
              Todays LeaderBoard
            </h4>
            <div
              className="date"
              style={{
                fontSize: "40px",
                weight: "bold",
                color: "black",
              }}
            >
              Date
            </div>
          </div>
          <div className="movie-container"></div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
