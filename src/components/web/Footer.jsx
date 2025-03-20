import BuildWith from "./BuildWith";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <hr className="mb-8.5 border-slate-300 dark:border-slate-700 my-4" />
        <div className="mx-16 mb-8.5 items-center justify-between space-y-4 md:mb-10 md:flex md:space-y-0">
          <BuildWith />
          <div className="my-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div>{`Copyright © ${new Date().getFullYear()}`}</div>
            <span>{` • `}</span>
            <span>Dwi's Blog - Coding Adventure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
