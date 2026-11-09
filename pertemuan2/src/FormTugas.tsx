// src/FormTugas.tsx
import { useState } from "react";
import type { FormEvent } from "react";

type FormTugasProps = {
  onTambah: (judul: string) => void; // fungsi "pelapor" dari induk
};

function FormTugas({ onTambah }: FormTugasProps) {
  // State lokal untuk menampung isi input
  const [teks, setTeks] = useState("");

  // Validasi sederhana: tidak boleh kosong dan maksimal 50 karakter
  const terlaluPanjang = teks.length > 50;
  const tidakValid = teks.trim() === "" || terlaluPanjang;

  const tanganiKirim = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // mencegah halaman reload saat formulir dikirim
    if (tidakValid) return; // hentikan jika input tidak valid

    onTambah(teks.trim()); // "melapor" ke komponen induk
    setTeks(""); // kosongkan kembali input
  };

  return (
    <form onSubmit={tanganiKirim}>
      <div className="baris">
        <input
          className="input"
          type="text"
          placeholder="Contoh: Kerjakan laporan Modul 2"
          value={teks}
          onChange={(event) => setTeks(event.target.value)}
        />
        <button className="tombol" type="submit" disabled={tidakValid}>
          Tambah
        </button>
      </div>
      {terlaluPanjang && <p className="galat">Judul tugas maksimal 50 karakter.</p>}
    </form>
  );
}

export default FormTugas;
