import React from "react";
import { useLocation } from "react-router-dom";

export default () => {
  const { state } = useLocation();
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[97%] md:w-[95%] xl:w-[85%] lg:w-[90%]">
          <div className="flex justify-center items-center w-full h-screen">
            <div className="addProd p-10 rounded-md">
              <div className="flex justify-between gap-10 items-center">
                <img src={state?.img} className="w-[400px] h-full" alt="" />
                <div className="p-3">
                  <div className="flex justify-between gap-10 md:flex-row flex-col items-center">
                    <h1 className="text-2xl font-bold font-sans">Nomi : </h1>
                    <h1 className="text-3xl font-semibold font-serif">
                      {state?.title}
                    </h1>
                  </div>
                  <div className="flex justify-between mt-5 gap-10 md:flex-row flex-col items-center">
                    <h1 className="text-2xl font-bold font-sans">Narxi : </h1>
                    <h1 className="text-3xl font-semibold font-serif">
                      {state?.price}
                    </h1>
                  </div>
                </div>
              </div>
              <h1 className="pt-5 text-center text-3xl font-semibold font-sans">
                Mahsulot haqida
              </h1>
              <p className="mt-7 w-full text-2xl font-medium font-serif leading-6">
                {state?.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
