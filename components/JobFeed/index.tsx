"use client";

import { getAllJobs } from "@/app/services/Jobs";
import { useEffect, useState } from "react";
import { Job } from "./types";
import JobCard from "@/components/JobFeed/JobCard";
import { useRouter } from "next/navigation";
import JobFilter from "../JobFilter";

const JobFeed = () => {
    const router = useRouter();
    const [jobList, setJobList] = useState<Job[]>([]);
    useEffect(() => {
        const fetchJobs = async () => {
            const response = await getAllJobs();
            if (response.status === 200) {
                setJobList(response.data);
            }
        };
        fetchJobs();
    }, []);

    const apply = (jobId: number) => {
        router.push(`job-application/${jobId}`);
    };

    return (
        <div className="flex flex-col h-full w-full items-center ">
            <div className="mt-5 py-6 px-9 border-b-4  border-gray-300 rounded-lg">
                <h1 className="text-6xl font-semibold text-sky-400">Job Opportunities</h1>
            </div>

            <JobFilter />

            <div className="flex p-20 justify-center w-full  mx-10 my-10 flex-wrap  ">
                {jobList.map((job, index) => {
                    return (
                        <JobCard
                            job={job}
                            applyforJob={() => apply(job.id)}
                            adminView={false}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default JobFeed;
