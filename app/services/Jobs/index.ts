import axiosInstance from "../axios";
import axios from "axios";
import { requests } from "../urls";

export const getAllJobs = async () => {
    try {
        const data = await axiosInstance.get(requests.jobs.getAll);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("axios oopsie");
            return error.response?.data;
        } else {
            return "Unexpected error";
        }
    }
};
