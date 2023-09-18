import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="flex relative justify-center">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="absolute top-10 right-10 text-xl font-serif py-2 px-4 rounded-md bg-blue-950 text-white"
        >
          Back to home
        </button>
        <div className="mt-16 w-[95%] md:w-[90%] lg:w-[80%]">
          <h1 className="my-5 text-center text-3xl font-sans font-semibold">
            Posts table
          </h1>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                      <tr>
                        <th scope="col" className=" px-6 py-4">
                          #
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Titles
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Bodys
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => {
                        console.log(state);
                        return (
                          <>
                            {data ? (
                              <>
                                {state == item.userId ? (
                                  <>
                                    <tr
                                      className="border-b dark:border-neutral-500"
                                      key={index + 1}
                                    >
                                      <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                        {index + 1}
                                      </td>
                                      <td className="whitespace-nowrap  px-6 py-4">
                                        {item.title}
                                      </td>
                                      <td className="whitespace-nowrap  px-6 py-4">
                                        {item.body}
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            ) : (
                              <>
                                <div
                                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                  role="status"
                                >
                                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                    Loading...
                                  </span>
                                </div>
                              </>
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
