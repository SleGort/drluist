export default function BackToTheTopButton() {
    const handleClick = () => {
        const target = document.getElementById("source-section");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="flex justify-center mb-12">
            <button
                type="button"
                onClick={handleClick}
                className="bg-primary hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
            >
                <span className="material-symbols-outlined text-xl">arrow_upward</span>
                Go back to the top
            </button>
        </div>
    );
}
