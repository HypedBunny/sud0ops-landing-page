"use client";

import { useEffect, useRef } from "react";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { ZERO_DOT, ZERO_PATHS } from "@/components/ui/logo-glyphs";
import { STILL_PIN, easeInOut, easeOut, pinProgress, placePiece, seg, useMedia, useScrollFrame } from "@/lib/motion";

// The four stages, in the corners of the amber screen. Clockwise from the top left, like the loop.
const stages = [
    { name: "Discover", lead: "know what to buy before you buy it", points: ["what your team actually needs", "tools that overlap or go unused", "a plan sized to budget and skills"], corner: "film-quad-tl" },
    { name: "Build", lead: "from plan to working systems", points: ["configure and connect your tools", "automations where they help", "documented, built to last"], corner: "film-quad-tr" },
    { name: "Adopt", lead: "technology your team uses every day", points: ["hands-on onboarding", "plain English, no jargon", "your team runs it without me"], corner: "film-quad-br" },
    { name: "Support", lead: "help when things change", points: ["support when it breaks", "tune it as you grow", "then back to discover ↻"], corner: "film-quad-bl" },
];
// How the hero 0's pieces part as you zoom in (icon units and degrees), and where the amber screen's
// pieces fly in from. Both follow ZERO_PATHS: top left, top right, bottom left, bottom right.
const OPEN = [[-130, -110, -8], [130, -110, 8], [-130, 110, 8], [130, 110, -8]];
const FLY = [[-900, -700], [900, -700], [-900, 700], [900, 700]];
// Which stage card each piece brings in: the pieces arrive clockwise.
const ARRIVAL = [0, 1, 3, 2];
const AMBER = "#FFB800";

