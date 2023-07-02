import axiosInstance from "../axios";
import axios from "axios";
import { requests } from "../urls";
import { jobUpdate } from "./types";

export const getAllJobs = async () => {
    try {
        const data = await axiosInstance.get(requests.jobs.getAll);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            return "Unexpected error";
        }
    }
};

export const getJob = async (jobId: number) => {
    try {
        const data = await axiosInstance.get(`${requests.jobs.getOne}/${jobId}`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            return "Unexpected error";
        }
    }
};

export const updateJob = async (jobId: number, jobUpdated: jobUpdate) => {
    try {
        const data = await axiosInstance.patch(`${requests.jobs.updateOne}/${jobId}`, jobUpdated);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            return "Unexpected error";
        }
    }
};

export const createJob = async (job: jobUpdate) => {
    try {
        const data = await axiosInstance.post(requests.jobs.create, job);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            return "Unexpected error";
        }
    }
};

export const deleteJob = async (jobId: number) => {
    try {
        const data = await axiosInstance.delete(`${requests.jobs.delete}/${jobId}`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            return "Unexpected error";
        }
    }
};
