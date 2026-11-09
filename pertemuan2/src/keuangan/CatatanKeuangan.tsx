// src/keuangan/CatatanKeuangan.tsx (komponen induk Catatan Keuangan Mini)
import { useState, useEffect } from "react";
import Kartu from "../Kartu";
import FormTransaksi from "./FormTransaksi";
import ItemTransaksi from "./ItemTransaksi";
import { rupiah } from "./format";
import type { Transaksi } from "./ItemTransaksi";

function CatatanKeuangan() {
  // State utama: ambil dari localStorage jika ada
  const [daftar, setDaftar] = useState<Transaksi[]>(() => {
    try {
      const data = localStorage.getItem("catatan-keuangan");
      if (data) return JSON.parse(data) as Transaksi[];
    } catch {
      // isi localStorage rusak: mulai dari kosong
    }
    return [];
  });

  // Efek: simpan ke localStorage setiap daftar berubah
  useEffect(() => {
    localStorage.setItem("catatan-keuangan", JSON.stringify(daftar));
  }, [daftar]);

  const tambah = (data: Omit<Transaksi, "id">) => {
    setDaftar([...daftar, { id: Date.now(), ...data }]); // array baru
  };

  const hapus = (id: number) => {
    setDaftar(daftar.filter((t) => t.id !== id)); // array baru tanpa item itu
  };

  // Nilai turunan (dihitung dari state, bukan disimpan sebagai state baru)
  const totalMasuk = daftar
    .filter((t) => t.jenis === "pemasukan")
    .reduce((jumlah, t) => jumlah + t.nominal, 0);
  const totalKeluar = daftar
    .filter((t) => t.jenis === "pengeluaran")
    .reduce((jumlah, t) => jumlah + t.nominal, 0);
  const saldo = totalMasuk - totalKeluar;

  return (
    <main className="catatan-keuangan">
      <style>{`
        .catatan-keuangan {
          box-sizing: border-box;
          min-height: 100vh;
          padding: clamp(24px, 5vw, 56px) 20px;
          background: linear-gradient(145deg, #ecfdf5 0%, #f7fff9 48%, #d1fae5 100%);
          color: #173b2c;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .catatan-keuangan > * { box-sizing: border-box; }
        .catatan-keuangan > .judul,
        .catatan-keuangan > .subjudul,
        .catatan-keuangan > div {
          width: min(100%, 760px);
          margin-left: auto;
          margin-right: auto;
        }
        .catatan-keuangan > .judul {
          margin-top: 0;
          margin-bottom: 8px;
          color: #065f46;
          font-size: clamp(2rem, 5vw, 2.8rem);
          font-weight: 800;
          letter-spacing: -0.045em;
        }
        .catatan-keuangan > .subjudul {
          margin-top: 0;
          margin-bottom: 28px;
          color: #527465;
          line-height: 1.6;
        }
        .catatan-keuangan > div {
          margin-bottom: 18px;
          padding: 22px 24px;
          border: 1px solid #ccebd9;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 10px 28px rgba(6, 95, 70, 0.08);
        }
        .catatan-keuangan h2, .catatan-keuangan h3 {
          color: #086c4e;
        }
        .catatan-keuangan .saldo {
          margin: 8px 0 18px;
          color: #047857;
          font-size: clamp(2rem, 6vw, 2.7rem);
          font-weight: 800;
          letter-spacing: -0.04em;
        }
        .catatan-keuangan .rekap {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .catatan-keuangan .rekap span {
          padding: 9px 13px;
          border-radius: 999px;
          background: #ecfdf5;
          font-size: 0.92rem;
          font-weight: 650;
        }
        .catatan-keuangan .pemasukan { color: #047857; }
        .catatan-keuangan .pengeluaran { color: #b45309; }
        .catatan-keuangan .kosong {
          margin: 0;
          padding: 20px;
          border-radius: 14px;
          background: #f0fdf4;
          color: #527465;
          text-align: center;
        }
        .catatan-keuangan .daftar {
          display: grid;
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .catatan-keuangan input,
        .catatan-keuangan select {
          box-sizing: border-box;
          width: 100%;
          padding: 11px 13px;
          border: 1px solid #b7ddc7;
          border-radius: 10px;
          background: #fbfffc;
          color: #173b2c;
          font: inherit;
        }
        .catatan-keuangan input:focus,
        .catatan-keuangan select:focus {
          border-color: #10b981;
          outline: 3px solid rgba(16, 185, 129, 0.16);
        }
        .catatan-keuangan button {
          padding: 11px 16px;
          border: 0;
          border-radius: 10px;
          background: #059669;
          color: white;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
          transition: background 150ms ease, transform 150ms ease;
        }
        .catatan-keuangan button:hover { background: #047857; transform: translateY(-1px); }
        @media (max-width: 520px) {
          .catatan-keuangan > div { padding: 18px; border-radius: 16px; }
        }
      `}</style>
      <h1 className="judul">Catatan Keuangan Mini</h1>
      <p className="subjudul">Laboratorium Informatika - Modul 2: Tugas Terstruktur</p>

      <Kartu judul="Saldo Saat Ini">
        <p className={`saldo ${saldo < 0 ? "pengeluaran" : "pemasukan"}`}>{rupiah(saldo)}</p>
        <div className="rekap">
          <span className="pemasukan">Masuk: {rupiah(totalMasuk)}</span>
          <span className="pengeluaran">Keluar: {rupiah(totalKeluar)}</span>
        </div>
      </Kartu>

      <Kartu judul="Tambah Transaksi">
        <FormTransaksi onTambah={tambah} />
      </Kartu>

      <Kartu judul="Daftar Transaksi">
        {daftar.length === 0 ? (
          <p className="kosong">Belum ada transaksi. Yuk catat transaksi pertamamu!</p>
        ) : (
          <ul className="daftar">
            {daftar.map((t) => (
              <ItemTransaksi key={t.id} transaksi={t} onHapus={hapus} />
            ))}
          </ul>
        )}
      </Kartu>
    </main>
  );
}

export default CatatanKeuangan;
