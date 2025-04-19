import LayoutWeb from "../../../layouts/Web";
import { Link } from "react-router-dom";
import CardBlog from "../../../components/general/CardBlog";
import { useEffect, useState } from "react";
import LoadingTailwind from "../../../components/general/LoadingTailwind";
import Api from "../../../services/Api";
import Pagination from "../../../components/general/Pagination";
import toast from "react-hot-toast";

export default function Index() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchError, setFetchError] = useState(null);

  // fetch data posts dari API
  const fetchDataPosts = async (pageNumber = 1, query = "") => {
    setLoadingPosts(true);
    setFetchError(null); // Reset error state

    const page = pageNumber || pagination.currentPage;

    try {
      const response = await Api.get(
        `/api/public/posts?page=${page}&q=${encodeURIComponent(query)}`
      );

      setPosts(response.data.data.data);
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      toast.error("Failed to load articles. Please try again later.");
      setFetchError(true); // Set error state
    } finally {
      setLoadingPosts(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    fetchDataPosts(pageNumber, searchTerm);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDataPosts(1, searchTerm);
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-16 xsm:mt-22.5 mx-7.5">
        {" "}
        {/* Penyesuaian margin dan padding container */}
        <p className="font-bold text-gray-500">Articles</p>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Explore Artikel
        </h1>
        <h2 className="text-lg mb-6 text-slate-500 dark:text-slate-300">
          List of articles in my Blogs
        </h2>
        {/* 🔍 Form Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center mb-8 gap-2"
        >
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-1/2 px-8 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* 📦 List Artikel */}
      <div className="container grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {loadingPosts ? (
          <LoadingTailwind />
        ) : fetchError ? (
          <div className="col-span-full text-center text-red-500">
            Failed to load articles. Please check your connection and try again.
            {/* Anda bisa menambahkan tombol "Coba Lagi" di sini */}
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <CardBlog
              key={post.id}
              title={post.title}
              category={post.category}
              content={post.content || "No description available"}
              image={post.image}
            >
              <p className="text-sm font-medium text-right text-blue-600 hover:underline">
                <Link to={`/blog/${post.slug}`}>Read more →</Link>
              </p>
            </CardBlog>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No posts available.
          </div>
        )}
      </div>

      {/* 📄 Pagination */}
      <div className="container px-18">
        <Pagination
          className="flex justify-end my-4"
          currentPage={pagination.currentPage}
          totalCount={pagination.total}
          pageSize={pagination.perPage}
          onPageChange={handlePageChange}
        />
      </div>
    </LayoutWeb>
  );
}
