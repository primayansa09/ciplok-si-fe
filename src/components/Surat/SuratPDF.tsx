import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font
} from "@react-pdf/renderer";

Font.register({
  family: "Arial",
  src: "https://fonts.gstatic.com/s/arial/v11/UdHTKJ9H6o5WJodtFapA.ttf",
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Arial",
  },
  header: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 20,
  },
  section: {
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  underline: {
    textDecoration: "underline",
  },
  ketentuan: {
    marginTop: 15,
  },
});

interface PDFProps {
  data: {
    peminjam: string;
    tanggal: string;
    jam: string;
    ruangan: string;
    kegiatan: string;
    jumlahOrang: string;
    mjMengetahui: string;
  };
}

const SuratPDF = ({ data }: PDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>MAJELIS JEMAAT</Text>
        <Text>GEREJA KRISTEN INDONESIA CIPINANG ELOK</Text>
        <Text>ANGGOTA PERSEKUTUAN GEREJA-GEREJA DI INDONESIA</Text>
      </View>
      <View style={styles.subHeader}>
        <Text>Jl. Cipinang Elok I blok G No.1, Jakarta 13420</Text>
        <Text>📞 (021) 8191451 ✉ gki.ciplok@yahoo.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bold}>SURAT KEPUTUSAN PEMINJAMAN RUANGAN</Text>
      </View>

      <View>
        <Text>Bersama dengan ini, Majelis Jemaat menyatakan bahwa:</Text>
        <Text>Peminjam: {data.peminjam}</Text>
        <Text>Hari / Tanggal: {data.tanggal}</Text>
        <Text>Waktu: {data.jam}</Text>
        <Text>Ruangan: {data.ruangan}</Text>
        <Text>Kegiatan: {data.kegiatan}</Text>
        <Text>Jumlah Orang: {data.jumlahOrang}</Text>
        <Text>Majelis Mengetahui: {data.mjMengetahui}</Text>
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={styles.bold}>
          Telah disetujui untuk menggunakan ruangan sesuai jadwal di atas.
        </Text>
      </View>

      <View style={styles.ketentuan}>
        <Text style={styles.bold}>Ketentuan:</Text>
        <Text>1. Pengguna ruangan tidak boleh menggubah jam pemakaian tanpa konfirmasi dengan TU.</Text>
        <Text>2. Pengguna wajib menjaga kebersihan dan inventaris.</Text>
        <Text>3. Pengguna wajib mematikan lampu dan AC sebelum meninggalkan ruangan.</Text>
        <Text>4. Pengguna wajib menginformasikan ke Koster bahwa kegiatan telah selesai.</Text>
      </View>
    </Page>
  </Document>
);

export default SuratPDF;
