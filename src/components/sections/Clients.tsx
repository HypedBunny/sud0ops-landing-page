"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
    {
        name: "HelperHub",
        description: "HelperHub Modernization",
        logo: "/helperhub-logo.png",
        url: "https://helperhub.co.za",
    },
    {
        name: "Bashies",
        description: "E-commerce Infrastructure & DevOps",
        logo: "/bashies-logo.png",
        url: "https://bashies.co.za",
        logoClass: "h-16",
    },
    {
        name: "HappyEvents",
        description: "Digital Enablement & Social Platform",
        logo: "/happyevents-logo.png",
        url: "https://happyshisha.co.za",
        logoClass: "h-20",
    },
];

export function Clients() {
    return (
        <section id="clients" className="py-20 border-y border-white/5 bg-brand-black-light/50 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500 mb-12">
                        Trusted by Growing Businesses
                    </p>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3 items-center justify-items-center">
                        {clients.map((client) => (
                            <a
                                key={client.name}
                                href={client.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex flex-col items-center justify-center gap-3 cursor-pointer"
                            >
                                <div className="opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
                                    <Image
                                        src={client.logo}
                                        alt={client.name}
                                        width={160}
                                        height={60}
                                        className={`${client.logoClass ?? "h-12"} w-auto object-contain`}
                                    />
                                </div>
                                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none top-full mt-2 bg-brand-black border border-white/10 text-slate-300 text-xs py-2 px-3 rounded shadow-xl whitespace-nowrap z-20">
                                    {client.description}
                                </div>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
