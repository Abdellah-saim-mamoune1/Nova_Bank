export interface IConfirmationResultCard{
    onclose:()=>void,
    message:string,
    messagestate:boolean|null
}
export function ConfirmationResultCard({infos}:{infos:IConfirmationResultCard|null}){

  if(!infos)
    return
return(
     <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white text-center dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
                
            {infos.messagestate&&<p className="text-lg font-semibold text-red-700 dark:text-red-600 mb-4">
               Something Went Wrong
             </p>}
            {!infos.messagestate&&<p className="text-lg font-semibold text-green-700 dark:text-green-600 mb-4">{infos.message}</p>}
            <div className="flex justify-center gap-4">
              <button
                onClick={infos.onclose}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-500 text-white rounded"
              >
               Close
              </button>
             
            </div>
          </div>
        </div>
)


}