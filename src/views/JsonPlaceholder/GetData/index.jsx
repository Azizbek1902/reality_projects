import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res.data);
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
  const handleClik = (data) => {
    navigate("/getOne", {
      state: data.id,
    });
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[95%] md:w-[90%] lg:w-[80%]">
          <h1 className="my-5 text-center text-3xl font-sans font-semibold">
            Users table
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
                          Name
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          UserName
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Phone
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Email
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => {
                        return (
                          <>
                            {data ? (
                              <>
                                <tr
                                  className="border-b dark:border-neutral-500"
                                  key={index + 1}
                                >
                                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                    {index + 1}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4">
                                    {item.name}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4">
                                    {item.username}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4">
                                    {item.phone}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4">
                                    {item.email}
                                  </td>
                                  <td className="whitespace-nowrap  px-6 py-4">
                                    <button onClick={() => handleClik(item)}>
                                      <AiOutlineEye size={25} color="#212121" />
                                    </button>
                                  </td>
                                </tr>
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
