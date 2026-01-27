export default function Pitch({ titleTop, titleAccent, subtitle }) {
    return (
        <section className="pitch">
            <h1 className="pitch__title">
                {titleTop} <span className="pitch__accent">{titleAccent}</span>
            </h1>
            <p className="pitch__subtitle">{subtitle}</p>
        </section>
    );
}