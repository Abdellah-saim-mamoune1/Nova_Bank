import React, { JSX } from 'react';

type ChildProps = {
  Content: JSX.Element;
};

const SideNav: React.FC<ChildProps> = ({Content}) => {
 

  return (
    <div className="flex flex-col dark:bg-gray-800 dark:border-gray-800 bg-white bg-black/50 border-r border-gray-200 absolute w-[70%] z-15 sm:relative sm:w-[30%] lg:w-[21%] h-screen shadow-sm">
    {Content}
    </div>
  );
};

export default SideNav;
