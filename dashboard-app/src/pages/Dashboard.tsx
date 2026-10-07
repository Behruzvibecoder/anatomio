import MainColumn from "../components/MainColumn";
import RightRail from "../components/RightRail";

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <MainColumn />
        </div>
        <div className="min-w-0">
          <RightRail />
        </div>
      </div>

      <footer className="mt-8 flex flex-col gap-2 border-t border-ink/[0.08] pt-5 text-[9.5px] text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Anatomio — learn, practice, master anatomy.</p>
        <p className="flex items-center gap-4">
          <a href="#/" className="transition-colors duration-300 hover:text-ink">
            Help centre
          </a>
          <a href="#/" className="transition-colors duration-300 hover:text-ink">
            Privacy
          </a>
          <a href="#/" className="transition-colors duration-300 hover:text-ink">
            Terms
          </a>
        </p>
      </footer>
    </>
  );
}
