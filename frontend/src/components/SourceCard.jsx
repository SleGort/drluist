import LanguageSelector from "./LanguageSelector";

export default function SourceCard({ lang, onLangChange, videoUrl, onVideoUrlChange }) {
    return (
        <section className="glass p-8 rounded-3xl shadow-xl shadow-blue-100/50">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                        1
                    </span>
                    <h2 className="font-display text-xl font-semibold">Select your source</h2>
                </div>

                <LanguageSelector value={lang} onChange={onLangChange} />
            </header>

            <div className="w-full">
                <div className="relative w-full">
                    {/* Icon is positioned absolutely so the input padding can be consistent. */}
                    <span
                        className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        aria-hidden="true"
                    >
                        link
                    </span>
                    <input
                        id="videoLink"
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        type="text"
                        placeholder="Paste YouTube link here..."
                        value={videoUrl}
                        onChange={(event) => onVideoUrlChange(event.target.value)}
                    />
                </div>
            </div>
        </section>
    );
}
