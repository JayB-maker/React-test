import React from "react";

const ActionButton = (props) => {
  const { prevPage, nextPage } = props;
  return (
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
  );
};

export default ActionButton;
