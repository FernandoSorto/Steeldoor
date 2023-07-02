import { Job } from "../types";

export type JobCardProps = {
    job: Job;
    adminView?: boolean;
    editJob?: () => void;
    deleteJob?: () => void;
    viewJob?: () => void;
};
