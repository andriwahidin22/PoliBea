import { useState, useEffect } from "react";
import Head from "next/head";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="admin dashboard, bootstrap 5" />
        <meta
          name="description"
          content="Monster Lite is a powerful admin dashboard template."
        />
        <meta name="robots" content="noindex,nofollow" />
        <title>Dashboard PoliBae</title>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/images/favicon.png"
        />
        <link
          href="/assets/plugins/chartist/dist/chartist.min.css"
          rel="stylesheet"
        />
        <link href="/assets/css/style.min.css" rel="stylesheet" />
      </Head>
      <div
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="absolute"
        data-header-position="absolute"
        data-boxed-layout="full"
      >
        <header className="topbar" data-navbarbg="skin6">
          <nav className="navbar top-navbar navbar-expand-md navbar-dark">
            <div className="navbar-header" data-logobg="skin6">
              <a className="navbar-brand" href="index.html">
                <b className="logo-icon">
                  <img
                    style={{ width: "120px", height: "auto" }}
                    src="/assets/img/logo.png"
                    alt="homepage"
                    className="dark-logo"
                  />
                </b>
              </a>
              <a
                className="nav-toggler waves-effect waves-light text-dark d-block d-md-none"
                href="javascript:void(0)"
              >
                <i className="ti-menu ti-close" />
              </a>
            </div>
            <div
              className="navbar-collapse collapse"
              id="navbarSupportedContent"
              data-navbarbg="skin5"
            >
              <ul className="navbar-nav me-auto mt-md-0 ">
                <li className="nav-item hidden-sm-down">
                  <form className="app-search ps-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for..."
                    />
                    <a className="srh-btn">
                      <i className="ti-search" />
                    </a>
                  </form>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle waves-effect waves-dark"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="/assets/images/users/1.jpg"
                      alt="user"
                      className="profile-pic me-2"
                    />
                    Markarn Doe
                  </a>
                  <ul
                    className="dropdown-menu show"
                    aria-labelledby="navbarDropdown"
                  />
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <aside className="left-sidebar" data-sidebarbg="skin6">
          <div className="scroll-sidebar">
            <nav className="sidebar-nav">
              <ul id="sidebarnav">
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="/admin/dashboard"
                    aria-expanded="false"
                  >
                    <i className="me-3 far fa-clock fa-fw" aria-hidden="true" />
                    <span className="hide-menu">Dashboard</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="/admin"
                    aria-expanded="false"
                  >
                    <i className="me-3 fa fa-user" aria-hidden="true" />
                    <span className="hide-menu">Tambah Beasiswa</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        <div className="page-wrapper">
          <div className="page-breadcrumb">
            <div className="row align-items-center">
              <div className="col-md-6 col-8 align-self-center">
                <h3 className="page-title mb-0 p-0">Dashboard</h3>
                <div className="d-flex align-items-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Dashboard
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="card">
                  <img
                    className="card-img-top img-responsive"
                    src="/assets/images/big/img1.jpg"
                    alt="Card"
                  />
                  <div className="card-body">
                    <ul className="list-inline d-flex align-items-center">
                      <li className="ps-0">20 May 2021</li>
                      <li className="ms-auto">
                        <a href="javascript:void(0)" className="link">
                          3 Comment
                        </a>
                      </li>
                    </ul>
                    <h3 className="font-normal">
                      Featured Hydroflora Pots Garden &amp; Outdoors
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer text-center">
            © 2025 PKL D3 Manajemen Informatika{" "}
          </footer>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
