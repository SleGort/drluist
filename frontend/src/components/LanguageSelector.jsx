const LANG_OPTIONS = ["NL", "FR", "DE", "EN"];

export default function LanguageSelector({ value, onChange }) {
    return (
        <div className="flex flex-col gap-4">
            {/* Mobile: a native select is the simplest accessible control. */}
            <select
                className="block md:hidden w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {LANG_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>

            {/* Desktop: pills match the Stitch screenshot. */}
            <div
                className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1 rounded-full"
                role="group"
                aria-label="Language selection"
            >
                {LANG_OPTIONS.map((opt) => (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => onChange(opt)}
                        className={
                            opt === value
                                ? "px-4 py-2 text-xs font-bold rounded-full bg-primary text-white shadow-md shadow-primary/20 transition-all"
                                : "px-4 py-2 text-xs font-bold rounded-full text-slate-600 hover:bg-white border border-transparent transition-all"
                        }
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
