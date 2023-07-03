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

export const createApplicantionToJob = async (applicationIds: JobApplication) => {
    console.log("REQUESTING TO CREATE APPLICATION");
    console.log(JSON.stringify(applicationIds, null, 2));
    try {
        const data = await axiosInstance.post(
            requests.jobApplications.createJobAppllication,
            applicationIds
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
