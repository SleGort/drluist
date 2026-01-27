export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 glass border-b border-slate-200">
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined" aria-hidden="true">
                            psychology
                        </span>
                    </div>

                    {/* Brand text uses the display font + gradient like the Stitch design. */}
                    <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Dr. Luist
                    </span>
                </div>

                <a className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors" href="#about">
                    About
                </a>
            </nav>
        </header>
    );
}
