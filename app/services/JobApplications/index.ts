import axiosInstance from "../axios";
import axios from "axios";
import { requests } from "../urls";

// export const downloadCV = async (jobId: number) => {
//     try {
//         const data = await axiosInstance.get(
//             `${requests.jobApplications.downloadCVFile}/${jobId}/download`
//         );
//         return data;
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             return error.response?.data;
//         } else {
//             return "Unexpected error";
//         }
//     }
// };

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

        // Create a temporary URL for the blob object
        const url = URL.createObjectURL(response.data);

        // Create a link element
        const link = document.createElement("a");
        link.href = url;
        link.download = "job_application_file.pdf"; // Provide a default file name for the download

        // Append the link to the document body and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up the temporary URL and remove the link from the document body
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
