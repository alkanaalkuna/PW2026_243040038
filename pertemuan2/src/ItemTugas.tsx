// src/ItemTugas.tsx
export type Tugas = {
  id: number;
  judul: string;
  selesai: boolean;
};

type ItemTugasProps = {
  tugas: Tugas;
  onUbahStatus: (id: number) => void;
  onHapus: (id: number) => void;
};

function ItemTugas({ tugas, onUbahStatus, onHapus }: ItemTugasProps) {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={tugas.selesai}
        onChange={() => onUbahStatus(tugas.id)}
      />

      {/* className dinamis: dicoret jika tugas sudah selesai */}
      <span className={tugas.selesai ? "selesai" : ""}>{tugas.judul}</span>

      <button
        className="tombol tombol-merah tombol-kecil"
        onClick={() => onHapus(tugas.id)}
      >
        Hapus
      </button>
    </li>
  );
}

export default ItemTugas;