// "Enter the loop": the hero pins for a few screens of scrolling. The copy slides away, the 0 opens and
// the view zooms through its centre into an amber screen ("You're inside the loop"), where the four
// stages arrive one by one around a 0 that rebuilds itself, with you at the centre. All of it is in the
// page as text. On short screens and with reduced motion (STILL_PIN) it lays out as two plain sections.
export function Film() {
    const still = useMedia(STILL_PIN);
    const wrap = useRef<HTMLElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const zoom = useRef<HTMLDivElement>(null);
    const big = useRef<SVGSVGElement>(null);
    const copy = useRef<HTMLDivElement>(null);
    const amber = useRef<HTMLDivElement>(null);
    const inside = useRef<HTMLHeadingElement>(null);
    const you = useRef<HTMLParagraphElement>(null);
    const openPieces = useRef<(SVGPathElement | null)[]>([]);
    const flyPieces = useRef<(SVGPathElement | null)[]>([]);
    const flyDot = useRef<SVGCircleElement>(null);
    const quads = useRef<(HTMLDivElement | null)[]>([]);
    const layout = useRef({ cx: 0, cy: 0, width: 0, height: 0, mobile: false });
    const wasStill = useRef(false);
    const browserBar = useRef<string | null>(null);

    // While the amber screen fills the view, the browser bar (theme-color, on phones) and the wrapper
    // behind the panel turn amber too, so no dark strip shows above or below it as that bar slides.
    function tint(on: boolean) {
        const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
        if (on === (browserBar.current !== null) || !meta) return;
        if (on) browserBar.current = meta.content;
        meta.content = on ? AMBER : (browserBar.current ?? meta.content);
        if (!on) browserBar.current = null;
        wrap.current?.style.setProperty("background-color", on ? AMBER : "");
    }
    useEffect(() => () => tint(false), []);

    // Everything the frames below write, cleared when the layout goes still.
    function reset() {
        tint(false);
        for (const el of [zoom.current, copy.current, amber.current, inside.current, you.current, ...quads.current]) el?.removeAttribute("style");
        for (const piece of [...openPieces.current, ...flyPieces.current]) {
            piece?.removeAttribute("transform");
            piece?.removeAttribute("fill-opacity");
        }
        flyDot.current?.setAttribute("r", String(ZERO_DOT.r));
        layout.current = { cx: 0, cy: 0, width: 0, height: 0, mobile: false };
    }

    // Sizes the hero 0 into the space the copy leaves: to its right on wide screens, below it on narrow
    // ones, and centres the zoom on the 0's centre. On narrow screens it stays clear of the copy and of the
    // scroll cue at the foot of the screen, allowing for the header that sits above the panel at the top of
    // the page; when that leaves too little room, the 0 waits just below the fold and rises into view as
    // the film starts. Reads layout boxes (offset*), which ignore the copy's slide, and writes only when
    // something changed.
    function place() {
        const box = panel.current, svg = big.current, text = copy.current;
        if (!box || !svg || !text) return;
        const width = box.clientWidth, height = box.clientHeight, mobile = width < 900;
        let zeroHeight: number, cx: number, cy: number;
        if (mobile) {
            const above = wrap.current ? wrap.current.getBoundingClientRect().top + window.scrollY : 0;
            const top = text.offsetTop + text.offsetHeight + 24, bottom = height - above - 80;
            if (bottom - top >= 96) {
                zeroHeight = Math.min(height * 0.34, bottom - top);
                cy = top + zeroHeight / 2;
            } else {
                zeroHeight = height * 0.3;
                cy = height - above + 24 + zeroHeight / 2;
            }
            cx = width / 2;
        } else {
            const right = text.offsetLeft + text.offsetWidth, room = width - right - 32;
            zeroHeight = Math.min(height * 0.84, (room * 760) / 600);
            cx = right + 16 + room / 2;
            cy = height / 2;
        }
        const last = layout.current;
        if (last.cx === cx && last.cy === cy && last.width === width && last.height === height) return;
        const zeroWidth = (zeroHeight * 600) / 760;
        Object.assign(svg.style, { width: `${zeroWidth}px`, height: `${zeroHeight}px`, left: `${cx - zeroWidth / 2}px`, top: `${cy - zeroHeight / 2}px`, visibility: "visible" });
        if (zoom.current) zoom.current.style.transformOrigin = `${cx}px ${cy}px`;
        layout.current = { cx, cy, width, height, mobile };
    }

    useScrollFrame(() => {
        if (still) {
            if (!wasStill.current) reset();
            wasStill.current = true;
            return;
        }
        wasStill.current = false;
        if (!wrap.current || !panel.current) return;
        place();
        const p = pinProgress(wrap.current, panel.current);
        const { cx, cy, width, height, mobile } = layout.current;

        const away = easeInOut(seg(p, 0.02, 0.12));
        if (copy.current) {
            copy.current.style.opacity = (1 - away).toFixed(3);
            copy.current.style.transform = `translate(${(-80 * away).toFixed(1)}px, ${mobile ? "0" : "-50%"})`;
        }

        const open = easeInOut(seg(p, 0.05, 0.26));
        openPieces.current.forEach((piece, i) => placePiece(piece, OPEN[i][0] * open, OPEN[i][1] * open, OPEN[i][2] * open));
        const centre = easeInOut(seg(p, 0.06, 0.28));
        const scale = Math.exp(Math.log(34) * easeInOut(seg(p, 0.1, 0.46)));
        if (zoom.current) zoom.current.style.transform = `translate(${((width / 2 - cx) * centre).toFixed(1)}px, ${((height / 2 - cy) * centre).toFixed(1)}px) scale(${scale.toFixed(4)})`;

        const fill = seg(p, 0.42, 0.47);
        if (amber.current) {
            amber.current.style.opacity = fill.toFixed(3);
            amber.current.style.visibility = fill > 0 ? "visible" : "hidden";
        }
        tint(fill === 1 && wrap.current.getBoundingClientRect().bottom > 0);
        const shown = seg(p, 0.48, 0.53), gone = seg(p, 0.58, 0.62);
        if (inside.current) {
            inside.current.style.opacity = (shown * (1 - gone)).toFixed(3);
            inside.current.style.transform = `translate(-50%, -50%) scale(${(0.92 + 0.08 * easeOut(shown) - 0.2 * gone).toFixed(3)})`;
        }
        flyPieces.current.forEach((piece, i) => {
            const arrive = easeOut(seg(p, 0.6 + ARRIVAL[i] * 0.07, 0.67 + ARRIVAL[i] * 0.07));
            placePiece(piece, FLY[i][0] * (1 - arrive), FLY[i][1] * (1 - arrive));
            piece?.setAttribute("fill-opacity", Math.min(1, arrive * 2.5).toFixed(2));
            const card = quads.current[ARRIVAL[i]];
            if (card) {
                card.style.opacity = arrive.toFixed(3);
                card.style.transform = `translate(${(FLY[i][0] * 0.03 * (1 - arrive)).toFixed(1)}px, ${(FLY[i][1] * 0.03 * (1 - arrive)).toFixed(1)}px)`;
            }
        });
        const dot = easeOut(seg(p, 0.9, 0.95));
        flyDot.current?.setAttribute("r", (ZERO_DOT.r * dot).toFixed(1));
        if (you.current) you.current.style.opacity = dot.toFixed(3);
    });

    return (
        <section id="film" ref={wrap} aria-label="Enter the loop" className="pin-wrap pin-wrap-film scroll-mt-0 bg-brand-black">
            <ScrollCue label="scroll" more=" to enter the loop" />
            <div ref={panel} className="pin-panel bg-brand-black">
                <div ref={zoom} aria-hidden="true" className="film-stage absolute inset-0 will-change-transform">
                    <svg ref={big} viewBox="49 63 600 760" className="absolute overflow-visible">
                        {ZERO_PATHS.map((d, i) => <path key={d} ref={(el) => { openPieces.current[i] = el; }} d={d} className="fill-brand-blue" />)}
                        <circle className="fill-brand-accent" cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} />
                    </svg>
                </div>

                <div ref={copy} className="film-copy flex flex-col gap-4 min-[900px]:gap-[22px]">
                    <p className="self-start rounded-full bg-brand-accent px-3.5 py-1.5 text-sm font-semibold text-brand-black">
                        Alex-Jay Beukes · DevOps &amp; platform engineer, Cape Town
                    </p>
                    <h1 className="flex flex-col gap-3 font-heading">
                        <span className="text-[clamp(20px,2.2vw,32px)] font-bold tracking-[-0.03em] text-slate-400">
                            It’s rarely a <span className="line-through decoration-brand-accent decoration-4">technology</span> problem.
                        </span>
                        <span className="pb-[0.1em] text-[clamp(40px,11vw,64px)] leading-[0.92] font-extrabold tracking-[-0.055em] text-brand-paper min-[900px]:text-[clamp(52px,7.4vw,124px)]">
                            It’s an <span className="mark-amber my-[0.06em]">operations</span> problem.
                        </span>
                    </h1>
                    <p className="max-w-[560px] text-[15px] leading-relaxed text-slate-300 min-[900px]:text-lg">
                        I look after cloud platforms that already carry real customers, and I improve them without taking them down. Through Sud0ops I work with small businesses, growing teams and NPOs, and I do the build work myself, alongside your team.
                    </p>
                </div>


                <div ref={amber} className="film-amber bg-brand-accent text-brand-black">
                    <svg viewBox="49 63 600 760" aria-hidden="true" className="film-zero overflow-visible">
                        {ZERO_PATHS.map((d, i) => <path key={d} ref={(el) => { flyPieces.current[i] = el; }} d={d} className="fill-brand-black" />)}
                        <circle ref={flyDot} className="fill-brand-black" cx={ZERO_DOT.cx} cy={ZERO_DOT.cy} r={ZERO_DOT.r} />
                    </svg>
                    <h2 ref={inside} className="film-inside font-heading font-extrabold tracking-[-0.055em]">You’re inside the loop.</h2>
                    <div className="film-quads">
                        {stages.map((stage, i) => (
                            <div key={stage.name} ref={(el) => { quads.current[i] = el; }} className={`film-quad ${stage.corner}`}>
                                <span className="font-mono text-xs font-bold">0{i + 1} / 04</span>
                                <h3 className="font-heading text-[clamp(34px,4.4vw,68px)] leading-[0.92] font-extrabold tracking-[-0.05em]">{stage.name}</h3>
                                <p className="film-quad-detail font-mono text-xs">{stage.lead}</p>
                                <ul className="film-quad-detail mt-1 font-mono text-xs leading-[1.75]">
                                    {stage.points.map((point) => <li key={point}>› {point}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <p ref={you} aria-hidden="true" className="film-you font-mono text-xs font-bold text-brand-accent">you</p>
                </div>
            </div>
        </section>
    );
}
