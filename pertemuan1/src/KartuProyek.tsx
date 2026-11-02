// src/KartuProyek.tsx
type KartuProyekProps = {
  judul: string;
  deskripsi: string;
  tags: string[];
  repoUrl: string;
};

// Kartu satu proyek: Judul, Ringkasan Deskripsi, Tagar Teknologi, Tombol GitHub
function KartuProyek({ judul, deskripsi, tags, repoUrl }: KartuProyekProps) {
  return (
    <div
      style={{
        border: "1px solid #D0D7DE",
        borderRadius: "10px",
        padding: "18px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", color: "#1B365D" }}>{judul}</h3>
      <p
        style={{
          margin: "0 0 12px 0",
          fontSize: "14px",
          color: "#555",
          lineHeight: 1.5,
          flexGrow: 1,
        }}
      >
        {deskripsi}
      </p>

      {/* Tagar teknologi dirender dengan .map() */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "14px",
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              backgroundColor: "#E8EEF7",
              color: "#1B365D",
              padding: "3px 10px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            #{tag}
          </span>
        ))}
      </div>

      <a
        href={repoUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          alignSelf: "flex-start",
          backgroundColor: "#1B365D",
          color: "#FFFFFF",
          padding: "8px 16px",
          borderRadius: "6px",
          fontSize: "13px",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        Lihat di GitHub
      </a>
    </div>
  );
}

export default KartuProyek;
