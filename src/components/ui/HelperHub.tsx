// HelperHub's own styling of its name: all lowercase, with "hub" in bold, as in its logo. Use this wherever
// the name is shown; plain-text places (titles, descriptions, alt text, llms.txt) spell it "helperhub".
export function HelperHub() {
    return (
        <span className="font-normal whitespace-nowrap">
            helper<b className="font-bold">hub</b>
        </span>
    );
}
