import Head from "next/head";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swiper from "swiper";
import "swiper/swiper-bundle.css"; // Pastikan untuk mengimpor CSS Swiper

export default function Home() {
  useEffect(() => {
    AOS.init();

    // Inisialisasi Swiper
    const swiper = new Swiper(".init-swiper", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Index - QuickStart Bootstrap Template</title>
        <link href="/assets/img/favicon.png" rel="icon" />
        <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
        <link
          href="/assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link
          href="/assets/vendor/swiper/swiper-bundle.min.css"
          rel="stylesheet"
        />
        <link href="/assets/css/main.css" rel="stylesheet" />
      </Head>

      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a href="/" className="logo d-flex align-items-center me-auto">
            <img src="/assets/img/logo.png" alt="" />
            <h1 className="sitename">Lo</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#features">Daftar Beasiswa</a>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>Beasiswa</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li>
                    <a href="#">KIP Kuliah</a>
                  </li>
                  <li>
                    <a href="#">Beasiswa Pendidikan Tinggi</a>
                  </li>
                  <li>
                    <a href="#">Afirmasi Pendidikan Tinggi (ADIK)</a>
                  </li>
                  <li>
                    <a href="#">Petani Berjaya</a>
                  </li>
                  <li>
                    <a href="#">Karya Selembe Empat (KSE)</a>
                  </li>
                  <li>
                    <a href="#">Generasi Beasiswa Indonesia (GenBI)</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a className="btn-getstarted" href="#about">
            About PoliBea
          </a>
        </div>
      </header>

      <main className="main">
        {/* Featured Services Section */}
        <section
          id="featured-services"
          className="featured-services section light-background"
        >
         
        </section>

        {/* More Features Section */}
        <section id="more-features" className="more-features section">
          <div className="container">
            <div className="row justify-content-around gy-4">
              <div
                className="col-lg-6 d-flex flex-column justify-content-center order-2 order-lg-1"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h3>Enim quis est voluptatibus aliquid consequatur</h3>
                <p>
                  Esse voluptas cumque vel exercitationem. Reiciendis est hic
                  accusamus. Non ipsam et sed minima temporibus laudantium.
                  Soluta voluptate sed facere corporis dolores excepturi
                </p>
                <div className="row">
                  <div className="col-lg-6 icon-box d-flex">
                    <i className="bi bi-easel flex-shrink-0"></i>
                    <div>
                      <h4>Lorem Ipsum</h4>
                      <p>
                        Voluptatum deleniti atque corrupti quos dolores et quas
                        molestias{" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 icon-box d-flex">
                    <i className="bi bi-patch-check flex-shrink-0"></i>
                    <div>
                      <h4>Nemo Enim</h4>
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiise
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 icon-box d-flex">
                    <i className="bi bi-brightness-high flex-shrink-0"></i>
                    <div>
                      <h4>Dine Pad</h4>
                      <p>
                        Explicabo est voluptatum asperiores consequatur magnam.
                        Et veritatis odit
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 icon-box d-flex">
                    <i className="bi bi-brightness-high flex-shrink-0"></i>
                    <div>
                      <h4>Tride clov</h4>
                      <p>
                        Est voluptatem labore deleniti quis a delectus et. Saepe
                        dolorem libero sit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="features-image col-lg-5 order-1 order-lg-2"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <img src="/assets/img/features-3.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer id="footer" className="footer position-relative light-background">
  <div className="container footer-top">
    <div className="row gy-4">
      
      {/* Tentang PoliBea */}
      <div className="col-lg-4 col-md-6 footer-about">
        <a href="/" className="logo d-flex align-items-center">
          <span className="sitename">PoliBea</span>
        </a>
        <ul className="list-unstyled mt-3">
          <li>
            <i className="fa fa-map-marker"></i> 
            <a href="http://bit.ly/GMapsPolinela" target="_blank" rel="noopener noreferrer">Google Maps</a><br />
            Jl. Soekarno Hatta No.10, Rajabasa Raya, Kec. Rajabasa, Kota Bandar Lampung, Lampung 35144
          </li>
          <li><i className="fa fa-phone"></i> Telepon: (0721) 703-995</li>
          <li><i className="fa fa-fax"></i> Fax: (0721) 787-309</li>
          <li>
            <i className="fa fa-envelope"></i> 
            Email: <a href="mailto:info@polinela.ac.id">info@polinela.ac.id</a>
          </li>
          <li><i className="fa fa-whatsapp"></i> WhatsApp: 0812 7893 3860</li>
        </ul>
      </div>

      {/* Link Berguna */}
      <div className="col-lg-2 col-md-3 footer-links">
        <h4>Halaman Terkait</h4>
        <ul className="list-unstyled">
          <li><a href="#">Home</a></li>
          <li><a href="#">Tentang PoliBea</a></li>
          <li><a href="#">Daftar Beasiswa</a></li>
        </ul>
      </div>

      {/* Layanan PoliBea */}
      <div className="col-lg-2 col-md-3 footer-links">
        <h4>Layanan Kami</h4>
        <ul className="list-unstyled">
          <li><a href="#">Informasi Beasiswa</a></li>
          <li><a href="#">Syarat Beasiswa</a></li>
          <li><a href="#">Pendaftaran Online</a></li>
          <li><a href="#">Bantuan Mahasiswa</a></li>
          <li><a href="#">Konsultasi Beasiswa</a></li>
        </ul>
      </div>

      {/* Logo */}
      <div className="col-lg-2 col-md-3 col-6 client-logo">
        <img src="/assets/img/hero-services-img.png" className="img-fluid" alt="Beasiswa" />
      </div>
      <div className="col-lg-2 col-md-3 col-6 client-logo">
        <img src="/assets/img/polinela.png" className="img-fluid" alt="Polinela" />
      </div>

    </div>
  </div>
  <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">PolinelaBea</strong>
            <span>All Rights Reserved</span>
          </p>
        </div>
</footer>

        

      {/* Scroll Top */}
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>

      {/* Vendor JS Files */}
      <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="/assets/vendor/php-email-form/validate.js"></script>
      <script src="/assets/vendor/aos/aos.js"></script>
      <script src="/assets/vendor/glightbox/js/glightbox.min.js"></script>
      <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>

      {/* Main JS File */}
      <script src="vendor/assets/js/main.js"></script>
    </>
  );
}
