export type SkillItem = {
    id: number;
    name: string;
};

export type SelectOption = {
    value: number;
    label: string;
};

export type JobFilterProps = {
    setFilters: (filterName: string, value: any) => void;
    filters;
};
