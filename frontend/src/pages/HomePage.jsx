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
    const [isAssessing, setIsAssessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const maxChars = 3000;

    // Backend base URL:
    // - local dev: leave empty and rely on Vite proxy (requests to "/assess", "/video_id")
    // - production: set VITE_API_BASE_URL on Vercel, e.g. "https://your-backend.onrender.com"
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

    const apiUrl = (path) => `${API_BASE}${path}`;

    const postJson = async (path, body, timeoutMs = 120_000) => {
        const response = await fetch(apiUrl(path), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(timeoutMs),
        });

        const data = await response.json();

        if (!response.ok) {
            const message = (typeof data.detail === "string" ? data.detail : "Request failed");
            throw new Error(message);
        }

        return data;
    };

    const handleAssess = async () => {
        // Minimal payload expected by the backend
        const payload = {
            url: videoUrl,
            target_language: lang,
            user_input: summary,
        };

        try {
            setIsAssessing(true);
            setShowSuccess(false);

            const data = await postJson("/assess", payload, 120_000);

            setAssessData(data);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
            setTimeout(() => {
                const target = document.getElementById("assessment_complete");
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }, 300);

        } catch (error) {
            if (error.name === "TimeoutError") {
                window.alert("Request timed out. Please retry.");
            } else {
                console.error("Assessment request failed:", error);
                window.alert(error?.message || "Something went wrong.");
            }
        } finally {
            setIsAssessing(false);
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
            const data = await postJson("/video_id", { url }, 20_000);
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
                    {videoUrl && (<SummaryCard
                        maxChars={maxChars}
                        summary={summary}
                        onSummaryChange={setSummary}
                        onSubmit={handleAssess}
                        isAssessing={isAssessing}
                    />
                    )}
                    {showSuccess && (
                        <div
                            role="alert"
                            className="bg-green-100 text-green-900 border border-green-200 px-4 py-3 rounded-2xl text-sm font-medium"
                            id='assessment_complete'
                        >
                            Assessment complete.
                        </div>
                    )}

                </section>
                {assessmentData && (
                    <AssessmentSection assessmentData={assessmentData} />
                )}
            </main>
        </div>
    );
}
