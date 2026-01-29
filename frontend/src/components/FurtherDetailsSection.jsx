import GoodCard from './GoodCard'
import ImprovementCard from './ImprovementCard'


export default function FurtherDetailsSection({ good_points, improvement_points }) {
    return (
        <section className="glass p-8 rounded-3xl shadow-xl shadow-blue-100/50 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-8 rounded-3xl">
                <GoodCard good_points={good_points} />
                <ImprovementCard improvement_points={improvement_points} />
            </div>
            <>

            </>
        </section>
    );


}