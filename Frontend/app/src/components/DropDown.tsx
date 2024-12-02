import React, { useState } from "react";

interface Props {
  filterFields: string[];
  setFilterFields: (value: string) => void;
  selectedItems: string[];
}

const DropDown: React.FC<Props> = (props) => {
  const { filterFields, setFilterFields, selectedItems } = props;

  const [showDropDown, setShowDropDown] = useState(false);

  const handleDropDown = () => setShowDropDown(!showDropDown);

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => {
          showDropDown && setShowDropDown(false);
        }}
      >
        <button
          onClick={() => handleDropDown()}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm "
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Departments
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showDropDown && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-zinc-800 shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <ul
              className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownCheckboxButton"
            >
              {filterFields.map((field) => (
                <li>
                  <div
                    onClick={() => setFilterFields(field)}
                    className="flex items-center"
                  >
                    <input
                      id={`checkbox-item-${field}`}
                      type="checkbox"
                      checked={selectedItems.includes(field)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="checkbox-item-1"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {field}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
