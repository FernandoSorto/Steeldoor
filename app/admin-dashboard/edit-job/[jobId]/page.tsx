"use client";

import { getJob, updateJob } from "@/app/services/Jobs";
import React, { useEffect, useState } from "react";
import { JobDetails, SkillByName } from "./types";
import { useRouter } from "next/navigation";

const EditJob = ({ params }: { params: { jobId: number } }) => {
    const router = useRouter();
    const [newSkill, setNewSkill] = useState<string>("");
    const [jobDetails, setJobDetails] = useState<JobDetails>({
        id: 0,
        title: "",
        location: "",
        description: "",
        salaryRoof: 0,
        salaryBottom: 0,
        companyId: 0,
        SkillsOnJobs: [],
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

    const handleChange = (key: keyof JobDetails, value: string | number, addSkill?: boolean) => {
        if (key === "SkillsOnJobs") {
            let skillsArray: SkillByName[] = [];

            if (!addSkill) {
                skillsArray = jobDetails.SkillsOnJobs.filter((item) => item !== undefined).filter(
                    (item) => item.skill.name !== value
                );
                const newSkillsArray = skillsArray?.filter((item) => item);
                setJobDetails((prevState) => ({
                    ...prevState,
                    [key]: newSkillsArray,
                }));
            } else {
                skillsArray = jobDetails.SkillsOnJobs.map((item) => item);
                skillsArray.push({
                    skill: { name: value.toLocaleString().toLocaleLowerCase().trim() },
                });
                setJobDetails((prevState) => ({
                    ...prevState,
                    [key]: skillsArray,
                }));
                setNewSkill("");
            }
        } else {
            setJobDetails((prevState) => ({
                ...prevState,
                [key]: value,
            }));
        }
    };

    const update = async () => {
        const updatedSkills = jobDetails.SkillsOnJobs.map((item) => {
            return { name: item.skill.name };
        });

        const updatedJob = {
            title: jobDetails.title,
            location: jobDetails.location,
            description: jobDetails.description,
            salaryRoof: jobDetails.salaryRoof,
            salaryBottom: jobDetails.salaryBottom,
            companyId: jobDetails.companyId,
            skills: updatedSkills,
        };

        const response = await updateJob(jobDetails.id, updatedJob);

        if (response.status === 200) {
            router.back();
        }
    };

    return (
        <div className="flex flex-col items-center w-full p-10">
            <h1 className="pb-5 font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
                Edit Job
            </h1>

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label className="mr-2 font-bold text-blue-500">Title</label>
                <input
                    value={jobDetails?.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
            </div>

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label className="mr-2 font-bold text-blue-500">Description</label>
                <textarea
                    value={jobDetails?.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="resize-none bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
            </div>

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label className="mr-2 font-bold text-blue-500">Location</label>
                <textarea
                    value={jobDetails?.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="resize-none bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
            </div>

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label className="w-1/2 mr-2 font-bold text-blue-500">Salary Range</label>
                <input
                    value={jobDetails?.salaryBottom}
                    onChange={(e) => handleChange("salaryBottom", e.target.value)}
                    className="bg-gray-200 mr-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
                <input
                    value={jobDetails?.salaryRoof}
                    onChange={(e) => handleChange("salaryRoof", e.target.value)}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
            </div>

            <div className="flex m-5 p-3 shrink-0 h-50 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg flex-col">
                <div className="flex w-full items-center">
                    <label className="mr-2 w-1/4 font-bold text-blue-500">Add Skill</label>
                    <input
                        onChange={(e) => setNewSkill(e.target.value)}
                        value={newSkill}
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 pr-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    />
                    <button
                        onClick={() => handleChange("SkillsOnJobs", newSkill, true)}
                        className="bg-green-500 mx-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                        +
                    </button>
                </div>
                <div className="flex pt-2">
                    {jobDetails?.SkillsOnJobs.map((item) => {
                        return (
                            <div
                                key={item.skill.name}
                                className="flex p-2 items-baseline m-3 bg-gray-200 rounded"
                            >
                                <p className="px-2">{item.skill.name}</p>
                                <button
                                    onClick={() =>
                                        handleChange("SkillsOnJobs", item.skill.name, false)
                                    }
                                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-full"
                                >
                                    -
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex mt-5">
                <button
                    onClick={() => {
                        router.back();
                    }}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
                <button
                    onClick={() => update()}
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-700 hover:to-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditJob;
