import { useEffect, useState } from "react";
import { LoadingCircle } from "../../SharedComponents/LoadingCircle";
import { ManagedEmployeeInfos } from "./ManagedEmployeeInfos";
import { setManagedEmployeeInfos } from "../../features/EmployeeFeatures/Slices/PagesSlice";
import { returnto } from "../../features/EmployeeFeatures/Others/Interfaces";
import { useAppDispatch,useAppSelector } from "../../features/Slices/hooks";
import { FetchAllEmployeesInfos } from "../../features/EmployeeFeatures/Others/APIs";
export function ManageEmployees() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [ShowManagedClientScreen, setShowManagedClientScreen] = useState(false);
  const employeeId=useAppSelector(state=>state.EPages.EmployeeInfos?.accountInfo.accountId);
  const AllEmployees = useAppSelector(state => state.EPages.EmployeesInfos);
  const onreturn:returnto={
onreturn:()=>{setShowManagedClientScreen(false)},
}
  useEffect(() => {
    dispatch(FetchAllEmployeesInfos());
  }, []);

  if (!AllEmployees) return <LoadingCircle />;

  const rowsPerPage = 5;
  const totalpages = Math.ceil(AllEmployees.length / rowsPerPage);

  const handleChangePage = (direction: "prev" | "next") => {
    if (direction === "prev" && page > 0) setPage(page - 1);
    if (direction === "next" && (page + 1) * rowsPerPage < AllEmployees.length) setPage(page + 1);
  };

  const paginatedData = AllEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

if(ShowManagedClientScreen)
 return <ManagedEmployeeInfos returnaction={onreturn}/>


  return (
    <div className="w-full h-full flex flex-col justify-start bg-gray-100 dark:bg-gray-900">
      <h1 className="text-gray-900 text-2xl mb-3 dark:text-gray-200">Manage Employees</h1>

      {/* 🧾 Table */}
      <div className="bg-white p-3 shadow-xl dark:bg-gray-800 rounded-lg">
       
             {/* 🔍 Search Filter */}
     
      <div className="overflow-x-auto">
          <table className="min-w-full  text-sm border-1 border-gray-300 dark:border-gray-600 sm:text-[15px] text-left">
            <thead className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-blue-400 uppercase tracking-wide text-xs sm:text-sm">
              <tr className=" border-b border-gray-300 dark:border-gray-600">
             
                <th className="px-6 py-4">First Name</th>
                <th className="px-6 py-4">Last Name</th>
                <th className="px-6 py-4">Birth Date</th>
                <th className="px-6 py-4">Phone Number</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-gray-700 dark:text-gray-200 font-semibold">
                  <td className="px-6 py-4">{tx.firstName}</td>
                  <td className="px-6 py-4">{tx.lastName}</td>
                  <td className="px-6 py-4">{new Date(tx.birthDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">{tx.phoneNumber}</td>
                  <td className="px-6 py-4">
                   {tx.accountInfo.accountId!==employeeId&&<button onClick={()=>{dispatch(setManagedEmployeeInfos(tx)),setShowManagedClientScreen(true)}} className="text-white cursor-pointer rounded-lg bg-teal-500 p-2">Manage</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📄 Pagination */}
        <div className="w-full dark:border-gray-700 flex pb-2 justify-center pt-5 items-end">
          <button
            onClick={() => handleChangePage("prev")}
            disabled={page === 0}
            className="px-4 py-1 cursor-pointer dark:text-black bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <p className="px-2 text-lg dark:text-gray-200">
            {page + 1}/{totalpages}
          </p>
          <button
            onClick={() => handleChangePage("next")}
            disabled={(page + 1) * rowsPerPage >= AllEmployees.length}
            className="px-4 py-1 cursor-pointer dark:text-black bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
