export default function OverallAssessmentCard({ overall_score }) {
    // overall_score is expected to be a float in [0, 1]

    const pct = Math.round(overall_score * 100);

    // Messaging based on score buckets
    let headline = "";
    let body = "";

    switch (true) {
        case overall_score > 0.8:
            headline = "Excellent Comprehension!";
            body = "Your summary effectively captured the core message of the video with high semantic precision.";
            break;
        case overall_score > 0.6:
            headline = "Good Understanding";
            body = "You captured most of the important ideas. Rewatch once and try adding 1–2 key specifics for a stronger summary.";
            break;
        case overall_score > 0.5:
            headline = "Almost There — Try Again";
            body = "You understood parts of the video, but some key points are missing or unclear. Rewatch and focus on the main storyline and outcomes.";
            break;
        default:
            headline = "Consider a Simpler Video";
            body =
                "This one may be too difficult right now. Try a shorter or slower video, then summarize again and build up gradually.";
    }

    // Static progress ring 
    const ringStyle = {
        background: `conic-gradient(#14b8a6 ${pct}%, #e2e8f0 0)`,
    };

    return (
        <section className="glass p-8 rounded-3xl shadow-xl shadow-blue-100/50 relative overflow-hidden">
            <div className="absolute top-10 right-12 opacity-10 flex gap-2 items-end">
                <div className="w-4 h-12 bg-slate-300 rounded-full"></div>
                <div className="w-4 h-20 bg-slate-300 rounded-full"></div>
                <div className="w-4 h-16 bg-slate-300 rounded-full"></div>
            </div>

            <div className="flex flex-col items-center text-center">
                <span className="px-5 py-2 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-8">
                    Assessment Results
                </span>

                <div className="relative w-56 h-56 flex items-center justify-center mb-8">
                    <div
                        className="absolute inset-0 rounded-full"
                        style={ringStyle}
                    ></div>

                    <div className="absolute inset-5 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                        <span className="text-6xl font-black text-slate-900 leading-none">
                            {pct}%
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
                            Overall Score
                        </span>
                    </div>
                </div>

                <h2 className="text-4xl font-black text-slate-900 mb-3">{headline}</h2>
                <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">{body}</p>
            </div>
        </section>
    );
}
