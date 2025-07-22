import { useState } from "react";
import { UpdateClientPersonalInfos } from "../../../features/Others/APIs";
import { useAppDispatch, useAppSelector } from "../../../features/Slices/hooks";
import { fetchClientInfo } from "../../../features/Slices/Client_Infos_Slice";
import { CircularProgress } from "@mui/material";
import { fetchClientsInfos, FetchEmployeeInfos, UpdateEmployeeInfos } from "../../../features/EmployeeFeatures/Others/APIs";
type EditClientInfosProps = {
  userData: any;
  onClose: () => void;
  onSave: (updatedUser: any) => void;
  title:string;
  from:string;
};

export function EditClientInfos({
  userData,
  onClose,
  title,
  from
}: EditClientInfosProps) {
  const [formData, setFormData] = useState(userData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUpdateResult, setShowUpdateResult] = useState<string|null>(null);
  const [showcircularprogress, setshowcircularprogress] = useState(false);
  //const [, setshowcircularprogress] = useState(false);
  const dispatch = useAppDispatch();
 const token=useAppSelector(state=>state.MainSlice.Token);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
 
    if (!formData.firstName?.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.birthDate?.trim()) newErrors.birthDate = "Birth date is required.";

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Only Gmail addresses are allowed.";
    }

    if (!formData.address?.trim()) newErrors.address = "Address is required.";
    if (!formData.phoneNumber?.trim()) newErrors.phoneNumber = "Phone number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setShowConfirmation(true);
    }
  };

  async function handleConfirmSave() {
    setshowcircularprogress(true);
    let status=null;
   
    if(from==="Client"){
    status = await UpdateClientPersonalInfos(formData,token);
await dispatch(fetchClientInfo());

    }
    else if(from==="Employee"){
    status= await UpdateEmployeeInfos(formData,token);
     await dispatch(FetchEmployeeInfos());
    }
    else if(from==="Employee Edit Client"){
      await UpdateClientPersonalInfos(formData,token);
       await dispatch(fetchClientsInfos());

  }
    if (status||status===null) {

      setShowConfirmation(false);
       setshowcircularprogress(false);
      setShowUpdateResult("success");

    } else if(status===false){
      setShowConfirmation(false);
       setshowcircularprogress(false);
        setShowUpdateResult("unsuccess");
    }
  }

  return (
      <div className=" w-full h-full flex-col flex  flex-1">
     <h2 className="text-2xl dark:text-gray-100 mb-4">{title}</h2>
    <div className="relative flex-1 shadow-lg  flex bg-white rounded-lg dark:bg-gray-800 dark:text-gray-100 h-full items-center py-7 justify-center">
 
      {/* ✅ Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white text-center dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Confirm changes?</h2>

            {/* 🆕 New Info Preview */}
            <div className="text-left text-sm max-h-52 overflow-y-auto mb-4">
              <p><strong>First Name:</strong> {formData.firstName}</p>
              <p><strong>Last Name:</strong> {formData.lastName}</p>
              <p><strong>Birth Date:</strong> {formData.birthDate}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Address:</strong> {formData.address}</p>
              <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-center text-white rounded"
              >
               {!showcircularprogress? "Confirm":< CircularProgress color="inherit" size={22}/>}
              </button>
            </div>
          </div>
        </div>
      )}

  {showUpdateResult && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white text-center dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
            <h2 className={`${showUpdateResult==="success"?`text-teal-700 dark:text-teal-500`:`dark:text-red-500 text-red-700`} text-lg  font-semibold mb-4`}>
              {showUpdateResult==="success"?"Informations where updated successfuly":"Update process failed"}
            </h2>

      
            <div className="flex justify-center gap-4">
          
              <button
             onClick={()=>setShowUpdateResult(null)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Form Content */}
        
      <div className="h-full dark:bg-gray-800 flex items-center flex-col justify-center w-[90%] sm:w-[65%]">
    

        {/* Input fields */}
        {[
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
          { name: "birthDate", label: "Birth Date", type: "date" },
          { name: "email", label: "Email", type: "email" },
          { name: "address", label: "Address" },
          { name: "phoneNumber", label: "Phone Number", type: "tel" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name} className="w-full mb-3">
            <label htmlFor={name} className="block mb-1 font-medium">{label}</label>
            <input
              type={type}
              className="w-full p-2 border rounded"
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
            {errors[name] && (
              <p className="text-red-500 text-sm">{errors[name]}</p>
            )}
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4 w-full">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
