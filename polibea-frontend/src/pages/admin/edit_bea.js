import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Image from "next/image";
import Layout from "components/Layout";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState([]);
  const [form, setForm] = useState({
    name: "",
    photo: "",
    timeline: "",
    description: "",
    syarat_pendaftaran: "",
    link_pendaftaran: "",
    status: "dibuka",
  });
  const [editingId, setEditingId] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchScholarships();
  }, []);

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
    const { name, value, files } = e.target;
    if (name === "photo") {
      setPhotoFile(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
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
      await fetch(url, {
        method,
        body: formData,
      });
      setForm({
        name: "",
        photo: "",
        timeline: "",
        description: "",
        syarat_pendaftaran: "",
        link_pendaftaran: "",
        status: "dibuka",
      });
      setEditingId(null);
      setPhotoFile(null);
      fetchScholarships();
      router.push("/admin");
    } catch (error) {
      console.error("Error saving data:", error);
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
  };

  return (
    <Layout>
      <div className="card-left shadow p-4 mb-2">
        <a href="/admin" className="btn btn-secondary mb-2">
          <i className="fas fa-home" /> Kembali
        </a>
        <h4>{editingId ? "Edit Beasiswa" : "Edit Beasiswa"}</h4>
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

          {(photoFile || form.photo) && (
            <div className="mb-3">
              <Image
                src={photoFile ? URL.createObjectURL(photoFile) : `http://localhost:5001${form.photo}`}
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
            <label className="form-label">Syarat Pendaftaran</label>
            <textarea
              className="form-control"
              name="syarat_pendaftaran"
              value={form.syarat_pendaftaran}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Link Pendaftaran</label>
            <input
              type="text"
              className="form-control"
              name="link_pendaftaran"
              value={form.link_pendaftaran}
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

          <button type="submit" className="btn btn-success">
            {editingId ? "Update" : "Simpan"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AdminPage;
