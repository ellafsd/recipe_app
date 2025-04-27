import React from "react";

const Sort = ({ setOrder }) => {
  return (
    <select
      className = "rounded-md p-2" 
      defaultValue = ""
      onChange={(e) => setOrder(e.target.value)} >
     
      <option value="" disabled> Sort by Duration</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>

    </select>
  );
};

export default Sort;
