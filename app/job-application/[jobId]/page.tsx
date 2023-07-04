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

    const [cvFile, setCvFile] = useState<File | null>(null);

    const handleChange = (key: keyof Applicant, value: string) => {
        setApplicant((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setCvFile(file);
    };

    const apply = async () => {
        const createApplicantResponse = await createApplicant(applicant);

        if (createApplicantResponse.status === 200 && cvFile) {
            const application = {
                jobId: Number(params.jobId),
                applicantId: createApplicantResponse.data.id,
            };

            const createApplicationResponse = await createApplicantionToJob(application, cvFile);

            if (createApplicationResponse.status === 200) {
                router.back();
            }
        }
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
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
            </div>

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label className="mr-2 font-bold text-blue-500">Last Name</label>
                <input
                    value={applicant.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
            </div>

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label className="mr-2 font-bold text-blue-500">Resume</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
            </div>

            <div>
                <button
                    onClick={() => apply()}
                    className="mr-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Apply!
                </button>

                <button
                    onClick={() => router.back()}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded mt-5"
                >
                    Go back
                </button>
            </div>
        </div>
    );
};

export default JobApplication;
