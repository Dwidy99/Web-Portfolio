import { useState, useEffect } from "react";
import LayoutWeb from "../../../layouts/Web";
import LoadingTailwind from "../../../components/general/LoadingTailwind";
import Api from "../../../services/Api";
import CardCategory from "../../../components/general/CardCategory";
import RandomColors from "../../../utils/RandomColors"; // Import RandomColors
import CardPost from "../../../components/general/CardPost";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fetchDataPosts = async () => {
    setLoadingPosts(true);

    try {
      const response = await Api.get(`/api/public/posts_home`);

      setPosts(response.data.data.map((post) => ({ ...post })));
    } catch (error) {
      console.error("Error fetching posts data:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchDataProfiles = async () => {
    setLoadingProfiles(true);

    try {
      const response = await Api.get(`/api/public/profiles`);
      setProfiles(response.data.data.map((profile) => ({ ...profile })));
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
    fetchDataPosts();
  }, []);

  return (
    <LayoutWeb>
      <div className="container">
        <h4 className="flex items-center text-center font-bold lg:my-22.5 xsm:mt-22.5 lg:mx-25.5 xsm:mx-7.5">
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

      <div className="container">
        <div className="mx-22.5">
          <div className="text-lg font-bold">
            <h4 className="flex items-center">
              <strong className="text-slate-900 text-4xl dark:text-gray-500">
                Popular Tag
              </strong>
            </h4>
            <h4 className="mb-4 dark:text-slate-300">
              Popular tags feature the most widely favored topics.
            </h4>
            <hr />
          </div>
          {loadingCategories ? (
            <LoadingTailwind />
          ) : (
            <div className="flex flex-wrap justify-between py-3">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <CardCategory
                    key={category.id}
                    name={category.name}
                    image={category.image}
                    colorClass={RandomColors()} // Random color for each category
                  />
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No Categories available.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <div className="mx-22.5">
          {loadingPosts ? (
            <LoadingTailwind />
          ) : (
            <ul role="list" className="divide-y divide-gray-100">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <CardPost
                    key={post.id}
                    image={post.image}
                    slug={post.slug}
                    title={post.title}
                    content={post.content}
                    date={post.created_at}
                  />
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No posts available.
                </div>
              )}
            </ul>
          )}
        </div>
      </div>
    </LayoutWeb>
  );
}
