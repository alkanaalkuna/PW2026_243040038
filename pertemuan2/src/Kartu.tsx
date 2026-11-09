// src/Kartu.tsx
import type { ReactNode } from "react";

type KartuProps = {
  judul: string;
  children: ReactNode; // isi bebas di antara <Kartu> dan </Kartu>
};

// Komponen pembungkus: judul dikirim lewat props, isi dikirim lewat children
function Kartu({ judul, children }: KartuProps) {
  return (
    <section className="kartu">
      <h2>{judul}</h2>
      {children}
    </section>
  );
}

export default Kartu;
