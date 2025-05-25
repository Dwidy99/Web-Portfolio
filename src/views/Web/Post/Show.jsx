import { useEffect, useState, useCallback } from "react";
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import { Link, useParams } from "react-router-dom";
import LoadingTailwind from "../../../components/general/LoadingTailwind";
import { FaCalendarAlt, FaUserEdit } from "react-icons/fa";
import DateID from "../../../utils/DateID";
import toast from "react-hot-toast";
import SEO from "../../../components/general/SEO";
// Import SnowEffect component (conditionally disable it)
import SnowEffect from "../../../components/general/SnowEffect";

export default function Show() {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const { slug } = useParams();

  document.title = "Show Post Dwi's | Blogs";

  const isShowPage = false;

  // Fetch post details based on slug
  const fetchDetailDataPost = useCallback(async () => {
    try {
      setLoadingPost(true);
      const response = await Api.get(`/api/public/posts/${slug}`);
      setPost(response.data.data || null);
    } catch (error) {
      console.error("Error fetching post details:", error);
      setPost(null); // Display "Post not found" if error
    } finally {
      setLoadingPost(false);
    }
  }, [slug]);

  // Fetch all posts for latest posts section
  const fetchAllPosts = useCallback(async () => {
    try {
      setLoadingPosts(true);
      const response = await Api.get(`/api/public/posts_home`);
      setPosts(response.data.data || []);
    } catch (error) {
      toast.error(`Failed to load articles: ${error.message}`, {
        position: "top-center",
      });
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    fetchDetailDataPost();
    fetchAllPosts();
  }, [slug, fetchDetailDataPost, fetchAllPosts]);

  // If post is loading, show loading spinner
  if (loadingPost) {
    return (
      <LayoutWeb>
        <div className="container">
          <LoadingTailwind />
        </div>
      </LayoutWeb>
    );
  }

  // If post not found, show error message
  if (!post) {
    return (
      <LayoutWeb>
        <div className="container text-center py-20">
          <h1 className="text-2xl font-bold text-red-500">Post not found</h1>
          <Link
            to="/blog"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </LayoutWeb>
    );
  }

  return (
    <LayoutWeb disableSnow>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags?.join(",")}
      />
      {/* Conditionally render SnowEffect */}
      {isShowPage && (
        <SnowEffect snowSpeedFactor={0.1} isShowPage={isShowPage} />
      )}
      {/* Adjust speed if needed */}
      <div className="container px-4 sm:px-6 md:px-8 py-6">
        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* Post Details Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
              <div className="flex justify-start mt-2">
                {post.user && (
                  <span className="text-gray-300">
                    <FaUserEdit className="inline mr-2" />
                    {post.user.name}
                  </span>
                )}
                <span className="ml-5 text-gray-300">
                  <FaCalendarAlt className="inline mr-2" />
                  {DateID(new Date(post.created_at))}
                </span>
              </div>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
                {post.title}
              </h1>
              <hr className="border-gray-700 my-4" />
              {post.category && (
                <span className="text-gray-300">
                  <Link
                    to={`/blog/category/${post.category.slug}`}
                    className="bg-gray-700 text-white py-1 px-3 rounded-md"
                  >
                    #{post.category.name}
                  </Link>
                </span>
              )}
              <div className="mt-6">
                <div
                  className="custom-content-style"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </div>

          {/* Latest Posts Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-medium text-gray-300 sm:text-2xl">
                Update News
              </h2>
              <hr className="border-gray-700 my-4" />
              {loadingPosts ? (
                <LoadingTailwind />
              ) : (
                <div>
                  {posts
                    .filter(
                      (p) => !(p.title === post.title && p.slug === post.slug)
                    )
                    .map((p, index) => (
                      <div key={index} className="mt-6">
                        <div className="flex items-center">
                          {p.image && (
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-20 h-20 rounded-lg mr-4"
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                          <div>
                            <Link to={`/blog/${p.slug}`}>
                              <h3 className="text-xl font-semibold text-gray-300">
                                {p.title?.length > 30
                                  ? `${p.title.slice(0, 30)}...`
                                  : p.title}
                              </h3>
                            </Link>
                            <span className="text-gray-500">
                              {p.created_at && DateID(new Date(p.created_at))}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutWeb>
  );
}
