export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1B2A4A] border-t border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0D9488] flex items-center justify-center">
            <span className="text-white font-bold text-xs">SG</span>
          </div>
          <span className="text-white font-semibold">
            Skills<span className="text-[#0D9488]">Grid</span>
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center gap-6">
          {["Home", "About", "Solutions", "How It Works", "Who It's For", "Contact"].map(
            (label, i) => {
              const hrefs = [
                "#home",
                "#about",
                "#solutions",
                "#how-it-works",
                "#who",
                "#contact",
              ];
              return (
                <a
                  key={label}
                  href={hrefs[i]}
                  className="text-white/40 hover:text-white/80 text-sm transition-colors"
                >
                  {label}
                </a>
              );
            }
          )}
        </nav>

        {/* Copyright */}
        <p className="text-white/30 text-xs text-center">
          © {year} SkillsGrid · MICT SETA Hackathon · NMU · Bay Software
        </p>
      </div>
    </footer>
  );
}
