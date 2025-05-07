import LayoutWeb from "../../../layouts/Web";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingTailwind from "../../../components/general/LoadingTailwind";
import Api from "../../../services/Api";
import toast from "react-hot-toast";
import CardProjects from "../../../components/general/CardProjects";

export default function Index() {
  const [photos, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // fetch data photos dari API
  const fetchDataPosts = async () => {
    setLoadingPosts(true);
    setFetchError(null); // Reset error state

    try {
      const response = await Api.get(`/api/public/photos`);

      setPosts(response.data.data.data);
    } catch (error) {
      toast.error(`Failed to load articles. Please try again later. ${error}`);
      setFetchError(true); // Set error state
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  return (
    <LayoutWeb>
      <div className="container">
        <div className="mt-16 lg:mx-22 xsm:mt-22.5">
          {" "}
          {/* Penyesuaian margin dan padding */}
          <h2 className="text-3xl font-bold text-gray-500">Projects</h2>
          <p className="tracking-tight mb-2">
            My open-source side projects and stuff that I built with my
            colleagues at work
          </p>
          <hr className="my-8" />
        </div>

        {/* 📦 List Artikel */}
        <div className="grid lg:mx-22 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {loadingPosts ? (
            <LoadingTailwind />
          ) : fetchError ? (
            <div className="col-span-full text-center text-red-500">
              Failed to load articles. Please check your connection and try
              again.
              {/* Anda bisa menambahkan tombol "Coba Lagi" di sini */}
            </div>
          ) : photos.length > 0 ? (
            photos.map((photo) => (
              <CardProjects
                key={photo.id}
                image={photo.image}
                title={photo.title || "No title available"}
                description={photo.description || "No description available"}
                caption={photo.caption || "No caption available"}
              >
                <p className="text-sm font-medium text-right text-blue-600 hover:underline">
                  <Link to={`/blog/${photo.slug}`}>Learn more →</Link>
                </p>
              </CardProjects>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No photos available.
            </div>
          )}
        </div>
      </div>
    </LayoutWeb>
  );
}
