import { useState, useEffect, useRef } from "react";
import { Menu, Bell, User, LogOut, ArrowDownCircle, ArrowUpCircle, Send, Banknote, Mail } from "lucide-react";
import { IoPersonCircle, IoSettings } from "react-icons/io5";
import { useAppSelector, useAppDispatch } from "../features/Slices/hooks";
import { setLeftNav } from "../features/Slices/TopNavSlice";
import { useNavigate } from "react-router-dom";
import { ToggleDarkMode } from "./ContentPage/Others/ToggleDarkMode";
import { setLogInState } from "../features/Slices/MainSlice";

export default function TopNav() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Left_Nav_State = useAppSelector((state) => state.TopNav.Left_Nav_State);
  const LoginInfos = useAppSelector((state) => state.MainSlice.logininfos);
  const Notifications = useAppSelector((state: any) =>
    LoginInfos?.Type === "Client"
      ? state.ClientInfos.NonReadedNotifications
      : state.EPages.NonReadedNotifications
  );

  const [openDropdown, setOpenDropdown] = useState<"notifications" | "profile" | "settings" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function toggleLeftNav() {
    const state = Left_Nav_State === "open" ? "closed" : "open";
    dispatch(setLeftNav(state));
  }

  function toggleDropdown(type: "notifications" | "profile" | "settings") {
    setOpenDropdown((prev) => (prev === type ? null : type));
  }

  function handleLogout() {
    localStorage.removeItem("refreshtoken");
    dispatch(setLogInState({ Type: null, IsLoggedIn: false }));
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!LoginInfos) return null;

  return (
    <div className="dark:bg-gray-800 dark:border-gray-700 flex-shrink-0 h-[63px] bg-white dark:text-gray-100 sticky border-b-1 border-gray-200 top-0 flex items-center justify-between z-20 px-3">
      <button onClick={toggleLeftNav} className="text-2xl cursor-pointer hover:text-cyan-600 text-black dark:text-white rounded">
        <Menu size={35} />
      </button>

      <div className="flex flex-1 justify-end gap-3 items-center h-full relative" ref={dropdownRef}>
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("notifications")}
            className="p-2 hover:text-cyan-600 rounded-full cursor-pointer relative"
          >
            <Bell size={24} />
            {Notifications && Notifications.length > 0 && (
              <div className="absolute text-[11px] text-center rounded-full bg-red-500 top-0 right-[2px] w-5 h-5 flex items-center justify-center">
                <p className="text-white">{Notifications.length > 99 ? "99+" : Notifications.length}</p>
              </div>
            )}
          </button>

          {openDropdown === "notifications" && (
            <div className="absolute right-[-60px] top-[128%] bg-white dark:bg-gray-800 shadow-md rounded-lg w-47 sm:w-80 border border-gray-400 dark:border-gray-600 z-70">
              <div className="p-3 border-b dark:border-gray-600 font-semibold">Notifications</div>
              <div className="w-full overflow-y-auto custom-scrollbar max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-480px)]">
                {Notifications &&
                  Notifications.map((notif: any, index: number) => (
                    <div
                      key={index}
                      title={notif.notification}
                      className="p-3 text-sm flex gap-2 text-black dark:text-white"
                    >
                      {notif.type === "Withdraw" ? (
                        <div className="text-red-600"><ArrowDownCircle size={22} /></div>
                      ) : notif.type === "Deposite" ? (
                        <div className="text-green-600"><ArrowUpCircle size={22} /></div>
                      ) : notif.type === "Transfer Fund" ? (
                        <div className="text-cyan-600"><Send size={22} /></div>
                      ) : notif.type === "Message" ? (
                        <div className="text-gray-400"><Mail size={22} /></div>
                      ) : (
                        <div><Banknote size={22} /></div>
                      )}

                      <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-[210px] sm:max-w-[270px]">
                        {notif.notification}
                      </span>
                    </div>
                  ))}
                <div
                  onClick={() => navigate("Notifications")}
                  className="text-center text-sm xlg:text-lg text-teal-600 dark:text-teal-500 hover:underline cursor-pointer p-2"
                >
                  View all notifications
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("profile")}
            className="hover:text-cyan-600 cursor-pointer rounded-full p-1 flex items-center"
          >
            <IoPersonCircle size={34} />
          </button>

          {openDropdown === "profile" && (
            <div className="absolute p-1 border dark:border-gray-600 border-gray-400 right-0 top-[124%] bg-white dark:bg-gray-800 shadow-lg rounded-lg w-40">
              <button
                onClick={() => navigate(LoginInfos.Type === "Client" ? 'Account' : 'EmployeeProfileCard')}
                className="flex items-center cursor-pointer w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <User size={20} className="mr-2" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center cursor-pointer w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
              >
                <LogOut size={20} className="mr-2" />
                Log Out
              </button>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("settings")}
            className="hover:text-cyan-600 cursor-pointer rounded-full p-1 flex items-center"
          >
            <IoSettings size={29} />
          </button>

          {openDropdown === "settings" && (
            <div className="absolute p-1 border dark:border-gray-600 border-gray-400 right-0 top-[134%] bg-white dark:bg-gray-800 shadow-lg rounded-lg w-40">
              <ToggleDarkMode />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
