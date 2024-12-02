import React, { useEffect, useState } from "react";
import { useData } from "@/hooks";
import Input from "@/components/Input";

import type {
  DepartmentResponse,
  EmployeeCreateRequest,
  ListUsers,
} from "@/types";

import * as Yup from "yup";
import { type FormikHelpers, useFormik } from "formik";
import apiClient, { ApiClientError } from "@/services/api-client";

interface Props {
  showModal: boolean;
  id: string;
  handleModalDismiss: () => void;
  handleSuccess: () => void;
}

const EmployeeEditModal: React.FC<Props> = (props) => {
  const { showModal, handleModalDismiss, handleSuccess, id } = props;

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "Please provide a valid name")
      .required("please provide a name"),
    email: Yup.string()
      .email("Not a Valid Email")
      .required("please Provide a Email"),
    password: Yup.string()
      .min(6, "password is too short")
      .max(16, "password is too long")
      .required("prlease provide the password"),
    dept: Yup.string().required("please select a department"),
  });

  const onClick = (e: MouseEvent) => {
    if ((e.target as HTMLDivElement).id !== "modal") return;

    handleModalDismiss();
  };

  if (showModal === false) return;

  const [departments, setDepartments] = useState<string[]>([]);

  const { data } = useData<DepartmentResponse>("department/");

  const initialValues: EmployeeCreateRequest = {
    dept: "",
    email: "",
    name: "",
    password: "",
  };

  const onSubmit = (
    data: EmployeeCreateRequest,
    helpers: FormikHelpers<EmployeeCreateRequest>
  ) => {
    apiClient
      .post("employee/", data)
      .then((res) => {
        res.status === 201 && handleSuccess();
      })
      .catch((err: ApiClientError) => {
        if (err.status === 409) {
          helpers.setFieldError("email", "email is already taken");
        }
      });
  };

  const { values, errors, touched, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  const [employee, setEmployee] = useState<ListUsers | null>(null);
  const [_, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<ListUsers>(`employee/${id}/`, { signal: controller.signal })
      .then((res) => {
        setEmployee(res.data);
        setValues({
          email: res.data.email,
          dept: res.data.dept,
          name: res.data,
        });
      })
      .catch((error: ApiClientError) => {
        setError(error.message);
      });

    return () => controller.abort();
  }, []);

  console.log(values);

  useEffect(() => {
    data.forEach(({ name }) => {
      setDepartments((prev) => {
        const newArray = [...prev];

        if (!newArray.includes(name)) {
          newArray.push(name);
        }

        return newArray;
      });
    });
  }, [data]);

  return (
    <>
      {/* Modal toggle */}

      {/* Main modal */}
      <div
        id="modal"
        tabIndex={-1}
        aria-hidden="true"
        onClick={(event: any) => onClick(event)}
        className="overflow-y-auto overflow-x-hidden backdrop-blur-md fixed top-0 right-0 left-0 z-50  flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div
          id="modal"
          className="relative p-4 w-full max-w-2xl max-h-full"
          onClick={(event: any) => onClick(event)}
        >
          {/* Modal content */}
          <form
            className="relative bg-zinc-800 rounded-lg shadow "
            onSubmit={handleSubmit}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-white">
                Employee Register Form
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={() => handleModalDismiss()}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className=" md:p-5 space-y-4 p-8 ">
              <Input
                id="email"
                label="Email"
                name="email"
                type="email"
                value={values.email}
                handleChange={handleChange}
                error={errors.email && touched.email ? errors.email : ""}
              />
              <Input
                id="name"
                label="Name"
                name="name"
                type="text"
                value={values.name}
                handleChange={handleChange}
                error={errors.name && touched.name ? errors.name : ""}
              />

              <Input
                id="password"
                label="Password"
                name="password"
                type="password"
                handleChange={handleChange}
                value={values.password}
                error={errors.email && touched.email ? errors.email : ""}
              />

              <p className=""></p>

              <select
                id="dept"
                name="dept"
                className="bg-zinc-800 border text-gray-100 text-sm rounded-lg  block w-full p-2.5  appearance-none"
                value={values.dept}
                onChange={handleChange}
              >
                {departments.map((item) => (
                  <option defaultChecked={values.dept === item}>{item}</option>
                ))}
              </select>

              {errors.dept && (
                <div className="my-5">
                  <p className="text-red-600 text-sm">{errors.dept}</p>
                </div>
              )}

              <button
                type="submit"
                className="flex w-full mb-5  justify-center rounded-md bg-zinc-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm"
              >
                Add Employee
              </button>
            </div>
            {/* Modal footer */}
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
