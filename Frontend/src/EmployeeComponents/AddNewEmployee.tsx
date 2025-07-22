import { useState } from "react";
import { IAddNewEmployee } from "../features/EmployeeFeatures/Others/Interfaces";
import { ConfirmationCard, ConfirmInfos } from "../SharedComponents/ConfirmationCard";
import { ConfirmationResultCard, IConfirmationResultCard } from "../SharedComponents/ConfirmationResultCard";
import { AddNewEmployeeApi } from "../features/EmployeeFeatures/Others/APIs";
import { useAppSelector } from "../features/Slices/hooks";

export function AddNewEmployee() {
  const [confirmation, setconfirmation] = useState(false);
  const [confirmresult, setconfirmresult] = useState(false);
  const [showcircularprogress, setshowcircularprogress] = useState(false);
  const [error, seterror] = useState(false);
  const token=useAppSelector(state=>state.MainSlice.Token);
  const confirminfo: ConfirmInfos = {
    onclose: () => setconfirmation(false),
    onconfirm: () => handleSubmit(),
    title: null,
    body: null,
    showcircularprogress,
  };

  const confirmationresult: IConfirmationResultCard = {
    onclose: () => setconfirmresult(false),
    message: "Employee was added successfully",
    messagestate: error,
  };

  const [formData, setFormData] = useState<IAddNewEmployee>({
    person: {
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      address: "",
      phoneNumber: "",
    },
    employee: {
      salary: "",
      typeId: 1,
    },
    employeeAccount: {
      account: "",
      password: "",
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    section: "person" | "employeeAccount" | "employee",
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: field === "salary" || field === "typeId" ? Number(value) : value,
      },
    }));

    const key = `${section}.${field}`;
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const { person, employee, employeeAccount } = formData;

    if (!person.firstName.trim()) newErrors["person.firstName"] = "First name is required.";
    if (!person.lastName.trim()) newErrors["person.lastName"] = "Last name is required.";
    if (!person.birthDate.trim()) newErrors["person.birthDate"] = "Birthdate is required.";
    if (!person.email.trim()) newErrors["person.email"] = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(person.email)) newErrors["person.email"] = "Invalid email format.";
    if (!person.address.trim()) newErrors["person.address"] = "Address is required.";
    if (!person.phoneNumber.trim()) newErrors["person.phoneNumber"] = "Phone number is required.";
    //if (!employeeAccount.account.trim()) newErrors["employeeAccount.account"] = "Account is required.";
    if (!employeeAccount.password.trim()) newErrors["employeeAccount.password"] = "Password is required.";
    if (Number(employee.salary) < 30000 || Number(employee.salary) > 1000000)
      newErrors["employee.salary"] = "Invalid salary.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function checkerror() {
    if (validate()) setconfirmation(true);
  }

  async function handleSubmit() {
    setshowcircularprogress(true);

    if (!validate()) {
      seterror(true);
      setshowcircularprogress(false);
      return;
    }

    const payload = {
      ...formData,
      person: {
        ...formData.person,
        birthDate: formData.person.birthDate,
      },
      employeeAccount:{
        ...formData.employeeAccount,
        account: formData.person.firstName+"."+formData.person.lastName+"@Nova.com"
      }
    };

    const result = await AddNewEmployeeApi(payload,token);
    seterror(!result);
    setshowcircularprogress(false);
    setconfirmation(false);
    setconfirmresult(true);
  }

  const renderError = (field: string) =>
    errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>;

  return (
    <div className="h-full flex-1">
      <h2 className="text-2xl mb-3 dark:text-gray-100">Employees/Add New Employee</h2>
      <div className="w-full shadow-lg p-4 flex items-center flex-col bg-white dark:bg-gray-800 space-y-4 dark:text-gray-100">
        {/* Form fields */}
        <div className="w-full">
          <input
            type="text"
            placeholder="First Name"
            value={formData.person.firstName}
            onChange={(e) => handleChange("person", "firstName", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("person.firstName")}
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Last Name"
            value={formData.person.lastName}
            onChange={(e) => handleChange("person", "lastName", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("person.lastName")}
        </div>

        <div className="w-full">
          <input
            type="date"
            placeholder="Birth Date"
            value={formData.person.birthDate}
            onChange={(e) => handleChange("person", "birthDate", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("person.birthDate")}
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Email"
            value={formData.person.email}
            onChange={(e) => handleChange("person", "email", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("person.email")}
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Address"
            value={formData.person.address}
            onChange={(e) => handleChange("person", "address", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("person.address")}
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.person.phoneNumber}
            onChange={(e) => handleChange("person", "phoneNumber", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("person.phoneNumber")}
        </div>

        <div className="w-full">
          <input
            type="number"
            placeholder="Salary"
            value={formData.employee.salary}
            onChange={(e) => handleChange("employee", "salary", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("employee.salary")}
        </div>

        {/* New select for employee type */}
        <div className="w-full">
          <select
            value={formData.employee.typeId}
            onChange={(e) => handleChange("employee", "typeId", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded bg-white dark:bg-gray-700"
          >
            <option value={1}>Admin</option>
              <option value={1}>Cashier</option>
          
          </select>
        </div>

       
        <div className="w-full">
          <input
            type="password"
            placeholder="Password"
            value={formData.employeeAccount.password}
            onChange={(e) => handleChange("employeeAccount", "password", e.target.value)}
            className="w-full p-2 dark:border-gray-300 border rounded"
          />
          {renderError("employeeAccount.password")}
        </div>

        <button
          onClick={checkerror}
          className="mt-1 sm:w-[20%] lg:w-[12%] bg-teal-500 hover:bg-teal-600 text-white font-semibold p-2 rounded"
        >
          Submit
        </button>
      </div>

      {confirmation && <ConfirmationCard info={confirminfo} />}
      {confirmresult && <ConfirmationResultCard infos={confirmationresult} />}
    </div>
  );
}
