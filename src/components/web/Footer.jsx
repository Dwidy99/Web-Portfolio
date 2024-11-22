export default function Footer() {
  return (
    <footer>
      <div className="container-fluid footer-top">
        <div className="row p-4">
          <div className="col-md-4 mb-4 mt-3">
            <h5>
              ABOUT
              <strong style={{ color: "#ffd22e" }}>MY PROFILE</strong>
            </h5>
            <hr />
            <div className="text-center">
              <img src="/images/logo-jbg.png" alt="" width="70" />
            </div>
            <p className="text-justify mt-3">
              I am a passionate front-end developer specializing in creating
              responsive and engaging web interfaces. With expertise in modern
              technologies, I am ready to deliver innovative solutions in web
              development.
            </p>
          </div>

          <div className="col-md-4 mb-4 mt-3">
            <h5>
              DOWNLOAD <strong style={{ color: "#ffd22e" }}> APP</strong>
            </h5>
            <hr />
            <div className="text-left">
              <img
                src="/images/playstore.png"
                width={"180"}
                className="text-center align-items-center"
              />
            </div>
            <p className="text-justify mt-2 text-left">
              Dapatkan info update Desa lebih cepat melalui aplikasi Android.
              Silahkan unduh melalui PlayStore.
            </p>
          </div>
          <div className="col-md-4 mb-4 mt-3">
            <h5>
              KONTAK <strong style={{ color: "#ffd22e" }}>DESA</strong>
            </h5>
            <hr />
            <p>
              <i className="fa fa-map-marker"></i> Jln. Diponegoro No. 58, Kab
              Tangerang, Tangerang, Banten, 61473
              <br />
              <br />
              <i className="fas fa-envelope"></i> 98dwiyulianto@gmail.com
              <br />
              <br />
              <i className="fas fa-phone"></i> +62 857-xxx-xxxx
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid footer-bottom">
        <div className="row p-3">
          <div className="text-center text-white font-weight-bold">
            Copyright © 2024 Dwi. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
