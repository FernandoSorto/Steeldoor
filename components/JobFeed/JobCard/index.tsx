import React from "react";
import { JobCardProps } from "./types";

const JobCard = ({ job, adminView, editJob, deleteJob, viewJob, applyforJob }: JobCardProps) => {
    return (
        <div className="flex m-10 flex-col h-50 w-1/3 p-4 items-center bg-white border border-gray-200 rounded-md shadow-lg hover:bg-gray-100">
            <h1 className="text-xl font-extrabold">{job.title}</h1>
            <p>
                <span className="text-violet-500 font-semibold">Description: </span>
                {job.description}
            </p>

            <p>
                <span className="text-violet-500 font-semibold">Location: </span>
                {job.location}
            </p>
            <p>
                <span className="text-violet-500 font-semibold">Salary Range: </span> $
                {job.salaryBottom} - ${job.salaryRoof}
            </p>
            {adminView ? (
                <div className=" flex p-5 w-full">
                    <button className="bg-green-500 mr-10 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        View
                    </button>
                    <button
                        onClick={editJob}
                        className="bg-blue-500 mr-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={deleteJob}
                        className="bg-red-500 mr-10 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <div className=" flex p-5 w-full">
                    <button
                        onClick={applyforJob}
                        className="bg-blue-500 mr-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobCard;
