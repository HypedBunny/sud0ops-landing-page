import { ZERO_DOT, ZERO_PATHS } from "@/components/ui/logo-glyphs";

// The Builder Loop 0 on its own: four blue pieces and the amber centre dot (brand v1.1).
// Pass `label` when the mark stands for a word (it is then announced); otherwise it is decoration.
export function ZeroMark({
    className,
    pieces = "fill-brand-blue",
    dot = "fill-brand-accent",
    label,
}: {
    className?: string;
    pieces?: string;
    dot?: string;
    label?: string;
}) {
    return (
        <svg
            viewBox="74 81 549 717"
            className={className}
            {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
        >
            <g className={pieces}>
                {ZERO_PATHS.map((d) => <path key={d} d={d} />)}
            </g>
            <circle className={dot} cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} />
        </svg>
    );
}
