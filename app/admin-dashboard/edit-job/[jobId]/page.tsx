"use client";

import { getJob, updateJob } from "@/app/services/Jobs";
import React, { useEffect, useState } from "react";
import { JobDetails, SkillByName } from "./types";
import { useRouter } from "next/navigation";

const EditJob = ({ params }: { params: { jobId: number } }) => {
    const router = useRouter();
    const [newSkill, setNewSkill] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [showModal, setShowModal] = useState(false);
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
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [key]: "",
        }));

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
                const errors: Record<string, string> = {};

                if (!value || value.toLocaleString().toLocaleLowerCase().trim() === "") {
                    errors.SkillsOnJobs = "Empty skills not allowed";
                    setValidationErrors(errors);
                    setNewSkill("");
                    return;
                } else {
                    if (
                        jobDetails.SkillsOnJobs.some(
                            (skillObj) =>
                                skillObj.skill.name ===
                                value.toLocaleString().toLocaleLowerCase().trim()
                        )
                    ) {
                        errors.SkillsOnJobs = "Skill already added!";
                        setValidationErrors(errors);
                        setNewSkill("");
                        return;
                    }
                }

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

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!jobDetails.title || jobDetails.title === "") {
            errors.title = "This field is required";
        }

        if (!jobDetails.description || jobDetails.description === "") {
            errors.description = "This field is required";
        }
        if (!jobDetails.location || jobDetails.location === "") {
            errors.location = "This field is required";
        }

        if (jobDetails.salaryBottom <= 0 || jobDetails.salaryRoof <= 0) {
            errors.salaryRange = "Salary bottom and ceiling must be grater than 0";
        } else {
            if (jobDetails.salaryBottom > jobDetails.salaryRoof) {
                errors.salaryRange = "Salary ceiling must be grater than Salary bottom";
            }
        }

        if (jobDetails.SkillsOnJobs.length === 0) {
            errors.SkillsOnJobs = "At least one skill must be added";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const update = async () => {
        if (!validateForm()) {
            return;
        }

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
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        router.back();
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
                    className={`bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                        validationErrors.title ? "border-red-500" : "border-gray-200"
                    }`}
                />
            </div>

            {validationErrors.title && (
                <p className="text-red-500 text-sm mb-2">{validationErrors.title}</p>
            )}

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label className="mr-2 font-bold text-blue-500">Description</label>
                <textarea
                    value={jobDetails?.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className={`bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                        validationErrors.description ? "border-red-500" : "border-gray-200"
                    }`}
                />
            </div>

            {validationErrors.description && (
                <p className="text-red-500 text-sm mb-2">{validationErrors.description}</p>
            )}

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label className="mr-2 font-bold text-blue-500">Location</label>
                <textarea
                    value={jobDetails?.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className={`bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                        validationErrors.location ? "border-red-500" : "border-gray-200"
                    }`}
                />
            </div>

            {validationErrors.location && (
                <p className="text-red-500 text-sm mb-2">{validationErrors.location}</p>
            )}

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-baseline items-baseline bg-white rounded-lg shadow-lg">
                <label className="w-3/4  mr-2 font-bold text-blue-500">Salary Bottom</label>
                <input
                    value={jobDetails?.salaryBottom}
                    onChange={(e) => handleChange("salaryBottom", e.target.value)}
                    className={`mr-4 bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                        validationErrors.salaryRange ? "border-red-500" : "border-gray-200"
                    }`}
                />
                <label className="w-3/4 mr-2 font-bold text-blue-500">Salary Ceiling</label>
                <input
                    value={jobDetails?.salaryRoof}
                    onChange={(e) => handleChange("salaryRoof", e.target.value)}
                    className={`bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                        validationErrors.salaryRange ? "border-red-500" : "border-gray-200"
                    }`}
                />
            </div>

            {validationErrors.salaryRange && (
                <p className="text-red-500 text-sm mb-2">{validationErrors.salaryRange}</p>
            )}

            <div className="flex m-5 p-3 shrink-0 h-50 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg flex-col">
                <div className="flex w-full items-center">
                    <label className="mr-2 w-1/4 font-bold text-blue-500">Add Skill</label>
                    <input
                        onChange={(e) => {
                            setValidationErrors((prevErrors) => ({
                                ...prevErrors,
                                SkillsOnJobs: "",
                            }));
                            setNewSkill(e.target.value);
                        }}
                        value={newSkill}
                        className={`bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                            validationErrors.SkillsOnJobs ? "border-red-500" : "border-gray-200"
                        }`}
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

            {validationErrors.SkillsOnJobs && (
                <p className="text-red-500 text-sm mb-2">{validationErrors.SkillsOnJobs}</p>
            )}

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
                    Update
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg justify">
                        <h2 className="text-2xl font-bold mb-4">Job Opportunity Updated!</h2>
                        <button
                            onClick={closeModal}
                            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Back to Offers
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditJob;
