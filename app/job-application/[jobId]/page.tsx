"use client";

import { createApplicant, createApplicantionToJob } from "@/app/services/Applications";
import { Applicant } from "@/app/services/Applications/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const JobApplication = ({ params }: { params: { jobId: number } }) => {
    const router = useRouter();

    const [applicant, setApplicant] = useState<Applicant>({
        firstName: "",
        lastName: "",
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [showModal, setShowModal] = useState(false);

    const [cvFile, setCvFile] = useState<File | null>(null);

    const handleChange = (key: keyof Applicant, value: string) => {
        setApplicant((prevState) => ({
            ...prevState,
            [key]: value,
        }));
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [key]: "",
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setCvFile(file);
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!applicant.firstName) {
            errors.firstName = "This field is required";
        }

        if (!applicant.lastName) {
            errors.lastName = "This field is required";
        }

        if (!cvFile) {
            errors.cvFile = "Please upload your CV";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const apply = async () => {
        if (!validateForm()) {
            return;
        }

        const createApplicantResponse = await createApplicant(applicant);

        if (createApplicantResponse.status === 200 && cvFile) {
            const application = {
                jobId: Number(params.jobId),
                applicantId: createApplicantResponse.data.id,
            };

            const createApplicationResponse = await createApplicantionToJob(application, cvFile);

            if (createApplicationResponse.status === 200) {
                setShowModal(true);
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        router.back();
    };

    return (
        <div className="flex flex-col items-center w-full p-10">
            <h1 className="pb-5 font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
                You only need your name and CV to apply!
            </h1>

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label className="mr-2 font-bold text-blue-500">First Name</label>
                <input
                    value={applicant.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className={`bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                        validationErrors.firstName ? "border-red-500" : "border-gray-200"
                    }`}
                />
            </div>

            {validationErrors.firstName && (
                <p className="text-red-500 text-sm mb-2">{validationErrors.firstName}</p>
            )}

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label className="mr-2 font-bold text-blue-500">Last Name</label>
                <input
                    value={applicant.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className={`bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                        validationErrors.lastName ? "border-red-500" : "border-gray-200"
                    }`}
                />
            </div>

            {/* Error message for Last Name */}
            {validationErrors.lastName && (
                <p className="text-red-500 text-sm mb-2">{validationErrors.lastName}</p>
            )}

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label className="mr-2 font-bold text-blue-500">Resume</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className={`bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                        validationErrors.cvFile ? "border-red-500" : "border-gray-200"
                    }`}
                />
            </div>

            {validationErrors.cvFile && (
                <p className="text-red-500 text-sm mb-2">{validationErrors.cvFile}</p>
            )}

            <div>
                <button
                    onClick={() => router.back()}
                    className="mr-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded mt-5"
                >
                    Go Back
                </button>
                <button
                    onClick={() => apply()}
                    className=" bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Apply!
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg justify">
                        <h2 className="text-2xl font-bold mb-4">Your application has been sent!</h2>
                        <button
                            onClick={closeModal}
                            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Back to Offers!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobApplication;
