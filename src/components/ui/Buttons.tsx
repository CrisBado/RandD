import React from "react";
import Data from "@/app/Data";


function Button({myDepartment, filterDepartment, setItems}:any) {
    return( 
        <div className="d-flex justify-content-center">
{
    myDepartment.map((val:any) => (
   
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() =>{
            filterDepartment(val)
        }
        }>
    
        {val}</button>
    ))
}

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
onClick={() =>
   setItems(Data)}>
    All</button>
    </div>
    )

    }


export default Button;


        