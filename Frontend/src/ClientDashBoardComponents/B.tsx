import React, { useState } from 'react';
import { useAppSelector } from '../features/Slices/hooks';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../features/Slices/hooks';
import { FetchEmployeeInfos } from '../features/EmployeeFeatures/Others/APIs';
import {
  Home,
  Users,
  History,
  User,
  ChevronDown,
  ChevronUp,
  Dot,
  Send,
  BadgeCheck,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Home,
  Users,
  History,
  User,
  Send,
  BadgeCheck,
};

const B: React.FC = () => {
  const Left_Nav_State = useAppSelector((state) => state.TopNav.Left_Nav_State);
  let menuItems = useAppSelector((state) => state.ELeftNav.NavItems);
  const EmployeeType= useAppSelector((state) => state.EPages.EmployeeInfos?.type);


  const [openSubmenus, setOpenSubmenus] = useState<{ [key: number]: boolean }>({});
  const location = useLocation();
  const dispatch=useAppDispatch();
if(!menuItems||menuItems===undefined)
    return <></>


 if(EmployeeType&&EmployeeType==="Cashier")
    menuItems=menuItems.filter(a=>a.name!=="Clients","Employees");


  const toggleSublist = (index: number) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };


useEffect(() => {
   
     dispatch(FetchEmployeeInfos());
    
  }, []);

  
  if (Left_Nav_State !== 'open') return null;
  return (
    <div className="flex  overflow-y-auto flex-col dark:bg-gray-800 dark:border-gray-800 bg-white bg-black/50 border-r border-gray-200 absolute w-[70%] z-15 sm:relative sm:w-[30%] lg:w-[21%] h-screen shadow-sm">
   
    
      <Link
        to="/"
        className="text-2xl h-[63.2px] dark:border-gray-500 dark:text-teal-300 text-teal-900 font-bold text-center py-3 border-b border-b-1 border-gray-200"
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
                  className={`flex items-center justify-between rounded-lg dark:text-gray-100 dark:hover:bg-teal-600 gap-3 p-3 px-4 text-left cursor-pointer transition-all relative
                    ${isMainActive || isAnySubActive ? 'bg-teal-200 dark:bg-teal-700 text-teal-800 font-semibold' : 'hover:bg-teal-100 text-gray-700'}
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
                  className={`flex items-center justify-between rounded-lg dark:hover:bg-teal-600 dark:text-gray-100 gap-3 p-3 px-4 text-left cursor-pointer transition-all relative 
                    ${isAnySubActive ? 'bg-teal-200 dark:bg-teal-700 text-teal-800 font-semibold' : 'text-gray-700 hover:bg-teal-100'}
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
                        className={`py-2 flex dark:hover:bg-teal-600 dark:text-gray-100 text-start cursor-pointer transition-all rounded
                          ${isSubActive ? 'bg-teal-300 dark:bg-teal-700 text-teal-800 font-semibold' : 'hover:bg-teal-100 text-gray-700'}
                        `}
                      >
                        <Dot className="mr-1" />
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

export default B;
