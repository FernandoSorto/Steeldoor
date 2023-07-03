import axiosInstance from "../axios";
import axios from "axios";
import { requests } from "../urls";

export const getAllSkills = async () => {
    try {
        const data = await axiosInstance.get(`${requests.skills.getAll}`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            return "Unexpected error";
        }
    }
};
