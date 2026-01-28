import { useState } from "react";
import Navbar from "../components/Navbar";
import Pitch from "../components/Pitch";
import SourceCard from "../components/SourceCard";
import SummaryCard from "../components/SummaryCard";
import OverallAssessmentCard from "../components/OverallAssessmentCard";
import AssessmentComponents from "../components/AssessmentComponents";
import FurtherDetailsSection from "../components/FurtherDetailsSection";
import BackToTheTopButton from "../components/BackToTheTopButton";

export default function HomePage() {
    const [lang, setLang] = useState("NL");
    const [videoUrl, setVideoUrl] = useState("");
    const [summary, setSummary] = useState("");
    const maxChars = 3000;

    const handleAssess = async () => {
        // Minimal payload expected by the backend
        const payload = {
            url: videoUrl,
            target_language: lang,
            user_input: summary,
        };

        try {
            const response = await fetch("/assess", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                signal: AbortSignal.timeout(120_000),
            });

            const data = await response.json();

            if (!response.ok) {
                const message = (typeof data.detail === "string" ? data.detail : "Request failed");
                throw new Error(message);
            }

            console.log("Assessment response:", data);
            window.alert("Assessment received. Check console for details.");

        } catch (error) {
            if (error.name === "TimeoutError") {
                window.alert("Request timed out. Please retry.");
            } else {
                console.error("Assessment request failed:", error);
                window.alert(error?.message || "Something went wrong.");
            }
        }
    };

    return (
        <div className="pattern-bg min-h-screen">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <Pitch />
                <section id="source-section" className="space-y-8">
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
                <section>
                    {/*
                        Here we have an assessment page that appears conditional on the successful response from the backend
                    <OverallAssessmentCard />
                    <AssessmentComponents />
                    <FurtherDetailsSection />
                    <BackToTheTopButton />
                    */}
                </section>
            </main>
        </div>
    );
}
