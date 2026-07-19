import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Alex-Jay Beukes | DevOps Engineer & Founder of Sud0ops",
    description:
        "Alex-Jay Beukes, DevOps Engineer at Rhino Africa and founder of Sud0ops. AWS Solutions Architect Professional helping teams adopt, build, and grow with technology.",
};

export default function AlexLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return children;
}
