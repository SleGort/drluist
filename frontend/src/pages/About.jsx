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
            Hi!👋 My name is Alex, and I am a final year graduate in Business
            Engineering at VUB. I have been learning Dutch for quite a while
            now. Still, my listening skills could use some improvement, so I've
            built Dr.Luist to help myself, and hopefully others. Another excuse
            to create an app was that I wanted to learn to work with and build
            APIs to use my machine learning skills in the future projects. If
            you enjoy data science and/or like to build stuff, we might get
            along. Let's connect and build something cool! P.S If you are
            curious how I built this project,
            <a
              className="text-blue-800 underline"
              href="https://github.com/SleGort/drluist"
              target="_blank"
            >
              here is the Github link
            </a>
            .
          </p>
          <div className="pt-2 flex justify-center">
            <a
              href="https://www.linkedin.com/in/almedev/"
              target="_blank"
              className="bg-primary hover:bg-blue-800 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
            >
              Connect{" "}
              <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
