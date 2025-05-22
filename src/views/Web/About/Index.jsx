import React, { useState, useEffect, Suspense } from "react";
import Api from "../../../services/Api";
import toast from "react-hot-toast";
import AccordionItem from "../../../components/general/AccordionItem";
import SanitizedHTML from "../../../components/general/SanitizedHTML";
import SEO from "../../../components/general/SEO";
const LayoutWeb = React.lazy(() => import("../../../layouts/Web"));

export default function Index() {
  const [profiles, setProfiles] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [loadingExperiences, setLoadingExperiences] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);

  document.title = "About Dwi | Blogs";

  const toggle = (index) => {
    if (openIndex === index) {
      // Close currently open item
      setOpenIndex(null);
    } else {
      // Open new item
      setOpenIndex(index);
    }
  };

  // Format date to display as "Month Year"
  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const fetchDataProfiles = async () => {
    setLoadingProfiles(true);
    try {
      const response = await Api.get(`/api/public/profiles`);
      setProfiles(response.data.data[0]); // ambil item pertama
    } catch (error) {
      toast.error(`Failed to load profile data: ${error}`, {
        position: "top-center",
        duration: 5000,
      });
    } finally {
      setLoadingProfiles(false);
    }
  };

  const fetchDataExperiences = async () => {
    setLoadingExperiences(true);
    try {
      const response = await Api.get(`/api/public/experiences`);

      const sortedExperiences = response.data.data?.sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date)
      );
      setExperiences(sortedExperiences || []);
    } catch (error) {
      toast.error(`Failed to load experience data: ${error}`, {
        position: "top-center",
        duration: 5000,
      });
    } finally {
      setLoadingExperiences(false);
    }
  };

  const fetchDataContacts = async () => {
    setLoadingContacts(true);
    try {
      const response = await Api.get(`/api/public/contacts`);
      setContacts(response.data.data.data);
    } catch (error) {
      toast.error(`Failed to load contact data: ${error}`, {
        // Perbaiki pesan error
        position: "top-center",
        duration: 5000,
      });
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    fetchDataProfiles();
    fetchDataExperiences();
    fetchDataContacts();
  }, []);

  // 👇 Tambahkan ini setelah useEffect di atas
  useEffect(() => {
    if (experiences.length > 0) {
      setOpenIndex(0);
    }
  }, [experiences]);

  if (loadingProfiles || !profiles || loadingContacts) {
    return (
      <LayoutWeb>
        <div className="container mt-20 text-center text-gray-600 dark:text-gray-300">
          Loading profiles...
        </div>
      </LayoutWeb>
    );
  }

  return (
    <LayoutWeb>
      <SEO />
      <div className="container">
        <main className="mb-auto mt-20 lg:mx-25.5">
          <div className="about divide-y divide-gray-200 dark:divide-gray-700">
            {/* Title Section */}
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
              <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100">
                About
              </h1>
              <p className="text-base text-gray-500 dark:text-gray-400">
                Further insights into who I am and the purpose of this blog.
              </p>
            </div>

            <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
              {/* Profile */}
              <div className="flex flex-col items-center pt-8 sm:pt-28">
                <div className="relative overflow-hidden h-48 w-48 rounded-full">
                  <img
                    alt={profiles.title}
                    loading="lazy"
                    width="192"
                    height="192"
                    className="transition-all object-cover object-center"
                    src={profiles.image}
                  />
                </div>
                <h3 className="pt-4 text-2xl text-gray-900 dark:text-gray-100">
                  {profiles.name}
                </h3>
                <div className="text-gray-500">{profiles.title}</div>
                <ul className="flex flex-row mt-2 justify-between">
                  {contacts &&
                  Array.isArray(contacts) &&
                  contacts.length > 0 ? (
                    contacts.map((contact, index) => (
                      <li
                        key={index}
                        className="flex items-center dark:text-gray-400"
                      >
                        {contact.image ? (
                          <a
                            href={contact.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            <img
                              src={contact.image}
                              alt={contact.name}
                              className="w-10 h-10 object-cover mx-2 rounded-full"
                            />
                          </a>
                        ) : (
                          <span className="text-xs text-gray-400">
                            No Image
                          </span>
                        )}
                      </li>
                    ))
                  ) : (
                    <p className="dark:text-gray-400">No contacts available.</p>
                  )}
                </ul>
                {/* munculkan contact disini */}
              </div>

              {/* About & Experiences */}
              <div className="prose max-w-none pb-8 xl:col-span-2">
                <h2 className="mt-4 font-bold text-4xl text-gray-900 dark:text-gray-100">
                  Hello, folks! 👋 I am {profiles.name}
                </h2>
                <SanitizedHTML
                  html={profiles.about}
                  className="custom-content-style" // Optional additional classes
                />

                <h2 className="font-bold text-4xl text-gray-900 dark:text-gray-100">
                  Why have this blog?
                </h2>
                <SanitizedHTML
                  html={profiles.description}
                  className="custom-content-style" // Optional additional classes
                />

                {profiles.blogPurpose?.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}

                <div className="flex items-center justify-between mt-8">
                  <h2 className="text-4xl font-bold">My Career</h2>
                </div>

                {/* Experiences */}
                {loadingExperiences ? (
                  <div className="text-gray-600 mt-6">
                    Loading experiences...
                  </div>
                ) : (
                  <ul className="mt-6 space-y-4">
                    {experiences.map((exp, index) => (
                      <AccordionItem
                        key={index}
                        exp={exp}
                        index={index}
                        isOpen={openIndex === index}
                        onClick={toggle}
                        formatDate={formatDate}
                      />
                    ))}
                  </ul>
                )}

                <hr className="my-4" />
                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  Tech stack
                </h2>
                <SanitizedHTML
                  html={profiles.tech_description}
                  className="custom-content-style" // Optional additional classes
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </LayoutWeb>
  );
}
