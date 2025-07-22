import React, { useState,useEffect } from 'react';
import { useAppSelector,useAppDispatch } from '../features/Slices/hooks';
import { Link, useLocation } from 'react-router-dom';
import { fetchClientInfo } from '../features/Slices/Client_Infos_Slice';
import {
  Home,
  Users,
  History,
  ReceiptText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Dot
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Home,
  Users,
  History,
  ReceiptText,
  HelpCircle
};

 
const A: React.FC = () => {
 

  const Left_Nav_State = useAppSelector((state) => state.TopNav.Left_Nav_State);
  const menuItems = useAppSelector((state) => state.LeftNav.NavItems);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: number]: boolean }>({});
  const location = useLocation();
  const dispatch=useAppDispatch();
  const toggleSublist = (index: number) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

useEffect(() => {
   
     dispatch(fetchClientInfo());
    
  }, []);
  
 
  if (Left_Nav_State !== 'open') return null;
  return (
    <div className="flex flex-col overflow-y-auto dark:bg-gray-800 dark:border-gray-800 bg-white bg-black/50 border-r border-gray-200 absolute w-[70%] z-15 lg:relative sm:w-[30%] lg:w-[21%] h-screen shadow-sm">
   
      <Link
        to="/"
        className="text-2xl h-[63.2px] dark:border-gray-600 dark:text-cyan-300 text-cyan-900 font-bold text-center py-3 border-b border-gray-200"
      >
        Nova
      </Link>

      <nav className="flex flex-col w-full items-center gap-1 flex-1 mt-4">
        {menuItems.map((item, index) => {
          const isOpen = openSubmenus[index];
          const isMainActive = location.pathname === item.onelinke;
          const isAnySubActive = item.sublist?.some((sub) => sub.link === location.pathname);
          const IconComponent = iconMap[item.icon];

          return (
            <div key={index} className="flex rounded-lg w-[87%] flex-col">
              {item.onelinke ? (
                <Link
                  to={item.onelinke}
                  className={`flex items-center justify-between rounded-lg gap-3 p-3 px-4 transition-all text-left cursor-pointer
                    ${isMainActive || isAnySubActive
                      ? 'bg-cyan-100 dark:bg-cyan-800 text-cyan-900 dark:text-cyan-100 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-700'}
                  `}
                >
                  <div className="flex gap-3 items-center">
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    {item.name}
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => toggleSublist(index)}
                  className={`flex items-center justify-between rounded-lg gap-3 p-3 px-4 transition-all text-left cursor-pointer
                    ${isAnySubActive
                      ? 'bg-cyan-100 dark:bg-cyan-800 text-cyan-900 dark:text-cyan-100 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-700'}
                  `}
                >
                  <div className="flex gap-3 items-center">
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    {item.name}
                  </div>
                  <div className="ml-auto">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>
              )}

              {item.sublist && isOpen &&
                item.sublist.map((subItem, subIndex) => {
                  const isSubActive = location.pathname === subItem.link;

                  return (
                    <div className="ml-10 mt-1 flex flex-col text-sm" key={subIndex}>
                      <Link
                        to={subItem.link}
                        className={`py-2 px-2 flex items-center gap-1 transition-all rounded
                          ${isSubActive
                            ? 'bg-cyan-200 dark:bg-cyan-700 text-cyan-900 dark:text-cyan-100 font-semibold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-700'}
                        `}
                      >
                        <Dot className="w-4 h-4" />
                        {subItem.name}
                      </Link>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default A;
