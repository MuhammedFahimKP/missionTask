import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useData, usePaginatedData } from "@/hooks";

import toast, { Toaster } from "react-hot-toast";

import RegisterModal from "@/components/Forms/RegisterModal";
import WithSuperUserAuth from "@/routes/WithSuperUserAuth";
import EmployeeRow from "@/components/Employee/EmployeeRow";
import DelayComponent from "@/components/DelayComponent";
import NoData from "@/components/NoData";
import DropDown from "@/components/DropDown";

import type { ListUsers, DepartmentResponse } from "@/types";

import { getAllSearchParams } from "@/utils";

const Empolyee = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalDissmiss = () => setShowModal(!showModal);

  const [filterFields, setFilterFields] = useState<string[]>([]);

  const [searchParams, setSearchFilterParams] = useSearchParams();

  const [refresh, setRefresh] = useState(false);

  const { data, next, prev, currentPage, pages } = usePaginatedData<ListUsers>(
    "employee/",
    2,
    0,
    {
      params: getAllSearchParams(searchParams),
    },
    [searchParams, refresh]
  );
  const { data: department } = useData<DepartmentResponse>("department/");

  const handleTheUpdate = () => {
    setRefresh(!refresh);
    setShowModal(false);
    toast.success("success Employee Added");
  };

  useEffect(() => {
    department.forEach(({ name }) => {
      setFilterFields((prev) => {
        const newArray = [...prev];

        if (!prev.includes(name)) {
          newArray.push(name);
        }
        return newArray;
      });
    });
  }, [department]);

  const handleSearchParams = (value: string) => {
    const key = "dept";

    if (searchParams.getAll(key).includes(value)) {
      setSearchFilterParams((prev: URLSearchParams) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete(key, value);

        return newParams;
      });

      return;
    }

    setSearchFilterParams((prev: URLSearchParams) => {
      const newParams = new URLSearchParams(prev);
      newParams.append(key, value);
      return newParams;
    });
  };

  return (
    <main className="min-h-[100vh] bg-zinc-950 m-0 relative">
      <div className="p-4  block sm:flex items-center justify-between  border-b border-gray-100">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb"></nav>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-100">
              All Employee
            </h1>
          </div>
          <div className="sm:flex">
            <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0"></div>
            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
              <DropDown
                filterFields={filterFields}
                selectedItems={searchParams.getAll("dept")}
                setFilterFields={handleSearchParams}
              />

              <button
                onClick={() => handleModalDissmiss()}
                type="button"
                className="flex w-full justify-center gap-x-1.5 rounded-md bg-zinc-800 px-6 py-2 text-sm font-semibold text-gray-100 shadow-sm "
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Add
              </button>
              <button
                onClick={() => handleModalDissmiss()}
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm "
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                Form
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-zinc-950">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-100 uppercase"
                    >
                      Id
                    </th>

                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-100 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-100 uppercase"
                    >
                      Department
                    </th>
                    {/* <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                     
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Status
                    </th> */}
                    <th scope="col" className="p-4"></th>
                  </tr>
                </thead>
                <tbody className="">
                  {data?.map(({ id, name, dept, email }) => (
                    <EmployeeRow
                      id={id}
                      dept={dept}
                      email={email}
                      name={name}
                      key={id.toString() + email}
                    />
                  ))}

                  {data.length == 0 && (
                    <DelayComponent delay={2000}>
                      <NoData />
                    </DelayComponent>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-950 sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <span className="text-sm font-normal text-gray-100">
            Showing{" "}
            <span className="text-gray-100 font-semibold">{currentPage}</span>{" "}
            of <span className="text-gray-100 font-semibold">{pages}</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={prev}
            className="flex w-full justify-center gap-x-1.5 rounded-md bg-zinc-800 px-6 py-2 text-sm font-semibold text-gray-100 shadow-sm "

            // className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
          >
            <svg
              className="-ml-1 mr-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </button>
          <button
            onClick={next}
            className="flex w-full justify-center gap-x-1.5 rounded-md bg-zinc-800 px-6 py-2 text-sm font-semibold text-gray-100 shadow-sm"
            // className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
          >
            Next
            <svg
              className="-mr-1 ml-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <RegisterModal
        showModal={showModal}
        handleModalDismiss={handleModalDissmiss}
        handleSuccess={handleTheUpdate}
      />
      <Toaster position="top-right" />
    </main>
  );
};

export default WithSuperUserAuth(Empolyee);
