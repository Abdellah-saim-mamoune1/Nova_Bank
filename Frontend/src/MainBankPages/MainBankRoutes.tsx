
import { Routes, Route } from 'react-router-dom';
import { About } from "./About";
import { Home } from "./Home";

import { NavBar } from './NavBar';
import { LoginPage } from './LoginForm';
import { Navigate } from 'react-router-dom';
export  function MainBankRoutes() {
  return (
    <div className="w-full bg-gray-100  h-full flex flex-row">
     <div className="w-full   h-full overflow-y-auto flex flex-col">
        <NavBar />
       <div className="flex-1 ">
             <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
               
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/" />} /> {/* fallback to Home */}
              </Routes>

          </div>
        </div>
        </div>
   
  );
}
