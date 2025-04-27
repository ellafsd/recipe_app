import React from "react";

const Error = ({ info, refetch }) => {
  return (
    <div className="flex flex-col">
      <div className="mt-40 bg-red-300 rounded-lg p-5 text-white text-lg text-center">
        <h1>Sorry, unexpected issue happened...</h1>
        <h1>{info}</h1>
      </div>

      <button 
        className="btn rounded-lg mt-10 bg-orange-200 hover:bg-orange-300" onClick={refetch}>
        Try again
      </button>
    </div>
  );
};

export default Error;
