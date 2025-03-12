import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Image from "next/image";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState([]);
  const [form, setForm] = useState({
    name: "",
    photo: null,
    timeline: "",
    description: "",
    status: "dibuka",
  });
  const [editingId, setEditingId] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchScholarships();
    }
  }, [router]);

  const fetchScholarships = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/scholarships");
      const data = await response.json();
      setScholarships(data);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setPhotoFile(e.target.files[0]);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("timeline", form.timeline);
    formData.append("description", form.description);
    formData.append("status", form.status);

    if (photoFile) {
      formData.append("photo", photoFile);
    }

    const url = editingId
      ? `http://localhost:5001/api/scholarships/${editingId}`
      : "http://localhost:5001/api/scholarships";
    const method = editingId ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        body: formData,
      });

      // Reset form
      setForm({
        name: "",
        photo: null,
        timeline: "",
        description: "",
        status: "dibuka",
      });
      setEditingId(null);
      setPhotoFile(null);
      fetchScholarships();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus beasiswa ini?")) return;

    try {
      await fetch(`http://localhost:5001/api/scholarships/${id}`, {
        method: "DELETE",
      });
      fetchScholarships();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleEdit = (scholarship) => {
    setForm({
      name: scholarship.name,
      photo: scholarship.photo,
      timeline: scholarship.timeline,
      description: scholarship.description,
      status: scholarship.status,
    });
    setEditingId(scholarship.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy");
  };

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
                    <span className="hide-menu">Data Beasiswa</span>
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
                <h3 className="page-title mb-0 p-0">Data Beasiswa</h3>
                <div className="d-flex align-items-center">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/admin/dashboard">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Tambah Data Beasiswa
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="card-left shadow p-4 mb-2">
            <a href="/admin" className="btn btn-secondary mb-2">
              <i className="fas fa-home" /> Kembali
            </a>
            <h4>{editingId ? "Edit Beasiswa" : "Tambah Data Beasiswa"}</h4>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Nama Beasiswa</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Foto</label>
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
              {photoFile && (
                <div className="mb-3">
                  <Image
                    src={URL.createObjectURL(photoFile)}
                    width={80}
                    height={50}
                    alt="Preview"
                    unoptimized
                  />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Timeline (Deadline)</label>
                <input
                  type="date"
                  className="form-control"
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Deskripsi</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  required
                >
                  <option value="dibuka">Dibuka</option>
                  <option value="ditutup">Ditutup</option>
                </select>
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                {editingId ? "Update" : "Simpan"}
              </button>
            </form>
          </div>
        </div>
        <footer className="footer text-center">
          © 2025 PKL D3 Manajemen Informatika{" "}
        </footer>
      </div>
    </>
  );
};

export default AdminPage;
