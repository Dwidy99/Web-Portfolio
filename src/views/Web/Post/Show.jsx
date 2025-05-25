import { useEffect, useState, useCallback } from "react";
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import { Link, useParams } from "react-router-dom";
import LoadingTailwind from "../../../components/general/LoadingTailwind";
import { FaCalendarAlt, FaUserEdit } from "react-icons/fa";
import DateID from "../../../utils/DateID";
import toast from "react-hot-toast";
import SEO from "../../../components/general/SEO";
import SanitizedHTML from "../../../components/general/SanitizedHTML"; // ✅ Tambahkan ini

export default function Show() {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const { slug } = useParams();

  document.title = "Show Post Dwi's | Blogs";

  const fetchDetailDataPost = useCallback(async () => {
    try {
      setLoadingPost(true);
      const response = await Api.get(`/api/public/posts/${slug}`);
      setPost(response.data.data || null);
    } catch (error) {
      console.error("Error fetching post details:", error);
      setPost(null);
    } finally {
      setLoadingPost(false);
    }
  }, [slug]);

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

  if (loadingPost) {
    return (
      <LayoutWeb>
        <div className="container">
          <LoadingTailwind />
        </div>
      </LayoutWeb>
    );
  }

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
      <div className="container mx-8 mt-22.5 sm:px-6 md:px-8">
        <div className="lg:grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg shadow-lg p-6 bg-slate-200 text-slate-700">
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
                <SanitizedHTML
                  html={post.content}
                  className="custom-content-style"
                />
              </div>
            </div>
          </div>

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
