// src/App.tsx (kerangka: memilih halaman yang tampil)
import { useState } from "react";
import "./App.css";
import DaftarTugas from "./DaftarTugas";
import CatatanKeuangan from "./keuangan/CatatanKeuangan";

type Halaman = "tugas" | "keuangan";

function App() {
  const [halaman, setHalaman] = useState<Halaman>("tugas");

  return (
    <div className="wadah">
      <div className="tab">
        <button
          className={`tombol-filter ${halaman === "tugas" ? "aktif" : ""}`}
          onClick={() => setHalaman("tugas")}
        >
          Daftar Tugas
        </button>
        <button
          className={`tombol-filter ${halaman === "keuangan" ? "aktif" : ""}`}
          onClick={() => setHalaman("keuangan")}
        >
          Catatan Keuangan
        </button>
      </div>

      {halaman === "tugas" ? <DaftarTugas /> : <CatatanKeuangan />}
    </div>
  );
}

export default App;
