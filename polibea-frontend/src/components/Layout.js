import Head from "next/head";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";


const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="admin dashboard, bootstrap 5" />
        <meta name="description" content="Monster Lite is a powerful admin dashboard template." />
        <meta name="robots" content="noindex,nofollow" />
        <title>{title || "Dashboard PoliBae"}</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon.png" />
        <link href="/assets/plugins/chartist/dist/chartist.min.css" rel="stylesheet" />
        <link href="/assets/css/style.min.css" rel="stylesheet" />
      </Head>

      {/* Wrapper utama */}
      <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <Sidebar />

        {/* Konten utama */}
        <div className="page-wrapper">
          <div className="container-fluid">
            {children} {/* Konten halaman akan masuk di sini */}
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
