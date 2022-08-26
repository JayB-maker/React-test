import React from "react";
import update from "immutability-helper";
import { useCallback } from "react";
import CardComponent from "./CardComponent";
import MkdSDK from "../../utils/MkdSDK";
import ActionButton from "./ActionButton";

const Draggable = () => {
  const [pageNumber, setPageNumber] = React.useState(2);
  const [movieList, setMovieList] = React.useState([]);

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //CALLING THE MOVIE API
  React.useEffect(() => {
    getMovies();
  }, []);

  //IMPLEMENTING THE NEXT PAGE API
  const nextPage = () => {
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
    pageNumber > 1 && setPageNumber(pageNumber - 1);
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

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setMovieList((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);
  const renderCard = useCallback((card, index) => {
    return (
      <CardComponent
        key={card.id}
        index={index}
        id={card.id}
        photo={card.photo}
        username={card.username}
        title={card.title}
        like={card.like}
        moveCard={moveCard}
      />
    );
  }, []);

  return (
    <>
      <div>{movieList.map((card, index) => renderCard(card, index))}</div>
      <ActionButton nextPage={nextPage} prevPage={prevPage} />
    </>
  );
};

export default Draggable;
