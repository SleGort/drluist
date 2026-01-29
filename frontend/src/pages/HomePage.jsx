import { useState } from "react";
import Navbar from "../components/Navbar";
import Pitch from "../components/Pitch";
import SourceCard from "../components/SourceCard";
import SummaryCard from "../components/SummaryCard";
import AssessmentSection from "../components/AssessmentSection";


export default function HomePage() {
    const [lang, setLang] = useState("NL");
    const [videoUrl, setVideoUrl] = useState("");
    const [summary, setSummary] = useState("");
    const [videoId, setVideoId] = useState("");
    const [assessmentData, setAssessData] = useState(null);
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
            setAssessData(data);
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
                <Pitch id="pitch" />
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
                {assessmentData && (
                    <AssessmentSection assessmentData={assessmentData} />
                )}
            </main>
        </div>
    );
}
