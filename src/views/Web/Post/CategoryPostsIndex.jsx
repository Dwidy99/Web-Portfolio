import LayoutWeb from "../../../layouts/Web";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Api from "../../../services/Api";
import CardBlog from "../../../components/general/CardBlog";
import LoadingTailwind from "../../../components/general/LoadingTailwind";
import Pagination from "../../../components/general/Pagination";

export default function CategoryPostsIndex() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDataPostsByCategory = async (pageNumber = 1, searchQuery = "") => {
    setLoadingPosts(true);
    const page = pageNumber || pagination.currentPage;

    try {
      const response = await Api.get(
        `/api/public/categories/${slug}?q=${searchQuery}&page=${page}`
      );

      setPosts(response.data.data.data);
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
      setCategoryName(response.data.category_name);
      document.title = `${response.data.category_name} - My Blog`;
    } catch (error) {
      console.error("Failed to fetch posts by category:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    fetchDataPostsByCategory(pageNumber, searchTerm);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDataPostsByCategory(1, searchTerm);
  };

  useEffect(() => {
    fetchDataPostsByCategory();
  }, [slug]);

  return (
    <LayoutWeb>
      <div className="container mt-22.5">
        <div className="mx-auto px-4">
          <p className="font-bold text-gray-500">Category</p>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {categoryName || "Loading Category..."}
          </h1>
          <h2 className="text-lg mb-6 text-slate-500 dark:text-slate-300">
            List of articles in {categoryName || "this"} category
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {loadingPosts ? (
            <LoadingTailwind />
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <CardBlog
                key={post.id}
                title={post.title}
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
              No posts available in this category.
            </div>
          )}
        </div>

        {pagination.total > pagination.perPage && (
          <Pagination
            className="flex justify-end my-4"
            currentPage={pagination.currentPage}
            totalCount={pagination.total}
            pageSize={pagination.perPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </LayoutWeb>
  );
}
