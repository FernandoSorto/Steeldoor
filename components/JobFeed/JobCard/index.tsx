import React from "react";
import { JobCardProps } from "./types";

const JobCard = ({ job, adminView, editJob, deleteJob, viewJob, applyForJob }: JobCardProps) => {
    return (
        <div className="flex flex-col w-full p-4 mb-8 bg-white rounded-md shadow-lg hover:shadow-xl">
            <h1 className="text-2xl font-extrabold mb-4">{job.title}</h1>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <div className="flex items-center mb-4">
                <span className="mr-2 text-violet-500 font-semibold">Location:</span>
                <span className="text-gray-700">{job.location}</span>
            </div>
            <div className="flex items-center mb-4">
                <span className="mr-2 text-violet-500 font-semibold">Salary Range:</span>
                <span className="text-gray-700">
                    ${job.salaryBottom} - ${job.salaryRoof}
                </span>
            </div>
            {adminView ? (
                <div className="flex justify-end">
                    <button
                        onClick={viewJob}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        View
                    </button>
                    <button
                        onClick={editJob}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={deleteJob}
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <div className="flex justify-end">
                    <button
                        onClick={applyForJob}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
};

export default JobCard;
