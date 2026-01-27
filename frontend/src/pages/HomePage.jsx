import { useState } from "react";
import Navbar from "../components/Navbar";
import Pitch from "../components/Pitch";
import SourceCard from "../components/SourceCard";
import SummaryCard from "../components/SummaryCard";

export default function HomePage() {
    const [lang, setLang] = useState("NL");
    const [videoUrl, setVideoUrl] = useState("");
    const [summary, setSummary] = useState("");

    const handleAssess = () => {
        // Placeholder for future API integration.
    };

    return (
        <div className="pattern-bg min-h-screen">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <Pitch />

                <section className="space-y-8">
                    <SourceCard
                        lang={lang}
                        onLangChange={setLang}
                        videoUrl={videoUrl}
                        onVideoUrlChange={setVideoUrl}
                    />
                    <SummaryCard
                        maxChars={3000}
                        summary={summary}
                        onSummaryChange={setSummary}
                        onSubmit={handleAssess}
                    />
                </section>
            </main>

            {/* Footer is kept simple and static to match the design. */}
            <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 text-center mt-20">
                <p className="text-slate-500 text-sm font-medium">
                    © 2024 Dr. Luist AI Learning. Built for better understanding.
                </p>
            </footer>
        </div>
    );
}
