import LayoutWeb from "../../../layouts/Web";
import { Link } from "react-router-dom";
import CardBlog from "../../../components/general/CardBlog";
import { useEffect, useState } from "react";
import LoadingTailwind from "../../../components/general/LoadingTailwind";
import Api from "../../../services/Api";
import Pagination from "../../../components/general/Pagination";

export default function Index() {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });
  const [loadingPosts, setLoadingPosts] = useState(false);

  const fetchDataPosts = async (pageNumber = 1) => {
    setLoadingPosts(true);
    const page = pageNumber || pagination.currentPage;

    try {
      const response = await Api.get(`/api/public/posts?page=${page}`);

      setPosts(response.data.data.data);
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    fetchDataPosts(pageNumber);
  };

  useEffect(() => {
    fetchDataPosts();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-25.5">
        <div>
          <p className="font-bold text-gray-500">Articles</p>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Explore Artikel
          </h1>
          <h2 className="text-lg mb-8 text-slate-500 dark:text-slate-300">
            List of articles in my Blogs
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
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
              No posts available.
            </div>
          )}
        </div>

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
