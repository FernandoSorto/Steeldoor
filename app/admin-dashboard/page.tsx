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
    const [showModal, setShowModal] = useState(false);
    const [deleteJobId, setDeleteJobId] = useState<number | null>(null);

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

    const goToApplicationDetails = (jobId: number) => {
        router.push(`admin-dashboard/view-applications/${jobId}`);
    };

    const deleteJobOpportunity = (jobId: number) => {
        setDeleteJobId(jobId);
        setShowModal(true);
    };

    const closeModal = async () => {
        if (deleteJobId) {
            const response = await deleteJob(deleteJobId);

            if (response.status === 200) {
                fetchJobs();
            }
        }
        setShowModal(false);
        setDeleteJobId(null); // Reset the deleteJobId state variable
    };

    return (
        <div className="flex flex-col h-full w-full items-center">
            <div className="mt-5 py-6 px-9 border-b-4 border-gray-300 rounded">
                <h1 className="font-extrabold pb-2 text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Welcome {company?.name} admin!
                </h1>
            </div>

            <div className="mt-5 flex flex-wrap justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded mr-2">
                    <Link href={"/"}>Go Back</Link>
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded">
                    <Link href={"admin-dashboard/create-job"}>Create new Job</Link>
                </button>
            </div>

            <div className="flex p-6 md:p-10 lg:p-20 justify-center w-full mx-2 my-0 flex-wrap">
                {jobList.map((job) => (
                    <JobCard
                        job={job}
                        adminView={true}
                        editJob={() => goToEditJob(job.id)}
                        deleteJob={() => deleteJobOpportunity(job.id)}
                        viewJob={() => goToApplicationDetails(job.id)}
                        key={job.id}
                    />
                ))}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg justify">
                        <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
                        <button
                            onClick={() => {
                                setShowModal(false);
                            }}
                            className="mr-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
