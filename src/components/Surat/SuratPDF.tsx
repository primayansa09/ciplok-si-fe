import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import logo from '../../assets/logo.png';
import { CenterFocusStrong } from '@mui/icons-material';

// Define the type of the props SuratPDF expects
interface SuratPDFProps {
  peminjam: string;
  tanggal: string;
  waktu: string;
  ruangan: string;
  kegiatan: string;
  mengetahui: string;
  status: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    marginTop:10,
    marginBottom: 20,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  content: {
    marginBottom: 20,
  },
  table: {
    marginBottom: 20,
    width: '100%',
  },
  tableRow: {
    // display: 'flex',
    flexDirection: 'row',
    marginBottom: 2.5, // Space between rows
  },
  tableCell: {
    display: 'flex',
    flex: 0.5, // Equal width for each cell
    padding: 5,
    textAlign: 'left',
  },
  footer: {
    marginTop: 20,
  },
  textWithMarginTop: {
    marginTop: 3, // Add a top margin to the text
  },
});

const SuratPDF: React.FC<SuratPDFProps> = ({
  peminjam,
  tanggal,
  waktu,
  ruangan,
  kegiatan,
  mengetahui,
  status
}) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            src={logo} // Path to the logo image in the assets folder
            style={{ width: 100, height: 100 }} // Adjust the size as needed
          />
        </View>
        <View style={styles.header}>

          <Text style={styles.bold}>MAJELIS JEMAAT</Text>
          <Text style={styles.bold}>GEREJA KRISTEN INDONESIA CIPINANG ELOK</Text>
          <Text style={styles.textWithMarginTop}>ANGGOTA PERSEKUTUAN GEREJA-GEREJA DI INDONESIA</Text>
          <Text style={styles.textWithMarginTop}>Jl. Cipinang Elok I blok G No.1, Jakarta 13420</Text>
          <Text style={styles.textWithMarginTop}>(021) 8191451</Text>
          <Text style={styles.textWithMarginTop}>gki.ciplok@yahoo.com</Text>
          <Text style={[styles.bold, styles.textWithMarginTop]}>SURAT KEPUTUSAN PEMINJAMAN RUANGAN</Text>
        </View>

        <View style={[styles.content, styles.textWithMarginTop]}>
          <Text>Bersama dengan ini, Majelis Jemaat menyatakan bahwa:</Text>

          {/* Table layout using View and flexbox */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell]}>Peminjam:</Text>
              <Text style={styles.tableCell}>{peminjam}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell]}>Hari / Tanggal:</Text>
              <Text style={styles.tableCell}>{tanggal}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell]}>Waktu:</Text>
              <Text style={styles.tableCell}>{waktu}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell]}>Ruangan:</Text>
              <Text style={styles.tableCell}>{ruangan}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell]}>Kegiatan:</Text>
              <Text style={styles.tableCell}>{kegiatan}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell]}>Mejelis Mengetahui:</Text>
              <Text style={styles.tableCell}>{mengetahui}</Text>
            </View>
          </View>

          <Text style={styles.bold}>
            {status === 'Rejected'
              ? 'Belum dapat disetujui untuk menggunakan ruangan sesuai jadwal di atas.'
              : 'Telah disetujui untuk menggunakan ruangan sesuai jadwal di atas.'}
          </Text>
        </View>


        {status !== 'Rejected' && (
          <View style={styles.footer}>
            <Text style={styles.bold}>Ketentuan:</Text>
            <Text>1. Pengguna ruangan tidak boleh mengubah jam pemakaian tanpa konfirmasi terlebih dahulu dengan TU.</Text>
            <Text>2. Pengguna ruangan bertanggung jawab penuh & wajib memelihara kebersihan serta inventaris ruangan.</Text>
            <Text>3. Pengguna ruangan wajib mematikan lampu dan AC sebelum meninggalkan ruangan.</Text>
            <Text>4. Pengguna ruangan wajib menginformasikan kepada Koster, bahwa kegiatan telah selesai.</Text>
          </View>
        )}

        {/* Conditionally render additional message in footer for 'rejected' status */}
        {status === 'Rejected' && (
          <View style={styles.footer}>
            <View style={styles.textWithMarginTop}>
              <Text>Dengan alasan belum memenuhi kriteria peminjaman ruangan yang telah diajukan.</Text>
              <Text>Pemohon dapat mengajukan kembali permintaan ruangan dengan tanggal, jam, dan tempat yang tidak bentrok dengan kegiatan lain.</Text>
              <Text>Terimakasih.</Text>
            </View>
          </View>
        )}
      </Page>
    </Document >
  );
};

export default SuratPDF;
