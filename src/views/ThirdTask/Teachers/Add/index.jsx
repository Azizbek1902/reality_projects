import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../../../../components/Dropdown";

export default function TeacherAdd() {
  const url = "http://localhost:8080/teacher";
  const [lessons, setLessons] = useState([]);
  const { state } = useLocation();
  const [isEdit, setIsEdit] = useState({ type: false, id: null });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      lesson: {},
    },
    onSubmit: (values) => {
      if (isEdit.type) {
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          address: values.address,
          lesson: values.lesson.name,
        };
        axios
          .put(`${url}/${isEdit.id}`, payload)
          .then()
          .catch((err) => console.log(err));
      } else {
        const payload = {
          id: new Date(),
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          address: values.address,
          lesson: values.lesson.name,
        };
        axios
          .post(url, payload)
          .then()
          .catch((err) => console.log(err));
      }
      setIsEdit({ type: false, id: null });
      formik.resetForm();
      navigate("/teacher");
    },
  });
  useEffect(() => {
    if (state) {
      formik.setValues({
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone,
        address: state.address,
        lesson: state.lesson,
      });
      setIsEdit({ type: true, id: state.id });
    }
    axios
      .get("http://localhost:8080/lesson")
      .then((res) => {
        setLessons(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="w-[95%] md:w-[90%] xl:w-[80%]">
          <div className="flex justify-center w-full items-center h-[91vh]">
            <div className="shadowCard min-w-[350px] max-w-[600px] rounded-md p-10">
              <h1 className="mb-5 text-3xl font-semibold text-center">
                Create Teacher
              </h1>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName" className="text-base pl-4 pb-3">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="block border-2 mb-5 border-gray-300 rounded-md w-full py-2 pl-3 outline-none"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                <label htmlFor="lastName" className="text-base pl-4 pb-3">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="block border-2 mb-5 border-gray-300 rounded-md w-full py-2 pl-3 outline-none"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                <label htmlFor="phone" className="text-base pl-4 pb-3">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  className="block border-2 mb-5 border-gray-300 rounded-md w-full py-2 pl-3 outline-none"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                <label htmlFor="address" className="text-base pl-4 pb-3">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  placeholder="Address"
                  className="block border-2 mb-5 border-gray-300 rounded-md w-full py-2 pl-3 outline-none"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                <Dropdown
                  id="lesson"
                  className="block border-2 mb-5 border-gray-300 rounded-md w-full py-1 pl-3 outline-none"
                  name="lesson"
                  value={formik.values.lesson}
                  options={lessons}
                  width="100%"
                  placeholder="Room"
                  handleItem={(item) => formik.setFieldValue("lesson", item)}
                  arrow
                />
                <button
                  className="mt-5 text-white font-semibold text-lg bg-blue-500 rounded-md py-2 w-full"
                  type="submit"
                >
                  {isEdit.type ? "Edit" : "Create"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
