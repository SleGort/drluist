export default function AssessmentComponents({
    coverage,
    semantic_acc,
    relevance,
    completeness,
    clarity,
}) {
    const toPct = (v) => Math.round((v ?? 0) * 100);

    const cards = [
        {
            key: "coverage",
            label: "Key Coverage",
            weight: "WT: 40%",
            icon: "key",
            iconClass: "text-teal-500",
            value: toPct(coverage),
            tip: "How well you covered key concepts.",
        },
        {
            key: "semantic",
            label: "Semantic Overlap",
            weight: "WT: 30%",
            icon: "compare_arrows",
            iconClass: "text-purple-500",
            value: toPct(semantic_acc),
            tip: "Closeness to the original meaning.",
        },
        {
            key: "relevance",
            label: "Relevance",
            weight: "WT: 15%",
            icon: "verified",
            iconClass: "text-amber-500",
            value: toPct(relevance),
            tip: "Applicability to the topic.",
        },
        {
            key: "completeness",
            label: "Completeness",
            weight: "WT: 10%",
            icon: "checklist",
            iconClass: "text-blue-500",
            value: toPct(completeness),
            tip: "Percentage of required points addressed.",
        },
        {
            key: "clarity",
            label: "Clarity",
            weight: "WT: 5%",
            icon: "auto_fix_high",
            iconClass: "text-pink-500",
            value: toPct(clarity),
            tip: "How easy it is to understand.",
        },
    ];

    return (
        <section className="glass p-8 rounded-3xl shadow-xl shadow-blue-100/50 relative overflow-hidden">
            <h2 className="text-4xl font-black text-slate-900 text-center mb-1">
                Score Breakdown
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-8 rounded-3xl">
                {cards.map((c) => (
                    <div
                        key={c.key}
                        className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/50 relative"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span
                                className={`material-symbols-outlined text-lg ${c.iconClass}`}
                            >
                                {c.icon}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">
                                {c.weight}
                            </span>
                        </div>

                        <div className="text-2xl font-bold text-slate-900">{c.value}%</div>
                        <div className="flex items-center justify-between mt-1">
                            <div className="text-[11px] font-medium text-slate-500">
                                {c.label}
                            </div>
                            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-slate-100 cursor-help group">
                                <span className="text-slate-400 text-[10px] font-bold">?</span>
                                <div className="absolute bottom-full right-0 mb-2 w-32 p-2 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    {c.tip}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
