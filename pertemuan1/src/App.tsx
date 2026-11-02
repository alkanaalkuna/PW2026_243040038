import KartuProfil from "./kartuprofil";
import BadgeSkill from "./BadgeSkill";
import ItemMatkul from "./ItemMatkul";
import KartuProyek from "./KartuProyek";

function App() {
  // 1. Data daftar mata kuliah praktikum semester ini
  const daftarPraktikum = [
    {
      id: 101,
      kode: "IF21W0508",
      nama: "Praktikum Pemrograman 2",
      sks: 2,
      hari: "Senin",
    },
    {
      id: 102,
      kode: "IF21W0506",
      nama: "Praktikum Web",
      sks: 2,
      hari: "Selasa",
    },
    {
      id: 103,
      kode: "IF21W0507",
      nama: "Praktikum Sistem Berorientasi Objek",
      sks: 2,
      hari: "Jumat",
    },
  ];

  // Data keahlian untuk BadgeSkill (Tugas 1)
  const daftarSkill = [
    { id: 1, namaSkill: "HTML & CSS", level: "Mahir" },
    { id: 2, namaSkill: "PHP", level: "Mahir" },
    { id: 3, namaSkill: "MySQL", level: "Menengah" },
    { id: 4, namaSkill: "JavaScript", level: "Menengah" },
    { id: 5, namaSkill: "React JS", level: "Pemula" },
  ];

  // Data proyek untuk Showcase Portofolio Mini (Tugas 3)
  const daftarProyek = [
    {
      id: 1,
      judul: "Pixel Media",
      deskripsi:
        "Website komunitas kreatif dengan galeri karya, sistem login, dan panel admin.",
      tags: ["PHP", "MySQL", "Bootstrap"],
      repoUrl: "https://github.com/username/pixel-media",
    },
    {
      id: 2,
      judul: "Portal KRS Mahasiswa",
      deskripsi:
        "Aplikasi pengisian Kartu Rencana Studi online beserta validasi batas SKS.",
      tags: ["PHP", "MySQL", "JavaScript"],
      repoUrl: "https://github.com/username/portal-krs",
    },
    {
      id: 3,
      judul: "Form Pendaftaran Kegiatan",
      deskripsi:
        "Aplikasi desktop formulir pendaftaran kegiatan kampus memakai Java Swing.",
      tags: ["Java", "Swing", "GUI"],
      repoUrl: "https://github.com/username/form-kegiatan",
    },
    {
      id: 4,
      judul: "Praktikum React Modul 1",
      deskripsi:
        "Latihan dasar React JS: komponen, props, JSX, dan list rendering memakai Vite.",
      tags: ["React", "Vite", "JSX"],
      repoUrl: "https://github.com/username/pertemuan1",
    },
  ];

  // 2. Fungsi penanganan interaksi event tombol
  const notifikasiSapaan = () => {
    alert(
      "Selamat datang di Modul 1! Anda berhasil menguasai fondasi arsitektur React JS.",
    );
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ color: "#1B365D", margin: "0 0 8px 0" }}>
          Praktikum Pemrograman Web
        </h1>
        <p style={{ color: "#666", fontSize: "15px" }}>
          Laboratorium Informatika - Modul 1: Pengenalan React JS & Vite
        </p>
      </header>

      <section style={{ marginBottom: "32px" }}>
        <h2
          style={{
            color: "#2C3E50",
            borderBottom: "2px solid #E1E4E8",
            paddingBottom: "8px",
          }}
        >
          Profil Mahasiswa Praktikan
        </h2>
        <KartuProfil
          nama="Derania Safa Zaina"
          npm="243040038"
          kelas="IF - Praktikum Web F"
          status="Aktif"
        />

        {/* Tugas 1: daftar keahlian di bawah profil */}
        <h3 style={{ color: "#2C3E50", margin: "0 0 10px 0" }}>Keahlian</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {daftarSkill.map((skill) => (
            <BadgeSkill
              key={skill.id}
              namaSkill={skill.namaSkill}
              level={skill.level}
            />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2
          style={{
            color: "#2C3E50",
            borderBottom: "2px solid #E1E4E8",
            paddingBottom: "8px",
          }}
        >
          Daftar Rencana Praktikum Semester (List Rendering)
        </h2>
        <div style={{ display: "grid", gap: "12px" }}>
          {/* Tugas 2: App hanya iterasi data lalu memanggil ItemMatkul */}
          {daftarPraktikum.map((matkul) => (
            <ItemMatkul key={matkul.id} {...matkul} />
          ))}
        </div>
      </section>

      {/* Tugas 3: Showcase Portofolio Mini (4 kartu proyek) */}
      <section style={{ marginBottom: "32px" }}>
        <h2
          style={{
            color: "#2C3E50",
            borderBottom: "2px solid #E1E4E8",
            paddingBottom: "8px",
          }}
        >
          Showcase Portofolio Mini
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {daftarProyek.map((proyek) => (
            <KartuProyek key={proyek.id} {...proyek} />
          ))}
        </div>
      </section>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={notifikasiSapaan}
          style={{
            backgroundColor: "#1B365D",
            color: "#FFFFFF",
            padding: "12px 24px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Uji Interaktivitas Event (Klik Disini)
        </button>
      </div>
    </div>
  );
}

export default App;
