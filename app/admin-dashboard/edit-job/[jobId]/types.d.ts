admin - dashboard / edit - job / [jobId] / types.d.ts;

export type JobDetails = {
    id: number;
    title: string;
    location: string;
    description: string;
    salaryRoof: number;
    salaryBottom: number;
    companyId: number;
    SkillsOnJobs: SkillByName[];
    applications?: Applicant[];
};

export type SkillByName = {
    skill: {
        name: string;
    };
};

export type Applicant = {
    applicant: {
        id: number;
        firstName: String;
        lastName: string;
    };
};
