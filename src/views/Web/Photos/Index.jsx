//import react
import { useEffect, useState } from "react";
//import LayoutWeb
import LayoutWeb from "../../../layouts/Web";
//import Loading
import Loading from "../../../components/general/Loading";
//import CardPhoto
import CardPhoto from "../../../../components/general/CardPhoto";
//import AlertDataEmpty
import AlertDataEmpty from "../../../../components/general/AlertDataEmpty";
//import Api
import Api from "../../../../services/Api";
//import Pagination
import Pagination from "../../../../components/general/Pagination";

export default function WebPhotosIndex() {
  //page title
  document.title = "Galeri Foto - Rajeg Village";

  //init state
  const [photos, setPhotos] = useState([]);
  const [loadingPhoto, setLoadingPhoto] = useState(true);

  //define state "Pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //fetch data photo
  const fetchDataPhotos = async (pageNumber = 1) => {
    //set loadingPhoto "true"
    setLoadingPhoto(true);

    //init page variabel
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/public/photos?page=${page}`).then((response) => {
      //assign response to state "photos"
      setPhotos(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));

      //setLoadingPage "false"
      setLoadingPhoto(false);
    });
  };

  //useEffect
  useEffect(() => {
    //call function fetchDataPhoto
    fetchDataPhotos();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-images"></i> PHOTOS GALLERY
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingPhoto ? (
            <Loading />
          ) : photos.length > 0 ? (
            photos.map((photo) => (
              <CardPhoto
                key={photo.id}
                image={photo.image}
                caption={photo.caption}
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
          onChange={(pageNumber) => fetchDataPhotos(pageNumber)}
          position="center"
        />
      </div>
    </LayoutWeb>
  );
}
