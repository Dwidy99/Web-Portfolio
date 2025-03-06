import { AiOutlineJavaScript } from "react-icons/ai";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function BuildWith() {
  return (
    <div className="flex items-center space-x-1">
      <span className="mr-1 text-gray-500 dark:text-gray-400">Build with</span>

      <div className="flex space-x-1.5">
        <Link href="https://nextjs.org">
          <FaReact style={{ color: "#2596be" }} />
        </Link>
        <Link href="https://tailwindcss.com">
          <RiTailwindCssFill style={{ color: "#2587be" }} />
        </Link>
        <Link href="https://www.typescriptlang.org">
          <AiOutlineJavaScript
            style={{ color: "#1b1b1a" }}
            className="dark:bg-slate-500"
          />
        </Link>
      </div>
    </div>
  );
}
