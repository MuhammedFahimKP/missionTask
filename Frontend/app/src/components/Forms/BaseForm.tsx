import React, { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  submitBtnTitle: string;
  onSubmit: (event?: SubmitEvent) => void;
}

const BaseForm: React.FC<Props> = (props) => {
  const { children, title, submitBtnTitle, onSubmit } = props;

  const handleSubmition = (e: SubmitEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="flex min-h-[100vh] flex-col bg-black justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-100">
          {title}
        </h2>
      </div>
      <div className="mt-10 bg-zinc-900 px-8 py-10 rounded-lg sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={(e: any) => handleSubmition(e)}
        >
          {children}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-zinc-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm"
            >
              {submitBtnTitle}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BaseForm;
