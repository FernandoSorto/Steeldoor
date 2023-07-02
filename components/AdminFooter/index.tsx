import Link from "next/link";

const AdminFooter = () => {
    return (
        <footer className="bg-black flex flex-col items-center p-7 mb-auto">
            <h1 className="text-white font-semibold text-lg">
                {/* Are you a looking to hire? */}
                Are you an Administrator?
                <Link href={"/admin-dashboard"}>
                    <span className="hover:text-sky-400 hover:text-lg">
                        {" "}
                        Come check the Dashboard!
                    </span>
                </Link>
            </h1>
        </footer>
    );
};

export default AdminFooter;
