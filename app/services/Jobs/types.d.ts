export type jobUpdate = {
    title: string;
    location: string;
    description: string;
    salaryRoof: number;
    salaryBottom: number;
    companyId: number;
    skills: Skill[];
};

export type Skill = {
    name: string;
};
