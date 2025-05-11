import { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import { Link, useParams } from "react-router-dom";
import LoadingTailwind from "../../../components/general/LoadingTailwind";
import { FaCalendarAlt, FaUserEdit } from "react-icons/fa";
import DateID from "../../../utils/DateID";
import toast from "react-hot-toast";

export default function Show() {
  // init state for post details
  const [post, setPost] = useState(null); // Changed from {} to null for better null checking
  const [loadingPost, setLoadingPost] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const { slug } = useParams();

  document.title = "Show Post | Dwi's Blogs";

  const fetchDetailDataPost = async () => {
    try {
      setLoadingPost(true);
      const response = await Api.get(`/api/public/posts/${slug}`);

      setPost(response.data.data || null); // Ensure we set null if data is empty
    } catch (error) {
      console.error("Error fetching post details:", error);
      setPost(null); // Explicitly set to null on error
    } finally {
      setLoadingPost(false);
    }
  };

  const fetchAllPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await Api.get(`/api/public/posts_home`);

      setPosts(response.data.data || []);
    } catch (error) {
      if (error.name !== "AbortError") {
        toast.error(`Failed to load articles: ${error.message}`);
      }
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchDetailDataPost();
    fetchAllPosts();
  }, [slug]);

  // Show loading or error state
  if (loadingPost) {
    return (
      <LayoutWeb>
        <div className="container">
          <LoadingTailwind />
        </div>
      </LayoutWeb>
    );
  }

  // Show error if post not found
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
    <LayoutWeb>
      <div className="container">
        <div className="lg:mx-18.5 overflow-hidden pt-24 sm:py-32 lg:overflow-visible lg:px-0">
          <div className="mx-auto grid gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-start lg:gap-y-10 sm:grid-cols-1">
            {/* Post Details Section */}
            <div className="col-span-2">
              <div className="p-4 rounded-xl dark:bg-gray-800">
                <div className="lg:max-full">
                  <div className="flex justify-start mt-2">
                    {post.user && (
                      <span className="text-gray-700 dark:text-slate-400">
                        <FaUserEdit className="inline mr-2" />
                        {post.user.name}
                      </span>
                    )}
                    <span className="ml-5 text-gray-700 dark:text-slate-400">
                      <FaCalendarAlt className="inline mr-2" />
                      {DateID(new Date(post.created_at))}
                    </span>
                  </div>
                  <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-700 dark:text-slate-400 sm:text-5xl">
                    {post.title}
                  </h1>
                  <hr className="border-slate-300 dark:border-slate-700 my-4" />
                  {post.category && (
                    <span className="text-gray-700 dark:text-slate-400">
                      <Link
                        to={`/blog/category/${post.category.slug}`}
                        className="bg-slate-700 text-white py-1 px-3 rounded-md hover:bg-slate-500 focus:outline-none"
                      >
                        #{post.category.name}
                      </Link>
                    </span>
                  )}
                  <div
                    className="mt-6 text-xl/8 dark:text-gray-500"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </div>
            </div>

            {/* Latest Posts Section */}
            <div className="lg:pr-1 sm:overflow-hidden">
              <div className="lg:max-w-lg p-4 rounded-xl dark:bg-gray-800">
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-pretty text-gray-700 dark:text-slate-400 sm:text-5xl">
                  Update News
                </h3>
                <hr className="mb-8.5 border-slate-300 dark:border-slate-700 my-4" />
                {loadingPosts ? (
                  <LoadingTailwind />
                ) : (
                  <div>
                    {Array.isArray(posts) &&
                      posts.map((post, index) => (
                        <div key={index} className="mt-6">
                          <div className="flex items-center">
                            {post.image && (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="rounded-lg bg-transparent w-20 h-20 mr-4"
                              />
                            )}
                            <div>
                              <Link to={`/blog/${post.slug}`}>
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-400">
                                  {post.title?.length > 30
                                    ? `${post.title.slice(0, 30)}...`
                                    : post.title}
                                </h3>
                              </Link>
                              <span className="dark:text-gray-500">
                                {post.created_at &&
                                  DateID(new Date(post.created_at))}
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
      </div>
    </LayoutWeb>
  );
}
