export const requests = {
    jobs: {
        getAll: "http://localhost:5000/jobs",
        getOne: "http://localhost:5000/jobs",
        updateOne: "http://localhost:5000/jobs",
        create: "http://localhost:5000/jobs",
        delete: "http://localhost:5000/jobs",
    },
    companies: {
        getOne: "http://localhost:5000/companies",
    },
    applications: {
        createApplicant: "http://localhost:5000/applicant",
    },
    jobApplications: {
        createJobAppllication: "http://localhost:5000/jobApplication",
    },
};
