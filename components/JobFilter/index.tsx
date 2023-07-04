"use client";

import { getAllSkills } from "@/app/services/Skills";
import { useEffect, useState } from "react";
import Select from "react-select";
import { JobFilterProps, SelectOption, SkillItem } from "./types";
import { getAllCompany } from "@/app/services/Companies/index ";
import { Job } from "../JobFeed/types";
import { getAllJobs } from "@/app/services/Jobs";

const JobFilter = ({ setFilters, filters }: JobFilterProps) => {
    const [preparedSkills, setPreparedSkils] = useState<SelectOption[]>([]);
    const [preparedCompanies, setPreparedCompanies] = useState<SelectOption[]>([]);
    const [preparedLocations, setPreparedLocations] = useState<SelectOption[]>([]);
    const [preparedBottomSalary, setPrepareBottomSalary] = useState<SelectOption[]>([]);
    const [preparedRoofSalary, setPrepareRoofSalary] = useState<SelectOption[]>([]);

    useEffect(() => {
        const getSkills = async () => {
            const response = await getAllSkills();

            if (response.status === 200) {
                const skillsForSelect: SelectOption[] = response.data.map((item: SkillItem) => {
                    return { value: item.id, label: item.name };
                });
                setPreparedSkils(skillsForSelect);
            }
        };
        getSkills();
    }, []);

    useEffect(() => {
        const getSkills = async () => {
            const response = await getAllCompany();

            if (response.status === 200) {
                const companiesForSelect: SelectOption[] = response.data.map((item: SkillItem) => {
                    return { value: item.id, label: item.name };
                });
                setPreparedCompanies(companiesForSelect);
            }
        };
        getSkills();
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await getAllJobs();
            if (response.status === 200) {
                const locationsSet = new Set<string>();
                const locationsForSelect = response.data.reduce(
                    (acc: { value: string; label: string }[], item: any) => {
                        const location = item.location;
                        if (!locationsSet.has(location)) {
                            locationsSet.add(location);
                            acc.push({ value: location, label: location });
                        }
                        return acc;
                    },
                    []
                );
                setPreparedLocations(locationsForSelect);

                const salaryBottomSet = new Set<string>();
                const bottomSalaryForSelect = response.data.reduce(
                    (acc: { value: string; label: string }[], item: any) => {
                        const salaryBottom = item.salaryBottom;
                        if (!salaryBottomSet.has(salaryBottom)) {
                            salaryBottomSet.add(salaryBottom);
                            acc.push({ value: salaryBottom, label: `$${salaryBottom}` });
                        }
                        return acc;
                    },
                    []
                );
                setPrepareBottomSalary(bottomSalaryForSelect);

                const salaryRoofSet = new Set<string>();
                const roofSalaryForSelect = response.data.reduce(
                    (acc: { value: string; label: string }[], item: any) => {
                        const salaryRoof = item.salaryRoof;
                        if (!salaryRoofSet.has(salaryRoof)) {
                            salaryRoofSet.add(salaryRoof);
                            acc.push({ value: salaryRoof, label: `$${salaryRoof}` });
                        }
                        return acc;
                    },
                    []
                );
                setPrepareRoofSalary(roofSalaryForSelect);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="p-4 border rounded-lg shadow bg-white">
            <div className="mb-3">
                <label className="block text-lg font-bold text-gray-800">Company</label>
                <Select
                    value={filters.selectedCompany}
                    onChange={(value) => setFilters("selectedCompany", value)}
                    options={preparedCompanies}
                    isClearable={true}
                    isSearchable={true}
                    classNamePrefix="react-select"
                />
            </div>
            <div className="mb-3">
                <label className="block text-lg font-bold text-gray-800">Locations</label>
                <Select
                    value={filters.selectedLocation}
                    onChange={(value) => setFilters("selectedLocation", value)}
                    options={preparedLocations}
                    isClearable={true}
                    isSearchable={true}
                    classNamePrefix="react-select"
                />
            </div>
            <div className="mb-3">
                <label className="block text-lg font-bold text-gray-800">Salary bottom</label>
                <Select
                    value={filters.selectedSalaryBottom}
                    onChange={(value) => setFilters("selectedSalaryBottom", value)}
                    options={preparedBottomSalary}
                    isClearable={true}
                    isSearchable={true}
                    classNamePrefix="react-select"
                />
            </div>
            <div className="mb-3">
                <label className="block text-lg font-bold text-gray-800">Salary ceiling</label>
                <Select
                    value={filters.selectedSalaryRoof}
                    onChange={(value) => setFilters("selectedSalaryRoof", value)}
                    options={preparedRoofSalary}
                    isClearable={true}
                    isSearchable={true}
                    classNamePrefix="react-select"
                />
            </div>
            <div className="mb-3">
                <label className="block text-lg font-bold text-gray-800">Skills</label>
                <Select
                    value={filters.selectedSkills}
                    onChange={(value) => setFilters("selectedSkills", value)}
                    options={preparedSkills}
                    isClearable={true}
                    isSearchable={true}
                    isMulti={true}
                    classNamePrefix="react-select"
                />
            </div>
        </div>
    );
};

export default JobFilter;
