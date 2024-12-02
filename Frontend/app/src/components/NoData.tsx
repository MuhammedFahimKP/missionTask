import React from "react";
import { ImSad } from "react-icons/im";

const NoData = () => {
  return (
    <div className="flex  flex-col items-center text-gray-100 bg-zinc-950 self-center  mx-52  w-full h-[50vh] justify-center">
      <ImSad className="size-20 text-gray-100" />
      <p className="mt-2">No Data</p>
    </div>
  );
};

export default NoData;
