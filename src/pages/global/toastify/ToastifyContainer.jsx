import React from "react";
import { ToastContainer } from "react-toastify";

const ToastifyContainer = ({ theme }) => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
      style={{ fontFamily: "Roboto !important" }}
    />
  );
};

export default ToastifyContainer;
