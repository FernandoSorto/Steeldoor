import axiosInstance from "../axios";
import axios from "axios";
import { requests } from "../urls";
import { Applicant, JobApplication } from "./types";

export const createApplicant = async (applicant: Applicant) => {
    try {
        const data = await axiosInstance.post(requests.applications.createApplicant, applicant);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            return "Unexpected error";
        }
    }
};

export const createApplicantionToJob = async (applicationIds: JobApplication, file: File) => {
    try {
        const formData = new FormData();
        formData.append("cv", file);
        formData.append("jobId", applicationIds.jobId.toString());
        formData.append("applicantId", applicationIds.applicantId.toString());
        const data = await axiosInstance.post(
            requests.jobApplications.createJobAppllication,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            return "Unexpected error";
        }
    }
};
