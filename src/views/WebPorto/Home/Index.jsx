import { useState, useEffect } from "react";
import LayoutWeb from "../../../layouts/WebPort";
import LoadingTailwind from "../../../components/general/LoadingTailwind";
import Api from "../../../services/Api";
import CardCategory from "../../../components/general/CardCategory";

export default function Home() {
  const [profiles, setProfiles] = useState([]); // State to hold an array of profiles
  const [categories, setCategories] = useState([]); // State to hold an array of categories
  const [loadingProfiles, setLoadingProfiles] = useState(true); // Loading state for profiles
  const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for categories

  const fetchDataProfiles = async () => {
    setLoadingProfiles(true);

    try {
      const response = await Api.get(`/api/public/profiles`);
      setProfiles(response.data.data.map((profile) => ({ ...profile }))); // Map over data and create new objects
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoadingProfiles(false);
    }
  };

  const fetchDataCategories = async () => {
    setLoadingCategories(true);

    try {
      const response = await Api.get(`/api/public/categories`);
      console.log("Response Categories:", response); // Log response for debugging

      // Memeriksa apakah response.data.data adalah array
      if (Array.isArray(response.data.data)) {
        setCategories(
          response.data.data.map((category, index) => ({
            ...category,
            myId: index,
          }))
        );
      } else {
        console.error(
          "Data categories tidak berupa array:",
          response.data.data
        );
      }
    } catch (error) {
      console.error("Error fetching categories data:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchDataProfiles();
    fetchDataCategories();
  }, []);

  // Daftar warna untuk tombol
  const colors = [
    "bg-meta-1",
    "bg-meta-3",
    "bg-meta-4",
    "bg-meta-5",
    "bg-meta-6",
    "bg-meta-7",
  ];

  return (
    <LayoutWeb>
      <div className="container my-5 mb-5">
        <div className="grid grid-cols-1">
          <div className="my-5 px-6 mx-6">
            <div className="text-lg font-bold">
              <h4 className="flex items-center">
                <strong className="text-slate-700 ml-2 text-5xl">
                  Hello, folks! Discover my stories and creative ideas.
                </strong>
              </h4>
            </div>
          </div>
          {loadingProfiles ? (
            <LoadingTailwind />
          ) : (
            <div className="flex flex-wrap px-3 mx-3">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="w-full px-4 flex items-center mb-6"
                  >
                    <div className="">
                      <img
                        src={profile?.image}
                        alt={profile.title}
                        className=""
                      />
                    </div>
                    <div className="mx-28 w-3/4">
                      <h3 className="text-lg font-semibold mb-2">
                        {profile.title}
                      </h3>
                      <p className="text-sm text-gray-600">{profile.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No profiles available.
                </div>
              )}
            </div>
          )}
        </div>

        {loadingCategories ? (
          <LoadingTailwind />
        ) : (
          <div className="my-5 lg:px-6 mx-6">
            <div className="text-lg font-bold">
              <h4 className="flex items-center">
                <strong className="text-slate-900 text-4xl">Popular Tag</strong>
              </h4>
              <h4 className="mb-4">
                Popular tags feature the most widely favored topics.
              </h4>
              <hr />
            </div>
            <div className="flex flex-row flex-wrap py-3">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <CardCategory
                    key={category.id}
                    name={category.name} // Kirimkan title sebagai prop
                    colorClass={colors[index % colors.length]} // Memberikan warna berdasarkan urutan
                  />
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No Categories available.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </LayoutWeb>
  );
}
