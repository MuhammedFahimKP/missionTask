import React from "react";
import Input from "@/components/Input";

interface Props {
  showModal: boolean;
  handleModalDismiss: () => void;
}

const RegisterModal: React.FC<Props> = (props) => {
  const { showModal, handleModalDismiss } = props;

  const onClick = (e: MouseEvent) => {
    if ((e.target as HTMLDivElement).id !== "modal") return;

    handleModalDismiss();
  };

  if (showModal === false) return;

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
          <div className="relative bg-zinc-800 rounded-lg shadow ">
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
              <Input id="email" label="Email" name="email" type="email" />
              <Input id="name" label="Name" name="name" type="text" />

              <Input
                id="password"
                label="Password"
                name="password"
                type="password"
              />

              <select
                id="countries"
                className="bg-zinc-800 border text-gray-100 text-sm rounded-lg  block w-full p-2.5  appearance-none"
              >
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>

              <button
                type="submit"
                className="flex w-full mb-5  justify-center rounded-md bg-zinc-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm"
              >
                Register
              </button>
            </div>
            {/* Modal footer */}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
