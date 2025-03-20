import LayoutWeb from "../../../layouts/Web";

export default function index() {
  return (
    <LayoutWeb>
      <div className="container text-gray-100 bg-slate-400">
        <div className="mx-auto px-4 lg:max-w-7xl py-24 text-center md:text-left">
          <div className="relative py-6 md:py-0">
            <img
              className="origin-bottom-right right-0 -bottom-96 static md:absolute w-100 md:w-96 lg:w-2/5"
              src="/img/petanikode-hero.svg"
              alt="Petani Kode"
            />
          </div>
          <div className="w-100 md:w-1/2">
            <h1 className="text-6xl font-bold mb-5 tracking-tighter">
              Petani Kode
            </h1>
            <p className="text-2xl font-light max-w-1/2">
              Belajar budidaya kode <i>(coding)</i> dengan tutorial yang mudah
              dipahami. <i>Mostly</i> pakai Linux.
            </p>
            <div className="mt-5 flex flex-row gap-3 justify-center md:justify-start">
              <a
                href="/tutorial/"
                className="px-3 py-2 bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-teal-400 rounded-lg active:bg-teal-500"
              >
                Mulai Belajar
              </a>
              <a
                href="#newsletter"
                data-turbo="false"
                className="px-3 py-2 bg-teal-400/10 border border-teal-400/50 hover:bg-teal-700 focus:ring-2 focus:ring-teal-400 text-teal-100 rounded-lg active:bg-teal-500"
              >
                Join Newsletter
              </a>
            </div>
          </div>
        </div>
      </div>
    </LayoutWeb>
  );
}
