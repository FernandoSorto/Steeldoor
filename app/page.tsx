import AdminFooter from "@/components/AdminFooter";
import JobFeed from "@/components/JobFeed";
import PageHeader from "@/components/PageHeader";

export default function Home() {
    return (
        <main className="flex flex-col w-full h-screen overflow-y-hidden">
            <div className="overflow-y-auto">
                <PageHeader />
                <JobFeed />
            </div>
            <AdminFooter />
        </main>
    );
}
