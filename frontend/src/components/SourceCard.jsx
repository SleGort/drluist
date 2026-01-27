import LanguageSelector from "./LanguageSelector";

const LANGS = ["NL", "FR", "DE", "EN"];

export default function SourceCard({ lang, onLangChange }) {
    return (
        <section className="card card--source">
            <header className="card__header">
                <div className="stepTitle">
                    <span className="stepTitle__num">1</span>
                    <h2 className="stepTitle__text">Select your source</h2>
                </div>

                <LanguageSelector
                    value={lang}
                    options={LANGS}
                    onChange={onLangChange}
                />
            </header>

            <div className="card__body">
                <div className="sourceRow">
                    <div className="sourceRow__input">
                        <span className="sourceRow__icon" aria-hidden="true">
                            🔗
                        </span>
                        <input
                            className="sourceRow__field"
                            type="text"
                            placeholder="Paste YouTube link here..."
                        />
                    </div>

                    <button className="sourceRow__button" type="button">
                        Process Video
                    </button>
                </div>
            </div>
        </section>
    );
}