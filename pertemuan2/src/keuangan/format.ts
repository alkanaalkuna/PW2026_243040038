// src/keuangan/format.ts
// Mengubah angka menjadi tulisan rupiah, contoh: 50000 -> "Rp 50.000"
export const rupiah = (angka: number) => "Rp " + angka.toLocaleString("id-ID");
