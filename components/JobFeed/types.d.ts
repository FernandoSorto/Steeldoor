export type Job = {
    id: number;
    title: string;
    location: string;
    description: string;
    salaryRoof: number;
    salaryBottom: number;
    companyId: number;
    SkillsOnJobs: SkillOnJob[];
};

export type SkillOnJob = {
    jobId: number;
    skillId: number;
};
