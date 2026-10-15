// L-shaped marks on a box's four corners, like the registration marks on a drawing.
// The parent must be `relative`.
export function CornerTicks({ className = "border-brand-blue" }: { className?: string }) {
    const tick = `pointer-events-none absolute h-3 w-3 ${className}`;
    return (
        <>
            <span aria-hidden="true" className={`${tick} -left-px -top-px border-l-2 border-t-2`} />
            <span aria-hidden="true" className={`${tick} -right-px -top-px border-r-2 border-t-2`} />
            <span aria-hidden="true" className={`${tick} -bottom-px -left-px border-b-2 border-l-2`} />
            <span aria-hidden="true" className={`${tick} -bottom-px -right-px border-b-2 border-r-2`} />
        </>
    );
}
