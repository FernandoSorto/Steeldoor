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
            <h1>You only need to your name and cv to applicate!</h1>

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label>First Name</label>
                <input
                    value={applicant.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
            </div>
            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label>Last Name</label>
                <input
                    value={applicant.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
            </div>

            <div className="flex m-5 p-3 shrink-0 h-20 w-1/2 justify-center items-baseline bg-white rounded-lg shadow-lg">
                <label>Resume</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                />
            </div>

            <button onClick={() => apply()}>Apply!</button>

            <button onClick={() => router.back()}>Go back</button>
        </div>
    );
};

export default JobApplication;
