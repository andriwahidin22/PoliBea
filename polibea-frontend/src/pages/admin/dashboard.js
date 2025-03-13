import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "components/Layout";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState([]); // State untuk menyimpan data beasiswa

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/scholarships"); // API untuk mendapatkan data beasiswa
        const data = await response.json();
        console.log("Data Beasiswa:", data); // Debugging
        setScholarships(data);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      }
    };

    fetchScholarships();

    // Hapus loading setelah 2 detik
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Dashboard Admin | Data Beasiswa</title>
      </Head>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <h2 className="text-center mb-4">Data Beasiswa</h2>

          {loading ? (
            <p className="text-center">Loading data beasiswa...</p>
          ) : scholarships.length > 0 ? (
            scholarships.map((scholarship, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card">
                  {/* Ambil gambar dari database dengan pengecekan URL */}
                  <img
                    src={
                      scholarship.photo?.startsWith("http")
                        ? scholarship.photo
                        : `http://localhost:5001${scholarship.photo}`
                    }
                    alt={scholarship.name}
                    style={{
                      width: "100%",
                      maxHeight: "200px", // Maksimum tinggi 200px, tapi tidak dipaksa
                      objectFit: "contain", // Gambar akan ditampilkan seluruhnya tanpa terpotong
                      borderRadius: "5px",
                    }}
                    onError={(e) => (e.target.src = "/default-image.jpg")}
                  />

                  <div className="card-body">
                    <h4 className="font-normal">{scholarship.name}</h4>{" "}
                    {/* Nama Beasiswa */}
                    <p>{scholarship.description}</p> {/* Deskripsi Beasiswa */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Tidak ada data beasiswa tersedia.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
