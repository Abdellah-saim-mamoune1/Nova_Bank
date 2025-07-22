import { CircularProgress } from "@mui/material";

export interface ConfirmInfos{
onclose:()=>void,
onconfirm:()=>void,
title:string|null,
body:string|null,
showcircularprogress:boolean

}
export function ConfirmationCard({info}:{info:ConfirmInfos}){
    return(
        
                <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-50">
                        <div className="bg-white text-center dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
                        
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{info.title?info.title:"Are you sure?"}</p>
                    {info.body&&<p>{info.body}</p>}
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={info.onclose}
                        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={info.onconfirm}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded flex items-center justify-center"
                      >
                      {!info.showcircularprogress ? "Confirm" : <CircularProgress color="inherit" size={22} />}
                      </button>
                    </div>
                  </div>
                </div>
        
      
    );
}