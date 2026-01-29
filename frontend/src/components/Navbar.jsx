import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 glass border-b border-slate-200">
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link className="flex items-center gap-2" to="/">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined">
                            psychology
                        </span>
                    </div>

                    <span className="font-display text-2xl font-bold tracking-tight text-primary">
                        Dr. Luist
                    </span>
                </Link>

                <Link
                    className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
                    to="/about"
                >
                    About
                </Link>
            </nav>
        </header>
    );
}
