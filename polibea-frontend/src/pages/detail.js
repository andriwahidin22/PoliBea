import Head from "next/head";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Index - QuickStart Bootstrap Template</title>
        <link rel="icon" href="/assets/img/favicon.png" />
        <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" />
        <link rel="stylesheet" href="/assets/vendor/aos/aos.css" />
        <link rel="stylesheet" href="/assets/vendor/glightbox/css/glightbox.min.css" />
        <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
      </Head>

      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="/" className="logo d-flex align-items-center me-auto">
            <img src="/assets/img/logo.png" alt="Logo" />
            <h1 className="sitename">Lo</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Daftar Beasiswa</a></li>
              <li className="dropdown">
                <a href="#">
                  <span>Beasiswa</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li><a href="#">KIP Kuliah</a></li>
                  <li><a href="#">Beasiswa Pendidikan Tinggi</a></li>
                  <li><a href="#">Afirmasi Pendidikan Tinggi (ADIK)</a></li>
                  <li><a href="#">Petani Berjaya</a></li>
                  <li><a href="#">Karya Selembe Empat (KSE)</a></li>
                  <li><a href="#">Generasi Beasiswa Indonesia (GenBI)</a></li>
                </ul>
              </li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a className="btn-getstarted" href="#about">About PoliBea</a>
        </div>
      </header>

      <main className="main">
        {/* Swiper Carousel */}
        <section id="slider-section" className="slider-section section">
          <div className="container">
            <Swiper
              modules={[Navigation, Pagination]}
              loop={true}
              pagination={{ clickable: true }}
              navigation={true}
              className="init-swiper"
            >
              <SwiperSlide>
                <img src="/assets/img/features-3.jpg" alt="Slide 1" className="img-fluid" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/img/features-2.jpg" alt="Slide 2" className="img-fluid" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/assets/img/features-1.jpg" alt="Slide 3" className="img-fluid" />
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        {/* More Features Section */}
        <section id="more-features" className="more-features section">
          <div className="container">
            <div className="row justify-content-around gy-4">
              <div className="col-lg-6 d-flex flex-column justify-content-center order-2 order-lg-1" data-aos="fade-up" data-aos-delay="100">
                <h3>Enim quis est voluptatibus aliquid consequatur</h3>
                <p>Esse voluptas cumque vel exercitationem. Reiciendis est hic accusamus.</p>
              </div>
              <div className="features-image col-lg-5 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="200">
                <img src="/assets/img/features-3.jpg" alt="Features" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="footer position-relative light-background">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="/" className="logo d-flex align-items-center">
                <span className="sitename">PoliBea</span>
              </a>
            </div>
          </div>
        </div>
        <div className="container copyright text-center mt-4">
          <p>© <strong className="px-1 sitename">PolinelaBea</strong> All Rights Reserved</p>
        </div>
      </footer>

      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="/assets/vendor/php-email-form/validate.js"></script>
      <script src="/assets/vendor/aos/aos.js"></script>
      <script src="/assets/vendor/glightbox/js/glightbox.min.js"></script>
      <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
    </>
  );
}
