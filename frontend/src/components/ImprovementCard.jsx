export default function ImprovementCard({ bad_points }) {
    const points = Array.isArray(bad_points) ? bad_points : [];

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/50 relative overflow-hidden">
            <div className="bg-blue-50/60 px-6 py-4 border-b border-blue-50 flex items-center gap-3">
                <span className="material-symbols-outlined text-lg text-blue-600">
                    trending_up
                </span>
                <h3 className="text-lg font-bold text-slate-900">Areas to improve</h3>
            </div>
            <div className="p-6">
                <ul className="space-y-4">
                    {points.map((point, index) => (
                        <li
                            key={`${index}-${point}`}
                            className="flex gap-3 text-slate-600 leading-relaxed"
                        >
                            <span className="material-symbols-outlined text-xl text-blue-500">
                                arrow_forward
                            </span>
                            <span className="min-w-0 break-words">{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
