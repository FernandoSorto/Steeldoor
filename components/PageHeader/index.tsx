import React from "react";

const PageHeader = () => {
    return (
        <div className="flex flex-col w-full h-4/6 items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 relative">
            <div className="bg-white p-10 rounded-full shadow-lg relative z-10">
                <h1 className="font-extrabold pb-2 text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    STEELDOOR
                </h1>
            </div>

            <div className="absolute w-full h-full top-0">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 60"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                    style={{ zIndex: -1 }}
                >
                    <defs>
                        <pattern
                            id="cubes"
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                            viewBox="0 0 10 10"
                        >
                            <rect
                                width="10"
                                height="10"
                                fill="none"
                                stroke="#fff"
                                strokeWidth="1"
                            />
                            <line x1="0" y1="10" x2="10" y2="0" stroke="#fff" strokeWidth="1" />
                        </pattern>
                    </defs>

                    <rect x="0" y="0" width="100" height="60" fill="url(#cubes)" stroke="none" />
                </svg>
            </div>
        </div>
    );
};

export default PageHeader;
