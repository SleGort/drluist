export default function GrammarCard({ grammar_score, grammar_text }) {
    const score = grammar_score ?? "--";
    const text = grammar_text ?? "";

    return (
        <section className="bg-primary rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-blue-900/20">
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start md:items-stretch">
                <div className="shrink-0 flex flex-col items-center justify-center bg-white/10 rounded-2xl p-8 backdrop-blur-md w-full md:w-44 border border-white/20">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-100 mb-2">
                        Grammar Score
                    </span>
                    <div className="text-6xl font-black">{score}</div>
                </div>
                <div className="flex-1 min-w-0 md:self-stretch flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center gap-3">
                        <span className="material-symbols-outlined">spellcheck</span>
                        Grammar Assessment
                    </h3>
                    <div className="bg-black/10 rounded-2xl p-6 border border-white/10 w-full min-w-0 overflow-hidden flex-1">
                        <p className="text-blue-50 leading-loose text-sm italic whitespace-normal break-all max-w-full">
                            {text}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
