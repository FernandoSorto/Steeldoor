"use client";
import { getJob } from "@/app/services/Jobs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { JobDetails } from "../../edit-job/[jobId]/types";
import { downloadCV } from "@/app/services/JobApplications";

const AdminJobDetails = ({ params }: { params: { jobId: number } }) => {
    const router = useRouter();

    const [jobDetails, setJobDetails] = useState<JobDetails>({
        id: 0,
        title: "",
        location: "",
        description: "",
        salaryRoof: 0,
        salaryBottom: 0,
        companyId: 0,
        SkillsOnJobs: [],
        applications: [],
    });
    useEffect(() => {
        const fetchJobs = async () => {
            const response = await getJob(params.jobId);
            if (response.status === 200) {
                setJobDetails(response.data);
            }
        };
        fetchJobs();
    }, []);

    const downloadCVFile = async (applicationId: number) => {
        await downloadCV(applicationId);
    };

    return (
        <div className="flex flex-col items-center p-10">
            <div className="flex flex-col mb-10 items-center">
                <h1 className="font-extrabold mb-10 pb-2 text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Job Opportunity Details & Applications
                </h1>
                <button
                    onClick={() => {
                        router.back();
                    }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Go back
                </button>
            </div>

            <div className="flex justify-around w-full">
                <div className="flex flex-col w-1/2 bg-white rounded-xl p-5">
                    <h2 className="text-xl mb-5 border-b-2 border-gray-400 font-bold">
                        Job Profile
                    </h2>
                    <div className="mb-5">
                        <label className="font-bold text-blue-500">Title</label>
                        <h1>{jobDetails.title}</h1>
                    </div>

                    <div className="mb-5">
                        <label className="font-bold text-blue-500">Description</label>
                        <p>{jobDetails.description}</p>
                    </div>

                    <div className="mb-5">
                        <label className="font-bold text-blue-500">Location</label>
                        <p>{jobDetails.location}</p>
                    </div>

                    <div className="mb-5">
                        <label className="font-bold text-blue-500">Salary Range</label>
                        <div className="flex">
                            <p>{`$${jobDetails.salaryBottom} -`}</p>
                            <p>{` $${jobDetails.salaryRoof}`}</p>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label className="font-bold text-blue-500 ">Skills</label>
                        <div className="mt-3 flex">
                            {jobDetails.SkillsOnJobs.map((item) => {
                                return (
                                    <div
                                        key={item.skill.name}
                                        className="bg-purple-200 p-3 rounded-full mr-2"
                                    >
                                        <p>{item.skill.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-1/3 h-auto bg-white rounded-xl p-5">
                    <h2 className="text-xl mb-5 border-b-2 border-gray-400 font-bold">
                        Applications
                    </h2>
                    {jobDetails.applications && jobDetails.applications.length > 0 ? (
                        jobDetails.applications.map((applicant) => {
                            return (
                                <div key={applicant.id} className="mb-4">
                                    <h3 className="font-bold text-blue-500 pb-2">Applicant</h3>
                                    <div className="flex mb-2 bg-purple-100 rounded-lg p-3">
                                        <div className="flex-grow">
                                            <div className="flex flex-col items-center">
                                                <label className="mr-2 text-gray-600 font-bold text-md">
                                                    First Name
                                                </label>
                                                <p>{applicant.applicant.firstName}</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <label className="mr-2 text-gray-600 font-bold text-md">
                                                    Last Name
                                                </label>
                                                <p>{applicant.applicant.lastName}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="w-px bg-white h-full mx-5"></div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <button
                                                onClick={() => {
                                                    downloadCVFile(applicant.id);
                                                }}
                                                className="w-40 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded mr-2"
                                            >
                                                <label className="mr-2 font-semibold">
                                                    Download CV!
                                                </label>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>
                            <p>No Applicants yet!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminJobDetails;
