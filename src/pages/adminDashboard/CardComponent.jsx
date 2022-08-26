import React from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import avatar from "../assets/avatar.png";
import arrow_up from "../assets/arrow-up.png";

const CardComponent = (props) => {
  const { index, id, photo, username, title, like, moveCard } = props;

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // For it not to replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div className="flex flex-col" ref={ref} data-handler-id={handlerId}>
      <div
        className="flex items-center border-2 border-text_gray mt-4 rounded-2xl h-15"
        key={index}
      >
        <div className="flex items-center w-6/12 gap-3 p-5">
          <p className="text-sm text-text_gray">{id}</p>
          <img src={photo} alt={username} className="w-32 h-16 rounded-lg" />
          <p className="text-xl pr-10 text-text_white font-light">{title}</p>
        </div>
        <div className="flex justify-between items-center w-6/12 ">
          <div className="flex items-center gap-4 -mx-10">
            <img src={avatar} alt="" className="rounded-full h-10 w-10" />
            <p className="text-xl pr-10 text-text_green font-light">
              {username}
            </p>
          </div>
          <div className="flex items-center gap-4 pr-5">
            <p className="text-xl text-text_white font-light">{like}</p>
            <img src={arrow_up} className="h-5 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
