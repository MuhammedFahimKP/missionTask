import React from "react";
import BaseForm from "./BaseForm";
import Input from "@/components/Input";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik, type FormikHelpers } from "formik";

import * as Yup from "yup";

import type { LoginRequest, LoginResponse } from "@/types";

import { loggedIn } from "@/slices/authSlice";

import apiClient, { type ApiClientError } from "@/services/api-client";

const SigninForm: React.FC = () => {
  const initialValues: LoginRequest = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Not a Valid Email")
      .required("Please Provide a Email"),
    password: Yup.string().required("Please Provide the password"),
  });

  const dipatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (
    data: LoginRequest,
    helpers: FormikHelpers<LoginRequest>
  ) => {
    apiClient
      .post<LoginResponse>("employee/login/", data)
      .then((res) => {
        if (res.status === 200) {
          const { access, refresh, name, dept, email } = res.data;

          dipatch(
            loggedIn({
              access,
              refresh,
              name,
              dept,
              email,
            })
          );

          navigate(["ADMIN", "HR"].includes(dept) ? "/admin/" : "/profile/");
        }
      })
      .catch((err: ApiClientError) => {
        if (err.status === 404) {
          helpers.setFieldError("email", "there is no employee with this mail");
        }

        if (err.status === 403) {
          helpers.setFieldError("password", "incorrect password");
        }
      });
  };

  const { errors, handleSubmit, touched, values, handleChange } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <BaseForm
      onSubmit={(e: any) => handleSubmit(e)}
      submitBtnTitle="Submit"
      title="Signin"
    >
      <Input
        label="Email"
        id="email"
        name="email"
        type="email"
        value={values.email}
        handleChange={handleChange}
        error={touched.email && errors.email ? errors.email : ""}
      />
      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        value={values.password}
        handleChange={handleChange}
        error={touched.password && errors.password ? errors.password : ""}
      />
    </BaseForm>
  );
};

export default SigninForm;
