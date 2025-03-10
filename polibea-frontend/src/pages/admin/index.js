import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "date-fns";
import Image from "next/image";

const AdminPage = () => {
  const router = useRouter();
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchScholarships();
    }
  }, []);

  const fetchScholarships = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/scholarships");
      const data = await response.json();
      setScholarships(data);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
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
        <title>Admin - Beasiswa</title>
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
                    src="/assets/images/logo-icon.png"
                    alt="homepage"
                    className="dark-logo"
                  />
                </b>
                <span className="logo-text">
                  <img
                    src="/assets/images/logo-text.png"
                    alt="homepage"
                    className="dark-logo"
                  />
                </span>
              </a>
            </div>
            <div
              className="navbar-collapse collapse"
              id="navbarSupportedContent"
              data-navbarbg="skin5"
            >
              <ul className="navbar-nav me-auto mt-md -0 ">
                <li className="nav-item hidden-sm-down">
                  <form className="app-search ps-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for..."
                    />
                    <a className="srh-btn">
                      <i className="ti-search"></i>
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
                  ></ul>
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
                    href="index.html"
                    aria-expanded="false"
                  >
                    <i
                      className="me-3 far fa-clock fa-fw"
                      aria-hidden="true"
                    ></i>
                    <span className="hide-menu">Dashboard</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="pages-profile.html"
                    aria-expanded="false"
                  >
                    <i className="me-3 fa fa-user" aria-hidden="true"></i>
                    <span className="hide-menu">Profile</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="table-basic.html"
                    aria-expanded="false"
                  >
                    <i className="me-3 fa fa-table" aria-hidden="true"></i>
                    <span className="hide-menu">Table</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="icon-fontawesome.html"
                    aria-expanded="false"
                  >
                    <i className="me-3 fa fa-font" aria-hidden="true"></i>
                    <span className="hide-menu">Icon</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="map-google.html"
                    aria-expanded="false"
                  >
                    <i className="me-3 fa fa-globe" aria-hidden="true"></i>
                    <span className="hide-menu">Google Map</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="blank.html"
                    aria-expanded="false"
                  >
                    <i className="me-3 fa fa-columns" aria-hidden="true"></i>
                    <span className="hide-menu">Blank</span>
                  </a>
                </li>
                <li className="sidebar-item">
                  <a
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    href="404.html"
                    aria-expanded="false"
                  >
                    <i
                      className="me-3 fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                    <span className="hide-menu">Error 404</span>
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
                        <a href="#">Home</a>
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
            <h1 className="text-center mb-4">Admin Beasiswa</h1>

            <div className="card shadow p-4 mb-4">
              <h4>{editingId ? "Edit Beasiswa" : "Tambah Beasiswa"}</h4>
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
                {form.photo && (
                  <div className="mb-3">
                    <Image
                      src={form.photo}
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
                <button type="submit" className="btn btn-success w-100">
                  {editingId ? "Update" : "Tambah"}
                </button>
              </form>
            </div>

            <div className="card shadow p-4">
              <h4>Daftar Beasiswa</h4>
              <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>No</th>
                    <th>Foto</th>
                    <th>Nama Beasiswa</th>
                    <th>Timeline</th>
                    <th>Deskripsi</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.length > 0 ? (
                    scholarships.map((scholarship, index) => (
                      <tr key={scholarship.id}>
                        <td>{index + 1}</td>
                        <td>
                          {scholarship.photo ? (
                            <img
                              src={scholarship.photo} // Path sudah termasuk 'http://localhost:5001/uploads/'
                              alt="Scholarship"
                              width={80}
                              height={50}
                              style={{
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                            />
                          ) : (
                            <span className="text-muted">No Image</span> // Fallback jika tidak ada gambar
                          )}
                        </td>

                        <td>{scholarship.name}</td>
                        <td>{formatDate(scholarship.timeline)}</td>
                        <td>{scholarship.description}</td>
                        <td>
                          <span
                            className={`badge ${
                              scholarship.status === "dibuka"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {scholarship.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(scholarship)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(scholarship.id)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Belum ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <footer className="footer text-center">
            © 2021 Monster Admin by{" "}
            <a href="https://www.wrappixel.com/">wrappixel.com</a> Distributed
            By <a href="https://themewagon.com">ThemeWagon</a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
