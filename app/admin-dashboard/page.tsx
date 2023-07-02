"use client";
import { useEffect, useState } from "react";
import { getACompany } from "../services/Companies/index ";
import { Company } from "../services/Companies/types";
import { Job } from "@/components/JobFeed/types";
import { deleteJob, getAllJobs } from "../services/Jobs";
import JobCard from "@/components/JobFeed/JobCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
    const router = useRouter();
    const [company, setCompany] = useState<Company>();
    const [jobList, setJobList] = useState<Job[]>([]);

    const fetchJobs = async () => {
        const response = await getAllJobs();
        if (response.status === 200) {
            setJobList(response.data);
        }
    };

    useEffect(() => {
        const getCompanyData = async () => {
            const response = await getACompany(1);
            if (response.status === 200) {
                setCompany(response.data);
            }
        };
        getCompanyData();
    }, []);
    useEffect(() => {
        fetchJobs();
    }, []);

    const goToEditJob = (jobId: number) => {
        router.push(`admin-dashboard/edit-job/${jobId}`);
    };

    const deleteJobOpportunity = async (jobId: number) => {
        const response = await deleteJob(jobId);

        if (response.status === 200) {
            fetchJobs();
        }
    };

    return (
        <div className="flex flex-col h-full w-full items-center ">
            <div className="mt-5 py-6 px-9 border-b-4  border-gray-300 rounded-lg">
                <h1 className="text-6xl font-semibold text-sky-400">
                    {" "}
                    Welcome {company?.name} admin!
                </h1>
            </div>

            <div className="mt-5">
                <button className="bg-blue-500 mr-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link href={"/"}>Go Back</Link>
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link href={"admin-dashboard/create-job"}>Create new Job</Link>
                </button>
            </div>

            <div className="flex p-20 justify-center w-full  mx-10 my-0 flex-wrap  ">
                {jobList.map((job) => {
                    return (
                        <JobCard
                            job={job}
                            adminView={true}
                            editJob={() => goToEditJob(job.id)}
                            deleteJob={() => deleteJobOpportunity(job.id)}
                            key={job.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AdminDashboard;
