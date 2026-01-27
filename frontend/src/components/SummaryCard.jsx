export default function SummaryCard({ maxChars }) {
    return (
        <section className="card card--summary">
            <header className="card__header">
                <div className="stepTitle">
                    <span className="stepTitle__num">2</span>
                    <h2 className="stepTitle__text">Your Summary</h2>
                </div>
            </header>

            <div className="card__body">
                <p className="summary__hint">
                    Enter key bullet points or a short summary of the video content to
                    evaluate your listening.
                </p>

                <textarea
                    className="summary__textarea"
                    maxLength={maxChars}
                    rows={8}
                    placeholder="Type what you understood from the video here..."
                />

                <div className="summary__meta">Max {maxChars} characters.</div>

                <button className="summary__button" type="button">
                    Assess My Understanding
                </button>
            </div>
        </section>
    );
}