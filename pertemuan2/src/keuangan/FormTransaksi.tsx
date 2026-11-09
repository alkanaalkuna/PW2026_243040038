// src/keuangan/FormTransaksi.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import type { Transaksi } from "./ItemTransaksi";

type DataBaru = Omit<Transaksi, "id">; // transaksi tanpa id (id dibuat di induk)

type FormTransaksiProps = {
  onTambah: (data: DataBaru) => void;
};

function FormTransaksi({ onTambah }: FormTransaksiProps) {
  // Tiga input terkendali: nilainya selalu sama dengan state
  const [keterangan, setKeterangan] = useState("");
  const [nominal, setNominal] = useState(""); // input selalu berupa teks
  const [jenis, setJenis] = useState<Transaksi["jenis"]>("pemasukan");

  // Number(...) mengubah teks menjadi angka sebelum dipakai
  const angka = Number(nominal);
  const tidakValid = keterangan.trim() === "" || nominal === "" || !(angka > 0);

  const tanganiKirim = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (tidakValid) return;

    onTambah({ keterangan: keterangan.trim(), nominal: angka, jenis });
    setKeterangan("");
    setNominal("");
  };

  return (
    <form onSubmit={tanganiKirim} className="form-kolom">
      <input
        className="input"
        type="text"
        placeholder="Keterangan (contoh: Uang saku)"
        value={keterangan}
        onChange={(e) => setKeterangan(e.target.value)}
      />
      <div className="baris">
        <input
          className="input"
          type="number"
          placeholder="Nominal"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
        />
        <select
          className="pilih"
          value={jenis}
          onChange={(e) => setJenis(e.target.value as Transaksi["jenis"])}
        >
          <option value="pemasukan">Pemasukan</option>
          <option value="pengeluaran">Pengeluaran</option>
        </select>
      </div>
      <button className="tombol" type="submit" disabled={tidakValid}>
        Tambah Transaksi
      </button>
      {nominal !== "" && !(angka > 0) && (
        <p className="galat">Nominal harus lebih besar dari 0.</p>
      )}
    </form>
  );
}

export default FormTransaksi;
