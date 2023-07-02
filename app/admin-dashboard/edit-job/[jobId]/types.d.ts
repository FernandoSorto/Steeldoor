export type JobDetails = {
    id: number;
    title: string;
    location: string;
    description: string;
    salaryRoof: number;
    salaryBottom: number;
    companyId: number;
    SkillsOnJobs: SkillByName[];
};

export type SkillByName = {
    skill: {
        name: string;
    };
};
