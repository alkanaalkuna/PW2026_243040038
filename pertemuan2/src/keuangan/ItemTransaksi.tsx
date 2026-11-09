// src/keuangan/ItemTransaksi.tsx
import { rupiah } from "./format";

export type Transaksi = {
  id: number;
  keterangan: string;
  nominal: number; // sudah berupa angka
  jenis: "pemasukan" | "pengeluaran";
};

type ItemTransaksiProps = {
  transaksi: Transaksi;
  onHapus: (id: number) => void;
};

function ItemTransaksi({ transaksi, onHapus }: ItemTransaksiProps) {
  const pemasukan = transaksi.jenis === "pemasukan";

  return (
    <li className="item">
      <span>{transaksi.keterangan}</span>

      {/* Pemasukan berwarna hijau, pengeluaran berwarna merah */}
      <span className={pemasukan ? "pemasukan" : "pengeluaran"}>
        {pemasukan ? "+" : "-"} {rupiah(transaksi.nominal)}
      </span>

      <button
        className="tombol tombol-merah tombol-kecil"
        onClick={() => onHapus(transaksi.id)}
      >
        Hapus
      </button>
    </li>
  );
}

export default ItemTransaksi;
