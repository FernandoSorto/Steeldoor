import { Job } from "@/components/JobFeed/types";
import React from "react";

const JobCard = ({ job }: { job: Job }) => {
    return (
        <div className="flex flex-col shrink-0  w-200 h-100 flex-wrap items-center p-6  bg-white border border-gray-200 rounded-md shadow-lg hover:bg-gray-100">
            <h1 className="text-xl font-extrabold">{job.title}</h1>
            <p>
                <span className="text-sky-400 font-semibold">Description: </span>
                {job.description}
            </p>

            <p>
                <span className="text-sky-400 font-semibold">Location: </span>
                {job.location}
            </p>
            <p>
                <span className="text-sky-400 font-semibold">Salary Range: </span> $
                {job.salaryBottom} - ${job.salaryRoof}
            </p>
        </div>
    );
};

export default JobCard;
