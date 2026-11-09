// src/DaftarTugas.tsx (komponen induk aplikasi Daftar Tugas Praktikum)
import { useState, useEffect } from "react";
import Kartu from "./Kartu";
import Penghitung from "./Penghitung";
import FormTugas from "./FormTugas";
import ItemTugas from "./ItemTugas";
import type { Tugas } from "./ItemTugas";

type Filter = "semua" | "belum" | "selesai";

const tugasAwal: Tugas[] = [
  { id: 1, judul: "Install Node.js dan Vite", selesai: true },
  { id: 2, judul: "Pelajari useState", selesai: false },
];

function DaftarTugas() {
  // 1. State utama: coba ambil dari localStorage, jika kosong pakai data contoh
  const [daftarTugas, setDaftarTugas] = useState<Tugas[]>(() => {
    try {
      const dataTersimpan = localStorage.getItem("daftar-tugas");
      if (dataTersimpan) {
        return JSON.parse(dataTersimpan) as Tugas[]; // ubah teks JSON kembali menjadi array
      }
    } catch {
      // isi localStorage rusak: abaikan dan pakai data contoh
    }
    return tugasAwal;
  });

  // Tugas 1: state untuk pilihan filter
  const [filter, setFilter] = useState<Filter>("semua");

  // Efek A: dijalankan SEKALI saat komponen pertama kali tampil
  useEffect(() => {
    console.log("Aplikasi Daftar Tugas siap digunakan!");
  }, []);

  // Efek B: perbarui judul tab peramban setiap daftarTugas berubah
  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length;
    document.title = `(${sisa}) Tugas Belum Selesai`;
  }, [daftarTugas]);

  // Efek C: simpan daftarTugas ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("daftar-tugas", JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  // 2. Menambah tugas: buat array BARU berisi tugas lama + tugas baru
  const tambahTugas = (judul: string) => {
    const tugasBaru: Tugas = { id: Date.now(), judul: judul, selesai: false };
    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  // 3. Mengubah status selesai: salin tugas yang dicentang, biarkan yang lain
  const ubahStatus = (id: number) => {
    const daftarBaru = daftarTugas.map((tugas) => {
      if (tugas.id === id) {
        return { ...tugas, selesai: !tugas.selesai }; // salinan dengan status dibalik
      }
      return tugas; // tugas lain tidak berubah
    });
    setDaftarTugas(daftarBaru);
  };

  // 4. Menghapus tugas: ambil semua tugas KECUALI yang id-nya sama
  const hapusTugas = (id: number) => {
    setDaftarTugas(daftarTugas.filter((tugas) => tugas.id !== id));
  };

  // Tugas 2: hapus semua tugas yang berstatus selesai
  const hapusSemuaSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas) => !tugas.selesai));
  };

  // 5. Nilai turunan: dihitung dari state, tidak perlu state baru
  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

  // Tugas 1: saring daftar sesuai filter SEBELUM di-map
  const tugasTampil = daftarTugas.filter((tugas) => {
    if (filter === "belum") return !tugas.selesai;
    if (filter === "selesai") return tugas.selesai;
    return true; // "semua"
  });

  const pilihanFilter: { nilai: Filter; label: string }[] = [
    { nilai: "semua", label: "Semua" },
    { nilai: "belum", label: "Belum Selesai" },
    { nilai: "selesai", label: "Selesai" },
  ];

  return (
    <main className="daftar-tugas-app">
      <style>{`
        .daftar-tugas-app {
          --emerald-900: #064e3b;
          --emerald-700: #047857;
          --emerald-600: #059669;
          --emerald-100: #d1fae5;
          --green-50: #f0fdf4;
          min-height: 100vh;
          box-sizing: border-box;
          padding: clamp(24px, 5vw, 56px) 20px;
          background: radial-gradient(ellipse at top, #dcfce7 0%, #f0fdf4 42%, #f8fafc 100%);
          color: #1f2937;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .daftar-tugas-app * { box-sizing: border-box; }
        .daftar-tugas-app > .konten-tugas { width: min(100%, 760px); margin: 0 auto; }
        .daftar-tugas-app .judul {
          margin: 0;
          color: var(--emerald-900);
          font-size: clamp(2rem, 5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.045em;
          text-align: center;
        }
        .daftar-tugas-app .subjudul {
          margin: 10px 0 28px;
          color: #4b7564;
          line-height: 1.6;
          text-align: center;
        }
        .daftar-tugas-app .area-penghitung,
        .daftar-tugas-app .panel-tugas {
          margin: 18px 0;
          padding: clamp(20px, 4vw, 30px);
          border: 1px solid #bbf7d0;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 12px 32px rgba(6, 78, 59, 0.08);
        }
        .daftar-tugas-app .panel-tugas h2 {
          margin: 0 0 18px;
          color: var(--emerald-900);
          font-size: 1.25rem;
        }
        .daftar-tugas-app .ringkasan {
          display: inline-block;
          margin: 0 0 18px;
          padding: 8px 13px;
          border-radius: 999px;
          background: var(--green-50);
          color: var(--emerald-700);
          font-size: 0.92rem;
          font-weight: 700;
        }
        .daftar-tugas-app .filter { display: flex; flex-wrap: wrap; gap: 9px; margin-bottom: 18px; }
        .daftar-tugas-app button {
          border: 1px solid #a7f3d0;
          border-radius: 10px;
          background: #ecfdf5;
          color: var(--emerald-700);
          cursor: pointer;
          font: inherit;
          font-weight: 650;
          transition: background 160ms ease, color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
        }
        .daftar-tugas-app button:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(5, 150, 105, 0.14); }
        .daftar-tugas-app button:focus-visible { outline: 3px solid #6ee7b7; outline-offset: 3px; }
        .daftar-tugas-app .tombol-filter { padding: 9px 14px; }
        .daftar-tugas-app .tombol-filter.aktif,
        .daftar-tugas-app .tombol:not(.tombol-merah) {
          border-color: var(--emerald-600);
          background: var(--emerald-600);
          color: white;
        }
        .daftar-tugas-app .daftar { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
        .daftar-tugas-app .kosong {
          margin: 0;
          padding: 20px;
          border: 1px dashed #86efac;
          border-radius: 14px;
          background: var(--green-50);
          color: #4b7564;
          text-align: center;
        }
        .daftar-tugas-app .aksi { margin-top: 20px; }
        .daftar-tugas-app .tombol-merah { padding: 10px 15px; border-color: #059669; background: #059669; color: white; }
        .daftar-tugas-app .tombol-merah:hover { background: #047857; }
        @media (max-width: 520px) {
          .daftar-tugas-app { padding-right: 14px; padding-left: 14px; }
          .daftar-tugas-app .filter { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .daftar-tugas-app .tombol-filter { padding: 9px 6px; font-size: 0.85rem; }
        }
      `}</style>
      <div className="konten-tugas">
        <h1 className="judul">Daftar Tugas Praktikum</h1>
        <p className="subjudul">Laboratorium Informatika - Modul 2: React Lanjutan</p>

        <div className="area-penghitung"><Penghitung /></div>

        <section className="panel-tugas">
          <Kartu judul="Tambah Tugas Baru">
            <FormTugas onTambah={tambahTugas} />
          </Kartu>
        </section>

        <section className="panel-tugas">
          <Kartu judul="Daftar Tugas">
        <p className="ringkasan">
          {jumlahSelesai} dari {daftarTugas.length} tugas selesai
        </p>

        {/* Tugas 1: tiga tombol filter, yang aktif tampil berbeda */}
        <div className="filter">
          {pilihanFilter.map((p) => (
            <button
              key={p.nilai}
              className={`tombol-filter ${filter === p.nilai ? "aktif" : ""}`}
              onClick={() => setFilter(p.nilai)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Conditional rendering dengan ternary: tampilkan pesan jika kosong */}
        {daftarTugas.length === 0 ? (
          <p className="kosong">Belum ada tugas. Yuk tambahkan tugas pertamamu!</p>
        ) : tugasTampil.length === 0 ? (
          <p className="kosong">Tidak ada tugas pada filter ini.</p>
        ) : (
          <ul className="daftar">
            {tugasTampil.map((tugas) => (
              <ItemTugas
                key={tugas.id}
                tugas={tugas}
                onUbahStatus={ubahStatus}
                onHapus={hapusTugas}
              />
            ))}
          </ul>
        )}

        {/* Tugas 2: tombol hanya muncul jika ada minimal satu tugas selesai */}
        {jumlahSelesai > 0 && (
          <div className="aksi">
            <button className="tombol tombol-merah" onClick={hapusSemuaSelesai}>
              Hapus Semua yang Selesai
            </button>
          </div>
        )}
          </Kartu>
        </section>
      </div>
    </main>
  );
}

export default DaftarTugas;
