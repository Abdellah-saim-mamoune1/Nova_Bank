import React, { useState } from "react";

// Define the Field interface for field properties
interface Field {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  errorMessage: string;
  required?: boolean;
}

// Define the FormProps interface for the form props
interface FormProps {
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
  onCancel: () => void;
  errors: Record<string, string>;
}

const ReusableForm = ({ fields, onSubmit, onCancel, errors }: FormProps) => {
  // Define the formData state with Record<string, string> to handle dynamic keys
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {} as Record<string, string>)
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full space-y-3  p-6">
      <div className="space-y-3">
        {/* Loop through fields and render inputs */}
        {fields.map((field) => (
          <div key={field.name} className="flex  flex-col">
            <label htmlFor={field.name} className="text-sm dark:text-gray-100 font-medium text-gray-700">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleInputChange}
              className={`p-2  border border-gray-700 dark:border-gray-100 rounded-md ${errors[field.name] ? "border-red-500" : ""}`}
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <span className="text-sm text-red-500">{errors[field.name]}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => onSubmit(formData)}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition"
        >
          Submit
        </button>
        <button
          onClick={onCancel}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReusableForm;
