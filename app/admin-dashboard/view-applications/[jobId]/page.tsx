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
            <div className="mb-5">
                <h1 className="mb-5">Job Opportunity Details & Applications</h1>
                <button
                    onClick={() => {
                        router.back();
                    }}
                    className="bg-blue-500 mr-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go back
                </button>
            </div>

            <div className="flex justify-around w-full">
                <div className="flex flex-col w-1/2 bg-white rounded-xl p-5">
                    <h2 className="text-xl mb-5 border-b-2 border-gray-400 font-bold">
                        Job Profile
                    </h2>
                    <label>Title</label>
                    <h1>{jobDetails.title}</h1>
                    <label>Description</label>
                    <p>{jobDetails.description}</p>
                    <label>Location</label>
                    <p>{jobDetails.location}</p>
                    <label>Salary Range</label>
                    <div className="flex">
                        <p>{`$${jobDetails.salaryBottom} -`}</p>
                        <p>{` $${jobDetails.salaryRoof}`}</p>
                    </div>

                    <label>Skills</label>
                    <div className="flex">
                        {jobDetails.SkillsOnJobs.map((item) => {
                            return (
                                <div
                                    key={item.skill.name}
                                    className="bg-violet-200 p-3 rounded-full mr-2"
                                >
                                    <p>{item.skill.name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col w-1/3 h-auto bg-white rounded-xl p-5">
                    <h2 className="text-xl mb-5 border-b-2 border-gray-400 font-bold">
                        Applications
                    </h2>
                    {jobDetails.applications && jobDetails.applications.length > 0 ? (
                        jobDetails.applications.map((applicant) => {
                            return (
                                <div key={applicant.id}>
                                    <h3 className="mb-1 text-lg font-semibold">Applicant</h3>
                                    <div className="flex mb-2 flex-col bg-green-300 rounded-r-full p-3">
                                        <div className="flex">
                                            <label className="mr-2 font-semibold">
                                                First Name:
                                            </label>
                                            <p>{applicant.applicant.firstName}</p>
                                        </div>
                                        <div className="flex">
                                            <label className="mr-2 font-semibold">Last Name:</label>
                                            <p>{applicant.applicant.lastName}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                downloadCVFile(applicant.id);
                                            }}
                                            className="bg-gray-500 mr-10 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            <label className="mr-2 font-semibold">
                                                Download CV!
                                            </label>
                                        </button>
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
