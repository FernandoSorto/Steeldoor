import axios from "axios";
import { requests } from "../urls";

export const downloadCV = async (applicationId: number) => {
    try {
        const response = await axios.get(
            `${requests.jobApplications.downloadCVFile}/${applicationId}/download`,
            {
                responseType: "blob",
            }
        );

        if (response.status !== 200) {
            throw new Error("File download failed");
        }

        const url = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = url;
        link.download = "job_application_file.pdf";

        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
        link.remove();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("File download error:", error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }
    }
};
