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
    "bg-meta-11",
    "bg-meta-13",
    "bg-meta-14",
    "bg-meta-15",
    "bg-meta-7",
    "bg-meta-1",
  ];

  return (
    <LayoutWeb>
      <div className="container">
        <h4 className="flex items-center my-30 mx-25.5 font-bold">
          <strong className="text-slate-600 xsm:text-5xl lg:text-7xl">
            Hello, folks! Discover my stories and creative ideas.
          </strong>
        </h4>
      </div>
      {loadingProfiles ? (
        <LoadingTailwind />
      ) : (
        <div className="container">
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <div
                key={profile.id}
                className="grid grid-cols-2 gap-2 justify-items-center mx-22.5 xsm:grid-cols-1 items-center mb-6 lg:grid-cols-2"
              >
                <div className="max-w-96 xsm:order-2 lg:order-1">
                  <img
                    src={profile?.image}
                    alt={profile.title}
                    className="w-full rounded-3xl"
                  />
                </div>
                <div className="w-full xsm:order-1 xsm:p-5 lg:order-2">
                  <h3 className="text-2xl font-semibold mb-2">
                    {profile.title}
                  </h3>
                  <p className="text-md text-gray-600">{profile.content}</p>
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

      {loadingCategories ? (
        <LoadingTailwind />
      ) : (
        <div className="container">
          <div className="mx-22.5">
            <div className="text-lg font-bold">
              <h4 className="flex items-center">
                <strong className="text-slate-900 text-4xl">Popular Tag</strong>
              </h4>
              <h4 className="mb-4">
                Popular tags feature the most widely favored topics.
              </h4>
              <hr />
            </div>
            <div className="flex flex-wrap justify-between py-3">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <CardCategory
                    key={category.id}
                    name={category.name} // Kirimkan title sebagai prop
                    image={category.image}
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
        </div>
      )}
    </LayoutWeb>
  );
}
