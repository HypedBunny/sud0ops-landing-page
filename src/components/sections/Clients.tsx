"use client";

import { motion } from "framer-motion";
import { Building2, ShoppingCart, PartyPopper, Shield } from "lucide-react";

// Using Lucide icons to represent the logos since we don't have SVGs
const clients = [
    {
        name: "HelperHub",
        description: "HelperHub Modernization",
        icon: Building2,
        url: "https://helperhub.co.za",
    },
    {
        name: "Bashies",
        description: "E-commerce Infrastructure & DevOps",
        icon: ShoppingCart,
        url: "https://bashies.co.za",
    },
    {
        name: "HappyEvents",
        description: "Digital Enablement & Social Platform",
        icon: PartyPopper,
        url: "https://happyevents.co.za",
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
                        Trusted by Growing Modern Enterprises
                    </p>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3 items-center justify-items-center">
                        {clients.map((client, idx) => {
                            const Icon = client.icon;
                            return (
                                <a
                                    key={client.name}
                                    href={client.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center justify-center gap-3 cursor-pointer"
                                >
                                    <div className="text-slate-500 group-hover:text-brand-blue transition-colors duration-500 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
                                        <Icon className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.5} />
                                    </div>
                                    <div className="text-center">
                                        <h4 className="font-heading font-bold text-lg text-slate-300 group-hover:text-brand-blue-glow transition-colors duration-500">
                                            {client.name}
                                        </h4>
                                        {/* Tooltip-like description on hover */}
                                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -translate-y-4 group-hover:-translate-y-2 mt-2 bg-brand-black border border-white/10 text-slate-300 text-xs py-2 px-3 rounded shadow-xl whitespace-nowrap z-20 mx-auto left-1/2 -translate-x-1/2 min-w-max">
                                            {client.description}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
