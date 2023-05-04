import React from "react";

function Plans(props) {
  function submitHandler(e) {
    props.onButtonClick(props.id);
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4 text-center w-64">
      <h3 className="text-lg font-medium mb-2">{props.planName}</h3>
      <p className="text-gray-700 mb-2">₹{props.price}</p>
      <button
        onClick={submitHandler}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        id={props.id}
      >
        Choose Plan
      </button>
    </div>
  );
}

export default Plans;
