export default function GoodCard({ good_points }) {
    const points = Array.isArray(good_points) ? good_points : [];

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/50 relative overflow-hidden">
            <div className="bg-emerald-50/60 px-6 py-4 border-b border-emerald-50 flex items-center gap-3">
                <span className="material-symbols-outlined text-lg text-emerald-600">
                    check_circle
                </span>
                <h3 className="text-lg font-bold text-slate-900">What was good</h3>
            </div>
            <div className="p-6">
                <ul className="space-y-4">
                    {points.map((point, index) => (
                        <li
                            key={`${index}-${point}`}
                            className="flex gap-3 text-slate-600 leading-relaxed"
                        >
                            <span className="material-symbols-outlined text-xl text-emerald-500">
                                done
                            </span>
                            <span className="min-w-0 break-words">{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
