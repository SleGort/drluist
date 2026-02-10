import GoodCard from './GoodCard';
import GrammarCard from './GrammarCard';
import ImprovementCard from './ImprovementCard';


export default function FurtherDetailsSection({
    good_points,
    improvement_points,
    grammar_score,
    grammar_text,
    grammar_feedback,
}) {
    return (
        <section className="glass p-8 rounded-3xl shadow-xl shadow-blue-100/50 relative overflow-hidden">
            <h2 className="text-2xl sm:text-2xl font-black text-slate-900 text-center mb-6">
                <span className="inline-flex items-center justify-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">analytics</span>
                    </span>
                    <span>Further Details</span>
                </span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GoodCard good_points={good_points} />
                <ImprovementCard improvement_points={improvement_points} />
            </div>
            <div className="mt-6">
                <GrammarCard
                    grammar_score={grammar_score}
                    grammar_text={grammar_text}
                    grammar_feedback={grammar_feedback}
                />
            </div>
        </section>
    );

}
