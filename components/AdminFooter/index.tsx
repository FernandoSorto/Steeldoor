import Link from "next/link";

const AdminFooter = () => {
    return (
        <footer className="bg-black flex flex-col items-center p-7 mt-auto">
            <h1 className="text-white font-semibold text-lg">
                Are you an Administrator?
                <a
                    href="/admin-dashboard"
                    className="font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-50"
                >
                    {` Come check the Dashboard!`}
                </a>
            </h1>
        </footer>
    );
};

export default AdminFooter;
