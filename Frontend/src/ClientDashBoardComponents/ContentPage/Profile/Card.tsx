export function Card(){
    return ( <div className="flex-1 h-full">
        <div className=" bg-cyan-400 w-[100%] text-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold">Bank Card</h2>
          <div className="flex flex-col gap-2 mt-3">
            <p className="text-md">Account Holder: abdellah</p>
            <p className="text-sm">Card Number: **** **** **** 1234</p>
            <p className="text-sm">Expiry Date: 12/25</p>
            <p className="text-sm">Balance: 133330 DA</p>
            <p className="text-sm">CVV: ***</p>
          </div>
        </div>
      </div>)
}