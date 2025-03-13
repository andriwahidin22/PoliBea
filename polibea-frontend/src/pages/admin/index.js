import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Layout from "components/Layout";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState([]);
  const [form, setForm] = useState({
    name: "",
    photo: null,
    timeline: "",
    description: "",
    syarat_pendaftaran: "",
    link_pendaftaran: "",
    status: "dibuka",
  });
  const [editingId, setEditingId] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const router = useRouter();

  const fetchScholarships = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5001/api/scholarships");
      if (!response.ok) throw new Error("Gagal mengambil data");
      const data = await response.json();
      console.log("Data dari API:", data); // Debugging
      setScholarships(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    }
  }, []);

  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

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
    formData.append("syarat_pendaftaran", form.syarat_pendaftaran);
    formData.append("link_pendaftaran", form.link_pendaftaran);
    formData.append("status", form.status);
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    const url = editingId
      ? `http://localhost:5001/api/scholarships/${editingId}`
      : "http://localhost:5001/api/scholarships";
    const method = editingId ? "PUT" : "POST";

    try {
      await fetch(url, { method, body: formData });
      setForm({
        name: "",
        photo: null,
        timeline: "",
        description: "",
        syarat_pendaftaran: "",
        link_pendaftaran: "",
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
      await fetch(`http://localhost:5001/api/scholarships/${id}`, { method: "DELETE" });
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
      syarat_pendaftaran: scholarship.syarat_pendaftaran || "",
      link_pendaftaran: scholarship.link_pendaftaran || "",
      status: scholarship.status,
    });
    setEditingId(scholarship.id);
  // Redirect ke halaman edit dengan ID beasiswa
  router.push(`/admin/edit_bea?id=${scholarship.id}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return format(new Date(dateString), "dd MMMM yyyy");
  };

  

  return (
    <Layout title="Admin Beasiswa">
      {/* Tombol Tambah Data */}
      <div className="d-flex justify-content-end mb-3">
        <a href="/admin/add_bea" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i> Tambah Data
        </a>
      </div>

      {/* Wrapper */}
      <div className="container-fluid">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h4 className="card-title mb-3 text-info fw-bold">Data Beasiswa</h4>

            {/* Tabel */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="bg-light text-center text-dark fw-bold">
                  <tr>
                    <th>No</th>
                    <th>Dokumentasi</th>
                    <th>Nama Beasiswa</th>
                    <th>Timeline</th>
                    <th>Deskripsi</th>
                    <th>Status</th>
                    <th>Syarat Pendaftaran</th>
                    <th>Link Pendaftaran</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships?.length > 0 ? (
                    scholarships.map((scholarship, index) => (
                      <tr key={scholarship.id} className="align-middle text-center">
                        {/* No */}
                        <td className="fw-bold">{index + 1}</td>

                        {/* Gambar */}
                        <td>
                          <img
                            src={
                              scholarship.photo?.startsWith("http")
                                ? scholarship.photo
                                : `http://localhost:5001${scholarship.photo}`
                            }
                            alt="Scholarship"
                            width={80}
                            height={50}
                            className="rounded shadow-sm border border-secondary"
                            style={{ objectFit: "cover" }}
                            onError={(e) => (e.target.src = "/default-image.jpg")}
                          />
                        </td>

                        {/* Nama Beasiswa */}
                        <td className="text-start fw-semibold">{scholarship.name}</td>

                        {/* Timeline */}
                        <td className="text-start">{formatDate(scholarship.timeline)}</td>

                        {/* Deskripsi */}
                        <td
                          className="text-start text-muted"
                          style={{
                            maxWidth: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {scholarship.description}
                        </td>

                        {/* Status */}
                        <td>
                          <span
                            className={`badge px-3 py-2 ${
                              scholarship.status === "dibuka" ? "bg-success text-white" : "bg-danger text-white"
                            }`}
                          >
                            {scholarship.status}
                          </span>
                        </td>

                        {/* Syarat Pendaftaran */}
                        <td
                          className="text-start text-muted"
                          style={{
                            maxWidth: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {scholarship.syarat_pendaftaran || "-"}
                        </td>

                        {/* Link Pendaftaran */}
                        <td>
                          {scholarship.link_pendaftaran ? (
                            <a
                              href={scholarship.link_pendaftaran}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              <i className="fas fa-external-link-alt"></i> Link
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>

                        {/* Aksi */}
                        <td className="d-flex justify-content-center gap-2">
                          <button className="btn btn-outline-warning btn-sm" onClick={() => handleEdit(scholarship)}>
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(scholarship.id)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center text-muted py-3">
                        📌 Belum ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;