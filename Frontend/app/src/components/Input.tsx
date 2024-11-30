import React from "react";
interface Props {
  id: string;
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
}

const Input: React.FC<Props> = (props) => {
  const { id, name, type, label } = props;

  return (
    <div>
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-100">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          id={id}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-200 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
};

export default Input;
