import React, { type ChangeEvent } from "react";
interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  type: React.HTMLInputTypeAttribute;
  handleChange: (e: ChangeEvent) => void;
  error?: string;
}

const Input: React.FC<Props> = (props) => {
  const { id, name, type, label, error, value, handleChange } = props;

  return (
    <div>
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-100">
        {label}
      </label>
      <div className="mt-2">
        <input
          onChange={(e: any) => handleChange(e)}
          type={type}
          name={name}
          value={value}
          id={id}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-zinc-950 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6"
        />

        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
