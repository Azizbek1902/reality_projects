import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Dropdown from "../../../../components/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddStudent() {
  const url = "http://localhost:8080/students";
  const { state } = useLocation();
  const [isEdit, setIsEdit] = useState({ type: false, id: null });
  const [clases, setClases] = useState([]);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      classId: {},
    },
    onSubmit: (values) => {
      if (isEdit.type) {
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          phone: values.phone,
          classId: values.classId.name,
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
          address: values.address,
          phone: values.phone,
          classId: values.classId.name,
          status: false,
        };
        console.log(payload, "dddddddddddd");
        axios
          .post(url, payload)
          .then()
          .catch((err) => console.log(err));
      }
      setIsEdit({ type: false, id: null });
      formik.resetForm();
      navigate("/");
    },
  });
  useEffect(() => {
    if (state) {
      formik.setValues({
        firstName: state.firstName,
        lastName: state.lastName,
        address: state.address,
        phone: state.phone,
        classId: state.classId,
      });
      setIsEdit({ type: true, id: state.id });
    }
    axios
      .get("http://localhost:8080/class")
      .then((res) => setClases(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="flex justify-center w-full">
        <div className="w-[95%] md:w-[90%] xl:w-[80%]">
          <div className="flex justify-center w-full items-center h-[90vh]">
            <div className="shadowCard min-w-[350px] max-w-[600px] rounded-md p-7">
              <h1 className="mb-5 text-3xl font-semibold text-center">
                Create Room
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
                  LastName Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  placeholder="LastName Name"
                  className="block border-2 mb-5 border-gray-300 rounded-md w-full py-2 pl-3 outline-none"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                <label htmlFor="address" className="text-base pl-4 pb-3">
                  Address Name
                </label>
                <input
                  id="address"
                  name="address"
                  placeholder="Address Name"
                  className="block border-2 mb-5 border-gray-300 rounded-md w-full py-2 pl-3 outline-none"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                <label htmlFor="phone" className="text-base pl-4 pb-3">
                  Phone Name
                </label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="Phone Name"
                  className="block border-2 mb-5 border-gray-300 rounded-md w-full py-2 pl-3 outline-none"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                <label htmlFor="classId" className="text-base pl-4 pb-3">
                  ClassId Name
                </label>
                <Dropdown
                  id="classId"
                  className="block border-2 border-gray-300 rounded-md w-full py-2 pl-3 outline-none"
                  name="classId"
                  value={formik.values.classId}
                  options={clases}
                  padding="13px 20px"
                  width="100%"
                  placeholder="Classs"
                  handleItem={(item) => formik.setFieldValue("classId", item)}
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
