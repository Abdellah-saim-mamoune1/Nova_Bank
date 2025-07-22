import { fetchClientsInfos } from "../features/EmployeeFeatures/Others/APIs";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../features/Slices/hooks";
import { LoadingCircle } from "../SharedComponents/LoadingCircle";
import { setManagedClientsInfos } from "../features/EmployeeFeatures/Slices/PagesSlice";
import { ManagedClientInfos } from "./ManagedClientInfos";
import { returnto } from "../features/EmployeeFeatures/Others/Interfaces";
export function AllClientsInformations() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [ShowManagedClientScreen, setShowManagedClientScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState<"phoneNumber"|"firstName" | "lastName">("firstName");
  const AllClients = useAppSelector(state => state.EPages.GetAllClientsInfos);
const onreturn:returnto={
onreturn:()=>{setShowManagedClientScreen(false)},
}
  useEffect(() => {
    dispatch(fetchClientsInfos());
  }, []);

  if (!AllClients) return <LoadingCircle />;

  // Filtering logic
  const filteredClients = AllClients.filter(client => {
    const fieldValue = String(client[searchField]).toLowerCase();
    return fieldValue.includes(searchTerm.toLowerCase());
  });

  // Pagination
  const rowsPerPage = 5;
  const totalpages = Math.ceil(filteredClients.length / rowsPerPage);

  const handleChangePage = (direction: "prev" | "next") => {
    if (direction === "prev" && page > 0) setPage(page - 1);
    if (direction === "next" && (page + 1) * rowsPerPage < filteredClients.length) setPage(page + 1);
  };

  const paginatedData = filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

if(ShowManagedClientScreen)
  return <ManagedClientInfos returnaction={onreturn}/>


  return (
    <div className="w-full h-full flex flex-col justify-start bg-gray-100 dark:bg-gray-900">
      <h1 className="text-gray-900 text-2xl mb-3 dark:text-gray-200">Manage Clients</h1>

   

      {/* 🧾 Table */}
      <div className="bg-white p-3 shadow-xl dark:bg-gray-800 rounded-lg">
       
             {/* 🔍 Search Filter */}
      <div className="flex  flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder={`Search by ${searchField}`}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white"
        />
        <select
          value={searchField}
          onChange={(e) => {
            setSearchField(e.target.value as "phoneNumber"|"firstName" | "lastName");
            setPage(0);
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white"
        >
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="phoneNumber">Phone Number</option>
        
        </select>
      </div>
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
                    <button onClick={()=>{dispatch(setManagedClientsInfos(tx)),setShowManagedClientScreen(true)}} className="text-white cursor-pointer rounded-lg bg-teal-500 p-2">Manage</button>
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
            disabled={(page + 1) * rowsPerPage >= filteredClients.length}
            className="px-4 py-1 cursor-pointer dark:text-black bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
