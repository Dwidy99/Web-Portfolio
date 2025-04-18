import { useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { MdDarkMode } from "react-icons/md";

const experiences = [
  {
    company: "Younet Media",
    logo: "/static/images/experiences/younetmedia-logo.png",
    period: "Mar 2022 – Present",
    title: "Junior Software Engineer",
    link: "https://younetmedia.com",
    highlights: [
      "Build Ecomheat - a platform to monitor e-commerce industry performance.",
      "Developed and published AppCore NestJS packages (DatabaseModule, RedisModule, etc).",
    ],
  },
  {
    company: "QKIT Software",
    logo: "/static/images/experiences/qkit-logo.png",
    period: "Jan 2021 – Dec 2022",
    title: "Fresher Backend Developer",
    link: "https://qkit.vn",
    highlights: [
      "Developed internal CMS for blogs, clients, and job postings.",
      "Used NestJS, PostgreSQL, and Prisma to build scalable APIs.",
      "Contributed in Agile workflows to speed up delivery cycles.",
    ],
  },
  {
    company: "University of Information Technology",
    logo: "/static/images/experiences/uit-logo.png",
    period: "Aug 2019 – Jun 2023",
    title: "Student at School of Computer Science",
    link: "https://en.uit.edu.vn",
    highlights: [
      "Graduated with a degree in Computer Science.",
      "Chose Software Engineering focus while peers went into AI/Data.",
      "Passionate about web/app development and real-world impact.",
    ],
  },
];

export default function Index() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <LayoutWeb>
      <div className="container">
        <main className="mb-auto mt-20 lg:mx-25.5">
          <div className="about divide-y divide-gray-200 dark:divide-gray-700">
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                About
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">
                Further insights into who I am and the purpose of this blog.
              </p>
            </div>

            <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
              <div className="flex flex-col items-center space-x-2 pt-8 sm:pt-28">
                <div className="relative overflow-hidden h-48 w-48 rounded-full">
                  <img
                    alt="avatar"
                    loading="lazy"
                    width="192"
                    height="192"
                    decoding="async"
                    className="transition-all duration-500 object-cover object-center"
                    src="/_next/image?url=%2Fstatic%2Fimages%2Favatar.jpg&w=384&q=100"
                  />
                </div>
                <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
                  Do Trong Khanh
                </h3>
                <div className="text-gray-500 dark:text-gray-400">
                  Fullstack Engineer
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  YouNet Media - YouNet Group
                </div>
                <div className="mt-2 flex gap-3">
                  <a
                    href="mailto:dotrongkhanh.dev@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-200 dark:hover:text-primary-600"
                  >
                    📧
                  </a>
                  <a
                    href="https://github.com/Karhdo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-200 dark:hover:text-primary-600"
                  >
                    🐙
                  </a>
                  <a
                    href="https://www.linkedin.com/in/karhdo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-200 dark:hover:text-primary-600"
                  >
                    💼
                  </a>
                  <a
                    href="https://twitter.com/karhdo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-200 dark:hover:text-primary-600"
                  >
                    🐦
                  </a>
                </div>
              </div>

              <div className="prose max-w-none pb-8 dark:prose-dark xl:col-span-2">
                <h2>
                  Hello, folks! <span className="inline-block mx-2">👋</span>{" "}
                  I'm Trong Khanh (aka Karhdo)
                </h2>
                <p>
                  I have a passion for <strong>JavaScript/TypeScript</strong>{" "}
                  and website development. I'm currently a fullstack developer
                  at <strong>YouNet Media</strong>, deeply engaged in the{" "}
                  <strong>EcomHeat</strong> project, which entails market share
                  management, competitor research, and fostering e-commerce
                  growth. I work mainly with <strong>JavaScript</strong>,{" "}
                  <strong>TypeScript</strong>, <strong>React</strong>,{" "}
                  <strong>NodeJS</strong>, <strong>NestJS</strong>, and{" "}
                  <strong>NextJS</strong>.
                </p>
                <h2>Why have this blog?</h2>
                <blockquote>
                  <p>
                    My desire to practice my skills and share my acquired
                    knowledge fuels my endeavors.
                  </p>
                </blockquote>
                <p>
                  I founded this blog as a means to document and share the
                  knowledge and practical wisdom I've acquired during my journey
                  as a software engineer.
                </p>
                <p>
                  Writing and taking notes helps me solidify my understanding of
                  new concepts and technologies. I hope my blog can be a useful
                  resource for fellow web developers.
                </p>
                <p>
                  I would greatly appreciate your thoughts and comments on what
                  I have written <span>🍻</span>.
                </p>

                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Career</h2>
                  <a
                    href="/static/resume.pdf"
                    target="_blank"
                    className="border border-transparent bg-gray-200 hover:opacity-80 dark:bg-primary-600 text-black hover:text-black dark:text-white dark:hover:text-white focus:shadow-outline-blue focus:outline-none transition-colors duration-150 text-sm font-medium rounded-lg px-4 py-2 shadow"
                  >
                    Resume 📄
                  </a>
                </div>
                <ul className="mt-6 space-y-4">
                  {experiences.map((exp, index) => (
                    <li
                      key={index}
                      className="relative flex flex-col gap-2 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div
                        className="flex items-start gap-4 cursor-pointer"
                        onClick={() => toggle(index)}
                      >
                        <div className="flex-shrink-0 h-12 w-12 bg-white rounded-md overflow-hidden">
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="object-contain h-full w-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {exp.period}
                          </div>
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-gray-900 dark:text-white hover:underline"
                          >
                            {exp.company}
                          </a>
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {exp.title}
                          </div>
                        </div>
                        <span className="text-gray-400 dark:text-gray-300">
                          {openIndex === index ? "▲" : "▼"}
                        </span>
                      </div>

                      {openIndex === index && (
                        <ul className="list-disc ml-16 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {exp.highlights.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>

                <hr className="my-4" />
                <h2>Tech stack</h2>
                <p>
                  This blog is built with{" "}
                  <a target="_blank" href="https://nextjs.org/">
                    Next.js
                  </a>{" "}
                  and{" "}
                  <a target="_blank" href="https://tailwindcss.com/">
                    Tailwind CSS
                  </a>{" "}
                  using <strong>Tailwind Nextjs Starter Blog</strong>.
                </p>

                <p>
                  This blog site takes inspiration from leohuynh.dev. I
                  appreciate{" "}
                  <a target="_blank" href="https://twitter.com/hta218_">
                    Leo Huynh
                  </a>{" "}
                  and{" "}
                  <a target="_blank" href="https://twitter.com/timlrxx">
                    Timothy Lin
                  </a>{" "}
                  for their contribution to this minimal, lightweight, and
                  highly customizable blog starter.
                </p>

                <p>
                  A few major over-engineering-changes from the original repo:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FaReact className="mr-2 mt-1 text-xl flex-shrink-0" />
                    <span>
                      Upgrading to <strong>React 18</strong>,{" "}
                      <strong>Next 14</strong>.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <SiTypescript className="mr-2 mt-1 text-xl flex-shrink-0" />
                    <span>
                      Adopting <strong>Typescript</strong>, committing with{" "}
                      <a
                        target="_blank"
                        href="https://www.conventionalcommits.org"
                        className="underline hover:text-blue-500"
                      >
                        Conventional Commits
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MdDarkMode className="mr-2 mt-1 text-xl flex-shrink-0" />
                    <span>
                      Theming in dark mode with{" "}
                      <a
                        target="_blank"
                        href="https://github.com/folke/tokyonight.nvim"
                        className="underline hover:text-blue-500"
                      >
                        Tokyonight Neovim Theme
                      </a>{" "}
                      colors for better contrast.
                    </span>
                  </li>
                </ul>

                <p>
                  See my{" "}
                  <a
                    target="_blank"
                    href="https://github.com/Karhdo/karhdo.dev"
                  >
                    repository
                  </a>{" "}
                  for this blog.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </LayoutWeb>
  );
}
