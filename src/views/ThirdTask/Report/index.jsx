import { BsFillCalendar2DayFill } from "react-icons/bs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

export default () => {
  const url = "http://localhost:8080/students";
  const urlAttendance = "http://localhost:8080/attendance";
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [dovomat, setDovomat] = useState([]);
  const [value, setValue] = useState(new Date());
  const [filter, setFilter] = useState({});

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(urlAttendance)
      .then((res) => {
        setDovomat(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8080/class")
      .then((res) => {
        setClasses(res.data);
        setFilter(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  const onChangeFunk = (date) => {
    setValue(date);
  };
  let momentDte = moment(value).format("YYYY-MM-DD");
  const newData = [];
  data.map((item) => {
    if (item?.classId === filter?.name) {
      dovomat.map((elem) => {
        if (momentDte === elem?.date) {
          elem.students.map((foo) => {
            if (item.id === foo?.studentId) {
              item.status = foo.status;
              newData.push(item);
            }
          });
        }
      });
    }
  });
  console.log(newData, "ddddd");
  return (
    <div className="grid grid-cols-12">
      <div className="bg-white shadowCard border-r-2 flex justify-center items-center col-span-2 w-full min-h-[91vh] max-h-full">
        <div className="max-h-[500px] overflow-y-auto">
          <h1 className="text-4xl block pb-7 text-[#1F2937] font-semibold font-serif">
            Classes
          </h1>
          {classes.map((item, ind) => {
            return (
              <div
                onClick={() => {
                  setFilter(item);
                }}
                key={ind + 1}
                className="active:bg-[#1F2937] tranasition active:sidebar text-[#1F2937] hover:text-white active:text-white border-2 hover:bg-[#1F2937] cursor-pointer border-[#1F2937] w-full mb-4 py-3 pl-4 rounded-md"
              >
                <p className="block  font-medium font-sans text-xl">
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full justify-center col-span-10 relative">
        <div className="w-[98%] md:w-[95%] lg:w-[90%] xl:w-[85%]">
          <div className="flex items-center justify-between">
            <h1 className="my-10 text-center text-4xl font-serif font-semibold">
              Report Table
            </h1>
            <DateTimePicker
              format={"y-MM-dd"}
              calendarIcon={
                <BsFillCalendar2DayFill size={23} color="#3A8DEF" />
              }
              calendarClassName="border-2 border-red-400"
              onChange={(date) => onChangeFunk(date)}
              value={value}
            />
          </div>
          <div className="flex justify-center w-full items-start">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Sinf
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {newData?.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.firstName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.lastName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.address}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.phone}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {item?.classId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div
                          className={`${
                            item?.status ? "bg-green-500" : "bg-red-500"
                          } rounded-md w-[50px] h-[50px]`}
                        >
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
