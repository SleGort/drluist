export default function SummaryCard({ maxChars, summary, onSummaryChange, onSubmit }) {
    return (
        <section className="glass p-8 rounded-3xl shadow-xl shadow-blue-100/50" id="inputSection">
            <header className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                        2
                    </span>
                    <h2 className="font-display text-xl font-semibold">Your Summary</h2>
                </div>
            </header>

            <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-500" htmlFor="summaryInput">
                    Enter key bullet points or a short summary of the video content to evaluate your listening.
                </label>

                <textarea
                    id="summaryInput"
                    className="w-full p-6 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                    maxLength={maxChars}
                    rows={8}
                    placeholder="Type what you understood from the video here..."
                    value={summary}
                    onChange={(e) => onSummaryChange(e.target.value)}
                />

                <button
                    className="w-full bg-primary hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
                    type="button"
                    onClick={onSubmit}
                >
                    {/* Material Symbols work via the font loaded in index.html. */}
                    <span className="material-symbols-outlined">
                        analytics
                    </span>
                    Assess My Understanding
                </button>
            </div>
        </section>
    );
}
