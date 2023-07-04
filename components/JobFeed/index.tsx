"use client";

import { getAllJobs } from "@/app/services/Jobs";
import { useEffect, useState } from "react";
import { Job } from "./types";
import JobCard from "@/components/JobFeed/JobCard";
import { useRouter } from "next/navigation";
import JobFilter from "../JobFilter";
import { SelectOption } from "../JobFilter/types";

const JobFeed = () => {
    const router = useRouter();
    const [jobList, setJobList] = useState<Job[]>([]);
    const [jobListDisplay, setJobListDisplay] = useState<Job[]>([]);

    const [filters, setFilters] = useState<{
        selectedSkills: SelectOption[];
        selectedCompany: SelectOption | null;
        selectedLocation: SelectOption | null;
        selectedSalaryRoof: SelectOption | null;
        selectedSalaryBottom: SelectOption | null;
    }>({
        selectedSkills: [],
        selectedCompany: null,
        selectedLocation: null,
        selectedSalaryRoof: null,
        selectedSalaryBottom: null,
    });

    const updateFilter = (filterName: string, value: any) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await getAllJobs();
            if (response.status === 200) {
                setJobList(response.data);
                setJobListDisplay(response.data);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        const filtered = jobList.filter((job) => {
            // Filter based on selectedSkills
            if (filters.selectedSkills.length > 0) {
                const hasMatchingSkills = filters.selectedSkills.some((selectedSkill) =>
                    job.SkillsOnJobs.some((skill) => skill.skillId === selectedSkill.value)
                );
                if (!hasMatchingSkills) {
                    return false;
                }
            }

            // Filter based on selectedCompany
            if (filters.selectedCompany && job.companyId !== filters.selectedCompany.value) {
                return false;
            }

            // Filter based on selectedLocation
            if (filters.selectedLocation && job.location !== filters.selectedLocation.label) {
                return false;
            }

            // Filter based on selectedSalaryRoof
            if (filters.selectedSalaryRoof && job.salaryRoof < filters.selectedSalaryRoof.value) {
                return false;
            }

            // Filter based on selectedSalaryBottom
            if (
                filters.selectedSalaryBottom &&
                job.salaryBottom < filters.selectedSalaryBottom.value
            ) {
                return false;
            }

            return true;
        });

        setJobListDisplay(filtered);
    }, [filters]);

    const apply = (jobId: number) => {
        router.push(`job-application/${jobId}`);
    };

    return (
        <div className="flex h-full w-full">
            <div className="flex mt-20 flex-col w-1/4 h-full p-4 border-r border-gray-300 overflow-y-auto">
                <JobFilter filters={filters} setFilters={updateFilter} />
            </div>

            <div className="flex flex-col w-3/4 h-full p-4">
                <div className="flex flex-wrap justify-center overflow-y-auto no-scrollbar">
                    <h1 className="text-6xl font-semibold text-sky-400 mb-6">Job Opportunities</h1>
                    {jobListDisplay.map((job, index) => (
                        <JobCard
                            job={job}
                            applyForJob={() => apply(job.id)}
                            adminView={false}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobFeed;
