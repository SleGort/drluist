import Navbar from "../components/Navbar";

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
                    <div className="pt-2">
                        <button
                            type="button"
                            className="bg-primary hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
                        >
                            <span>Connect</span>
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-9 7H7v9h3v-9zm-1.5-5.25A1.75 1.75 0 1 0 8.5 8.5a1.75 1.75 0 0 0 0-3.5zM20 13.5c0-2.21-1.79-4-4-4a3.99 3.99 0 0 0-3 1.33V10h-3v9h3v-4.5a2 2 0 0 1 4 0V19h3z" />
                            </svg>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
