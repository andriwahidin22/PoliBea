import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BeasiswaDetail() {
  const router = useRouter();
  const { id } = router.query; // Ambil ID dari URL
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5001/api/scholarships/${id}`) // Panggil API detail beasiswa
        .then((res) => res.json())
        .then((data) => setScholarship(data))
        .catch((error) => console.error("Error:", error));
    }
  }, [id]);

  if (!scholarship) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{scholarship.name}</h1>
      <img src={scholarship.photo} alt={scholarship.name} className="img-fluid" />
      <p><strong>Deskripsi:</strong> {scholarship.description}</p>
      <p><strong>Status:</strong> {scholarship.status}</p>
      <p><strong>Timeline:</strong> {new Date(scholarship.timeline).toLocaleDateString()}</p>
      <p><strong>Persyaratan:</strong> {scholarship.syarat_pendaftaran}</p>
      <p><strong>Link Pendaftaran:</strong> <a href={scholarship.link_pendaftaran} target="_blank">Klik di sini</a></p>
    </div>
  );
}
