//import react
import { useEffect, useState } from "react";
//import Api service
import Api from "../../services/Api";
//import component Caraousel
import { Carousel } from "bootstrap";
//import component Loading
import Loading from "../general/Loading";

export default function Slider() {
  //init state
  const [sliders, setSliders] = useState([]);
  const [loadingSlider, setLoadingSlider] = useState(true);

  //fetchData
  const fetchDataSliders = async () => {
    //setLoadingSlider "true"
    setLoadingSlider(true);

    await Api.get(`/api/public/sliders`).then((response) => {
      //assign response to state "sliders"
      setSliders(response.data.data);

      //setLoadingSlider "false"
      setLoadingSlider(false);
    });
  };

  //use useEfect
  useEffect(() => {
    //call function "fetchDataSliders"
    fetchDataSliders();
  }, []);

  return (
    <Carousel
      prevIcon={
        <i className="fa fa-chevron-left carousel-custom text-dark shadow-sm"></i>
      }
      nextIcon={
        <i className="fa fa-chevron-right carousel-custom text-dark shadow-sm"></i>
      }
    >
      {loadingSlider ? (
        <Loading />
      ) : (
        sliders.map((slider) => (
          <Carousel.Item key={slider.id}>
            <img
              src={slider.image}
              className="d-block w-100"
              style={{ height: "500px", objectFit: "cover" }}
              alt="First slide"
            />
          </Carousel.Item>
        ))
      )}
    </Carousel>
  );
}
