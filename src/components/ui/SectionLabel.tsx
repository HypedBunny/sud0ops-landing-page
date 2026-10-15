// Mono section marker, e.g. "01 / services".
export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
    return (
        <p className="mb-4 font-mono text-xs uppercase tracking-wider text-slate-400">
            <span className="text-brand-blue">{index}</span> / {children}
        </p>
    );
}
