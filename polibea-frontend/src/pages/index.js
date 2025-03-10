import Head from "next/head";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swiper from "swiper";
import "swiper/swiper-bundle.css"; // Pastikan untuk mengimpor CSS Swiper
import { useRouter } from "next/router";

export default function Home() {
  const [scholarships, setScholarships] = useState([]); // ✅ State untuk daftar beasiswa
  const router = useRouter();

  useEffect(() => {
    AOS.init();

    // Inisialisasi Swiper
    new Swiper(".init-swiper", {
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

    // Fetch data beasiswa
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/scholarships");
      const data = await response.json();
      setScholarships(data); // ✅ Update state dengan data dari API
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    }
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Halaman Utama PoliBae</title>
        <link href="/assets/img/logo.png" rel="icon" />
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
            <img
              src="/assets/img/logo.png"
              alt=""
              style={{ width: "120px", height: "auto" }}
            /><h1 className="sitename">Polinela Beasiswa</h1>
          </a>
          
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="#hero">Home</a>
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
        {/* Hero Section */}
        <section id="hero" className="hero section">
          <div className="hero-bg">
            <img src="/assets/img/hero-bg-light.webp" alt="" />
          </div>
          <div className="container text-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1 data-aos="fade-up">
                Welcome to <span>PoliBea</span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="100">
                Dapatkan Inormasi Beasiswa Yang Ada di Politeknik Negeri Lampung
                <br />
              </p>
              <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                <a href="#about" className="btn-get-started">
                  About PoliBee
                </a>
                <a
                  href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                  className="glightbox btn-watch-video d-flex align-items-center"
                >
                  <i className="bi bi-play-circle"></i>
                  <span>Watch Video</span>
                </a>
              </div>
              <img
                src="/assets/img/hero-services-img.png"
                className="img-fluid hero-img"
                alt=""
                data-aos="zoom-out"
                data-aos-delay="300"
              />
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section
          id="featured-services"
          className="featured-services section light-background"
        >
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-xl-4 col-lg-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0">
                    <i className="bi bi-briefcase"></i>
                  </div>
                  <div>
                    <h4 className="title">
                      <a href="#" className="stretched-link">
                        Informasi Beasiswa
                      </a>
                    </h4>
                    <p className="description">
                      Memberikan informasi Beasiswa yang ada di politeknik
                      negeri lampung{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0">
                    <i className="bi bi-card-checklist"></i>
                  </div>
                  <div>
                    <h4 className="title">
                      <a href="#" className="stretched-link">
                        Syarat Pendaftaran
                      </a>
                    </h4>
                    <p className="description">
                      Menjelaskan syarat syarat pendaftaran dan informasi yang
                      lengkap dari beasiswa yang ada di polinela
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-xl-4 col-lg-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0">
                    <i className="bi bi-bar-chart"></i>
                  </div>
                  <div>
                    <h4 className="title">
                      <a href="#" className="stretched-link">
                        Time Line Pendaftarans
                      </a>
                    </h4>
                    <p className="description">Informa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about section">
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-6 content"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <p className="who-we-are">Tentang PoliBea</p>
                <h3>Membuka Peluang, Meraih Masa Depan</h3>
                <p className="fst">
                  PoliBea hadir untuk memberikan informasi beasiswa terbaru di
                  Politeknik Negeri Lampung, membantu mahasiswa mendapatkan
                  akses pendidikan terbaik.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i>{" "}
                    <span>
                      Informasi beasiswa terkini untuk mahasiswa Polinela.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>{" "}
                    <span>
                      Syarat dan ketentuan lengkap untuk setiap beasiswa.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>{" "}
                    <span>
                      Akses langsung ke link pendaftaran beasiswa secara mudah
                      dan cepat.
                    </span>
                  </li>
                </ul>
                <a href="/beasiswa" className="read-more">
                  <span>Lihat Beasiswa</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>

              <div
                className="col-lg-6 about-images"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="row gy-4">
                  <div className="col-lg-6">
                    <img
                      src="/assets/img/KKIP.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="row gy-4">
                      <div className="col-lg-12">
                        <img
                          src="/assets/img/KKSE.webp"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="col-lg-12">
                        <img
                          src="/assets/img/KGENBI.jpg"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section id="clients" className="clients section">
          <div className="container" data-aos="fade-up">
            <div className="row gy-4">
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="/assets/img/kip.png" className="img-fluid" alt="" />
              </div>
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="/assets/img/bpi.png" className="img-fluid" alt="" />
              </div>
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="/assets/img/adik.png" className="img-fluid" alt="" />
              </div>
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="/assets/img/epkb1.jpg" className="img-fluid" alt="" />
              </div>
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img src="/assets/img/kse.jpeg" className="img-fluid" alt="" />
              </div>
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img
                  src="/assets/img/genbi.jpeg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Daftar Beasiswa</h2>
          </div>

          {/* Features Details Section */}
          <section id="features-details" className="features-details section">
      <div className="container">
        {scholarships.map((scholarship, index) => (
          <div
            className="row gy-4 justify-content-between features-item"
            key={scholarship.id}
          >
            {index % 2 === 0 ? (
              <>
                {/* Gambar di sebelah kiri */}
                <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                  <img
                    src={scholarship.photo}
                    className="img-fluid"
                    alt={scholarship.name}
                  />
                </div>
                {/* Detail di sebelah kanan */}
                <div
                  className="col-lg-5 d-flex align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="content">
                    <h3>{scholarship.name}</h3>
                    <p>{scholarship.description}</p>
                    <a
                      href={`/scholarship/${scholarship.id}`}
                      className="btn more-btn"
                    >
                      Lihat Detail Persyaratan
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Detail di sebelah kiri */}
                <div
                  className="col-lg-5 d-flex align-items-center order-2 order-lg-1"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="content">
                    <h3>{scholarship.name}</h3>
                    <p>{scholarship.description}</p>
                    <ul>
                      {scholarship.requirements?.map((req, idx) => (
                        <li key={idx}>
                          <i className="bi bi-check-circle flex-shrink-0"></i> {req}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`/scholarship/${scholarship.id}`}
                      className="btn more-btn"
                    >
                      Lihat Detail Persyaratan
                    </a>
                  </div>
                </div>
                {/* Gambar di sebelah kanan */}
                <div
                  className="col-lg-6 order-1 order-lg-2"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <img
                    src={scholarship.photo}
                    className="img-fluid"
                    alt={scholarship.name}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
        </section>

        {/* Services Section */}
        <section id="services" className="services section light-background">
      <div className="container">
        <div className="row g-5">
          {scholarships.map((scholarship, index) => {
            let itemClass = "";
            if (index === 0) itemClass = "item-cyan";
            else if (index === 1) itemClass = "item-orange";
            else if (index === 2) itemClass = "item-teal";
            else if (index === 3) itemClass = "item-red";
            else if (index === 4) itemClass = "item-indigo";
            else if (index === 5) itemClass = "item-pink";
            else itemClass = "item-default"; // Warna default jika lebih dari 6 item

            return (
              <div
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
                key={scholarship.id}
              >
                <div className={`service-item ${itemClass} position-relative`}>
                  <img
                    src={scholarship.photo}
                    alt={scholarship.name}
                    className="icon"
                  />
                  <div>
                    <h3>{scholarship.name}</h3>
                    <p>{scholarship.description}</p>
                    <a
                      href={`/scholarship/${scholarship.id}`}
                      className="read-more stretched-link"
                    >
                      Learn More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

        {/* Contact Section */}
        <section id="contact" className="contact section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Contact</h2>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-6">
                <div
                  className="info-item d-flex flex-column justify-content-center align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="bi bi-geo-alt"></i>
                  <h3>Address</h3>
                  <p>Jl. Soekarno Hatta No.10, Rajabasa Raya, Kec. Rajabasa, Kota
                  Bandar Lampung, Lampung 35144</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="info-item d-flex flex-column justify-content-center align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bi bi-telephone"></i>
                  <h3>Call Us</h3>
                  <p>(0721) 703-995</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="info-item d-flex flex-column justify-content-center align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <i className="bi bi-envelope"></i>
                  <h3>Email Us</h3>
                  <p>info@polinela.ac.id</p>
                </div>
              </div>
            </div>
            <div className="row gy-4 mt-1">
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                <iframe
                  src="https://maps.app.goo.gl/SfS2earGN6Mc86sc7"
                  frameBorder="0"
                  style={{ border: 0, width: "100%", height: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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
                  <a
                    href="http://bit.ly/GMapsPolinela"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Maps
                  </a>
                  <br />
                  Jl. Soekarno Hatta No.10, Rajabasa Raya, Kec. Rajabasa, Kota
                  Bandar Lampung, Lampung 35144
                </li>
                <li>
                  <i className="fa fa-phone"></i> Telepon: (0721) 703-995
                </li>
                <li>
                  <i className="fa fa-fax"></i> Fax: (0721) 787-309
                </li>
                <li>
                  <i className="fa fa-envelope"></i>
                  Email:{" "}
                  <a href="mailto:info@polinela.ac.id">info@polinela.ac.id</a>
                </li>
                <li>
                  <i className="fa fa-whatsapp"></i> WhatsApp: 0812 7893 3860
                </li>
              </ul>
            </div>

            {/* Link Berguna */}
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Halaman Terkait</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Tentang PoliBea</a>
                </li>
                <li>
                  <a href="#">Daftar Beasiswa</a>
                </li>
              </ul>
            </div>

            {/* Layanan PoliBea */}
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Layanan Kami</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Informasi Beasiswa</a>
                </li>
                <li>
                  <a href="#">Syarat Beasiswa</a>
                </li>
                <li>
                  <a href="#">Pendaftaran Online</a>
                </li>
                <li>
                  <a href="#">Bantuan Mahasiswa</a>
                </li>
                <li>
                  <a href="#">Konsultasi Beasiswa</a>
                </li>
              </ul>
            </div>

            {/* Logo */}
            <div className="col-lg-2 col-md-3 col-6 client-logo">
              <img
                src="/assets/img/hero-services-img.png"
                className="img-fluid"
                alt="Beasiswa"
              />
            </div>
            <div className="col-lg-2 col-md-3 col-6 client-logo">
              <img
                src="/assets/img/polinela.png"
                className="img-fluid"
                alt="Polinela"
              />
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
