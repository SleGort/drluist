import { useState } from "react";
import Navbar from "../components/Navbar";
import Pitch from "../components/Pitch";
import SourceCard from "../components/SourceCard";
import SummaryCard from "../components/SummaryCard";

export default function HomePage() {
    const [lang, setLang] = useState("NL");
    const [videoUrl, setVideoUrl] = useState("");
    const [summary, setSummary] = useState("");
    const maxChars = 3000;

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
                        maxChars={maxChars}
                        summary={summary}
                        onSummaryChange={setSummary}
                        onSubmit={handleAssess}
                    />
                </section>
            </main>
        </div>
    );
}
