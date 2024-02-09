import React from "react";
import Convert from "./Convert";
import Data from "./Data";

function Main() {
  return (
    <div className="min-w-full min-h-screen flex flex-wrap justify-center item-center relative dark:bg-gray-900 ">
      <div className="flex flex-col m-4 w-full">
        <Convert />
        <h3 className="mx-4 sm:mx-8 text-slate-100 font-bold text-center">
          ... All Websites ...
        </h3>
        <Data />
      </div>
    </div>
  );
}

export default Main;
