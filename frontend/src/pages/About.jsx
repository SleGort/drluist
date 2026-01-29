import Navbar from "../components/Navbar";
import linkedinIcon from "../assets/LinkedIn_icon.svg";

export default function About() {
    return (
        <div className="pattern-bg min-h-screen">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <section className="glass p-8 rounded-3xl shadow-xl shadow-blue-100/50 space-y-6">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                        About
                    </h1>
                    <p className="text-slate-600 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className="pt-2 flex justify-center">
                        <button
                            type="button"
                            onClick={() => window.open("https://www.linkedin.com/in/almedev/", "_blank", "noreferrer")}
                            className="bg-primary hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
                        >
                            Connect <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
                        </button>

                    </div>
                </section>
            </main>
        </div>
    );
}
