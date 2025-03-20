import { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import { Link, useParams } from "react-router-dom";
import LoadingTailwind from "../../../components/general/LoadingTailwind";
import { FaCalendarAlt, FaUserEdit } from "react-icons/fa";
import DateID from "../../../utils/DateID";

export default function Show() {
  // init state for post details
  const [post, setPost] = useState({});
  const [loadingPost, setLoadingPost] = useState(true);

  // init state for all posts on the homepage
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // destructure slug from URL
  const { slug } = useParams();

  // fetch single post details
  const fetchDetailDataPost = async () => {
    try {
      setLoadingPost(true);
      const response = await Api.get(`/api/public/posts/${slug}`);
      setPost(response.data.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    } finally {
      setLoadingPost(false);
    }
  };

  // fetch all posts
  const fetchAllPosts = async () => {
    try {
      setLoadingPosts(true);
      const response = await Api.get(`/api/public/posts_home`);
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching all posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  // useEffect hook to fetch data on page load
  useEffect(() => {
    fetchDetailDataPost();
    fetchAllPosts();
  }, [slug]);

  return (
    <LayoutWeb>
      <div className="container">
        <div className="lg:mx-18.5 overflow-hidden pt-24 sm:py-32 lg:overflow-visible lg:px-0">
          <div className="mx-auto grid gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-start lg:gap-y-10 sm:grid-cols-1">
            {/* Post Details Section */}
            <div className="col-span-2">
              {loadingPost ? (
                <LoadingTailwind />
              ) : (
                <div className="p-4 rounded-xl dark:bg-gray-800">
                  <div className="lg:max-full">
                    <div className="flex justify-start mt-2">
                      <span className="text-gray-700 dark:text-slate-400">
                        <FaUserEdit className="inline mr-2" />
                        {post.user?.name}
                      </span>

                      <span className="ml-5 text-gray-700 dark:text-slate-400">
                        <FaCalendarAlt className="inline mr-2" />
                        {DateID(new Date(post.created_at))}
                      </span>
                    </div>
                    <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-700 dark:text-slate-400 sm:text-5xl">
                      {post.title}
                    </h1>
                    <hr className="border-slate-300 dark:border-slate-700 my-4" />
                    <span className="text-gray-700 dark:text-slate-400">
                      <Link
                        to={`/categories/${post.slug}`}
                        type="button"
                        className="bg-slate-700 text-white py-1 px-3 rounded-md hover:bg-slate-500 focus:outline-none"
                      >
                        #{post.category?.name}
                      </Link>
                    </span>

                    <p
                      className="mt-6 text-xl/8 dark:text-gray-500"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    ></p>
                  </div>
                </div>
              )}
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
                    {posts.map((post, index) => (
                      <div key={index} className="mt-6">
                        <div className="flex items-center">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="rounded-lg bg-transparent w-20 h-20 mr-4"
                          />
                          <div>
                            <h4 className="text-xl font-semibold text-gray-700 dark:text-slate-400">
                              {post.title.length > 30
                                ? `${post.title.slice(0, 30)}...`
                                : post.title}
                            </h4>
                            <span className="dark:text-gray-500">
                              {DateID(new Date(post.created_at))}
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
