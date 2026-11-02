// src/BadgeSkill.tsx
type BadgeSkillProps = {
  namaSkill: string;
  level: string; // "Pemula" | "Menengah" | "Mahir"
};

// Peta level -> warna badge
const warnaLevel: Record<string, { background: string; text: string }> = {
  Pemula: { background: "#FFF3CD", text: "#856404" },
  Menengah: { background: "#CCE5FF", text: "#004085" },
  Mahir: { background: "#D4EDDA", text: "#155724" },
};

function BadgeSkill({ namaSkill, level }: BadgeSkillProps) {
  // Jika level tidak dikenal, pakai warna abu-abu
  const warna = warnaLevel[level] || { background: "#E1E4E8", text: "#333" };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "bold",
        backgroundColor: warna.background,
        color: warna.text,
      }}
    >
      {namaSkill} · {level}
    </span>
  );
}

export default BadgeSkill;
