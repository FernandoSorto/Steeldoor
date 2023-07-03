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
        // console.log(`BEING CALLED WITH: ${filterName} and`);
        // console.log(JSON.stringify(value, null, 2));
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

            console.log(filters.selectedSkills);

            if (filters.selectedSkills.length > 0) {
                console.log("hay al menos una seleccionada");
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
        <div className="flex flex-col h-full w-full items-center ">
            <div className="mt-5 py-6 px-9 border-b-4  border-gray-300 rounded-lg">
                <h1 className="text-6xl font-semibold text-sky-400">Job Opportunities</h1>
            </div>

            <JobFilter filters={filters} setFilters={updateFilter} />

            <div className="flex p-20 justify-center w-full  mx-10 my-10 flex-wrap  ">
                {jobListDisplay.map((job, index) => {
                    return (
                        <JobCard
                            job={job}
                            applyforJob={() => apply(job.id)}
                            adminView={false}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default JobFeed;
