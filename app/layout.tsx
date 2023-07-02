import "./globals.css";

export const metadata = {
    title: "Steeldoor",
    description: "Post & find the right job opportunity for you",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="font-[inter]-sans bg-slate-100">{children}</body>
        </html>
    );
}
