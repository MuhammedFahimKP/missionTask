import React from "react";
import BaseForm from "./BaseForm";
import Input from "@/components/Input";

const SigninForm: React.FC = () => {
  return (
    <BaseForm
      onSubmit={() => console.log("haoi")}
      submitBtnTitle="Submit"
      title="Signin"
    >
      <Input label="Email" id="email" name="email" type="email" />
      <Input label="Password" id="password" name="password" type="password" />
    </BaseForm>
  );
};

export default SigninForm;
