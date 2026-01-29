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
    const [videoId, setVideoId] = useState("");
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

    const fetchVideoId = async (url) => {
        // send API request for video id only if the video url is present.
        if (!url) {
            setVideoId("");
            return;
        }
        // get the video id
        try {
            const response = await fetch("/video_id", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Could not extract video ID.");
            }

            setVideoId(data.video_id);
        } catch (error) {
            console.error("Video ID extraction failed:", error);
            setVideoId("");
        }
    };

    const handleVideoUrlChange = (value) => {
        setVideoUrl(value);
        fetchVideoId(value);
    };

    return (
        <div className="pattern-bg min-h-screen">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-8">
                <Pitch />
                <section id="source-section" className="space-y-8">
                    <SourceCard
                        lang={lang}
                        onLangChange={setLang}
                        videoUrl={videoUrl}
                        onVideoUrlChange={handleVideoUrlChange}
                        videoId={videoId}
                    />
                    <SummaryCard
                        maxChars={maxChars}
                        summary={summary}
                        onSummaryChange={setSummary}
                        onSubmit={handleAssess}
                    />

                </section>

                <section className="space-y-8">
                    {/*
                        Here we have an assessment page that appears conditional on the successful response from the backend
                    */}
                    <OverallAssessmentCard overall_score={0.444} />
                    <AssessmentComponents
                        coverage={0.1}
                        semantic_acc={0.1}
                        relevance={0.345}
                        completeness={0.123}
                        clarity={0.1345}
                    />
                    <FurtherDetailsSection
                        good_points={['string1', 'string2', 'string3']}
                        bad_points={['string', 'string', 'string']}
                        grammar_score={'B1'}
                        grammar_text={'LOOOOOOOOOOOOOOOOOOOONG string'}
                    />
                    <BackToTheTopButton />

                </section>
            </main>
        </div>
    );
}
