import AdminFooter from "@/components/AdminFooter";
import JobFeed from "@/components/JobFeed";

export default function Home() {
    return (
        <main className="flex flex-col grow w-full h-screen">
            <JobFeed />
            <AdminFooter />
        </main>
    );
}
