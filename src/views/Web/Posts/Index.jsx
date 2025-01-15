//import LayoutWeb
import { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import CardPost from "../../../components/general/CardPost";
import Loading from "../../../components/general/Loading";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import Pagination from "../../../components/general/Pagination";
import Api from "../../services/Api";

export default function WebPostsIndex() {
  //title page
  document.title = "NEWS - Rajeg Village";

  //init state
  const [posts, setPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //fetch data posts
  const fetchDataPosts = async (pageNumber = 1) => {
    //setLoadingPost "true"
    setLoadingPost(true);

    //define variabel "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/public/posts?page=${page}`).then((response) => {
      //assign response to state "posts"
      setPosts(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));

      //setLoadingPost "false"
      setLoadingPost(false);
    });
  };

  //useEffect
  useEffect(() => {
    //call function fatchDataPost
    fetchDataPosts();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-images"></i> NEWS VILLAGE
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingPost ? (
            <Loading />
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <CardPost
                key={post.id}
                image={post.image}
                slug={post.slug}
                title={post.title}
                content={post.content}
                date={post.create_at}
              />
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
        <Pagination
          currentPage={pagination.currentPage}
          perPage={pagination.perPage}
          total={pagination.total}
          onChange={(pageNumber) => fetchDataPosts(pageNumber)}
          position="center"
        />
      </div>
    </LayoutWeb>
  );
}
