import React from "react";

function Card({item}:any) {
    return(
        
    <div className="container"> 
    
    <div className="row justify-content-center">
        {item.map((val:any) => (
            <div>
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div>
                        <h5 className="card-title">{val.term}</h5>
                        <p className="card-text">{val.description}</p>
                        <p className="card-text">{val.department}</p>
                    </div>
                </div>
            </div>
        )
        )}
        </div>
    </div>
    )
}

export default Card;