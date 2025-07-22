import { useState } from "react";
import { Typography, Divider } from "@mui/material";
import { AddGetHelpRequist } from "../../../features/Others/ClientInterfaces";
import { AddNewGetHelpRequist } from "../../../features/Others/APIs";
import { useAppSelector } from "../../../features/Slices/hooks";

interface FormData {
  subject: string;
  message: string;
}

export function GetHelp() {
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [showConfirmationCard, setShowConfirmationCard] = useState(false);
  const token=useAppSelector(s=>s.MainSlice.Token);
  const AccountId = useAppSelector(
    (state) => state.ClientInfos.client_informations?.accountInfo.accountId
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "message" && value.length > 400) return;
    if (name === "subject" && value.length > 30) return;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate() || AccountId == null) return;
    setShowConfirmationCard(true);
  };

  const handleConfirm = () => {
    setShowConfirmationCard(false);

    if (AccountId != null) {
      const requist: AddGetHelpRequist = {
        title: formData.subject,
        body: formData.message,
        accountId: AccountId,
        type:4
      };
      AddNewGetHelpRequist(requist,token);
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 4000);
    }

  };

  return (
    <div className="flex  flex-1 flex-col items-center justify-center h-full">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 flex items-center justify-center flex-col p-6 w-full shadow-lg rounded-lg">
        <div className="w-[95%] sm:w-[60%]">
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Get Help
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
            If you have any questions, concerns, or need assistance, please fill out the form below.
            Our support team will get back to you as soon as possible.
          </Typography>
          <Divider sx={{ mb: 3 }} />

        </div>

        <form onSubmit={handleSubmit} className="flex w-[95%] sm:w-[60%] flex-col gap-3">
          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full p-2 border dark:border-gray-100 border-gray-700 rounded"
              required
            />
            <div className="flex justify-between text-sm mt-1">
              <span className={formData.subject.length >= 30 ? "text-red-500" : ""}>
                {formData.subject.length}/30
              </span>
              {formData.subject.length >= 30 && (
                <span className="text-red-500">You reached your subject limit</span>
              )}
            </div>
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={4}
              className="w-full p-2 border dark:border-gray-100 border-gray-700 rounded"
              required
            />
            <div className="flex justify-between text-sm mt-1">
              <span className={formData.message.length >= 400 ? "text-red-500" : ""}>
                {formData.message.length}/400
              </span>
              {formData.message.length >= 400 && (
                <span className="text-red-500">You reached your message limit</span>
              )}
            </div>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 max-w-50 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

      {/* Notification Toast */}
      {notificationVisible && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white px-6 py-4 rounded-xl shadow-2xl z-[9999] transition-all ease-in-out animate-slide-down flex items-start gap-3 max-w-[90%] sm:max-w-md">
          <div>
            <p className="font-semibold">Your request has been sent successfully!</p>
          </div>
        </div>
      )}

      {/* Confirmation Card */}
      {showConfirmationCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
              Confirm Your Request
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <div className="mb-4">
              <p><strong>Subject:</strong> {formData.subject}</p>
              <p className="whitespace-pre-line break-words mt-2">
                <strong>Message:</strong> {formData.message}
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowConfirmationCard(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
