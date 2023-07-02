import React from "react";

const AdminFooter = () => {
    return (
        <div className="bg-black flex flex-col items-center p-7 mb-auto">
            <h1 className="text-white font-semibold text-lg">
                Are you a looking to hire?
                <span className="hover:text-sky-400 hover:text-lg">
                    {" "}
                    Create a job opportunity!
                </span>{" "}
            </h1>
        </div>
    );
};

export default AdminFooter;
