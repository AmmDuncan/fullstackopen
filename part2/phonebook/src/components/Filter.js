import React from "react";

const Filter = ({ filter, handler }) => {
  return (
    <>
      Filter shown with <input value={filter} onChange={handler} />
    </>
  );
};

export default Filter;
