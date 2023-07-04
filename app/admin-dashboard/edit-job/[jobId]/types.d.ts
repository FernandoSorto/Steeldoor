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
    id: number;
    applicant: {
        firstName: String;
        lastName: string;
    };
    cvFile: string;
};
