import axiosInstance from "../axios";
import axios from "axios";
import { requests } from "../urls";

export const getACompany = async (companyId: number) => {
    try {
        const data = await axiosInstance.get(`${requests.companies.getOne}/${companyId}`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            return "Unexpected error";
        }
    }
};
