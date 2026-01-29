import OverallAssessmentCard from "./OverallAssessmentCard";
import AssessmentComponents from "./AssessmentComponents";
import FurtherDetailsSection from "./FurtherDetailsSection";
import BackToTheTopButton from "./BackToTheTopButton";

export default function AssessmentSection({ assessmentData }) {
    if (!assessmentData) {
        return null;
    }

    const { metrics, details } = assessmentData.assessment;

    return (
        <section className="space-y-8">
            <OverallAssessmentCard overall_score={assessmentData.overall_score} />
            <AssessmentComponents
                coverage={metrics?.coverage}
                semantic_acc={metrics?.semantic_acc}
                relevance={metrics?.relevance}
                completeness={metrics?.completeness}
                clarity={metrics?.clarity}
            />
            <FurtherDetailsSection
                good_points={details?.good_points}
                improvement_points={details?.improvement_points}
                grammar_score={details?.grammar_score}
                grammar_text={details?.grammar_text}
            />
            <BackToTheTopButton />
        </section>
    );
}
