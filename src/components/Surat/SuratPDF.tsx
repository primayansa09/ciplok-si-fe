import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font
} from '@react-pdf/renderer';
import logo from '../../assets/logo.png';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


interface SuratPDFProps {
  peminjam: string;
  tanggal: string;
  waktu: string;
  ruangan: string;
  kegiatan: string;
  mengetahui: string;
  status: string;
}

Font.register({
  family: 'NotoEmoji',
  src: 'https://github.com/googlefonts/noto-emoji/blob/main/fonts/NotoEmoji-Regular.ttf?raw=true',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  headerTextWrapper: {
    flex: 1,
    alignItems: 'center', // center the text block horizontally
    justifyContent: 'center',
  },
  headerTextLine1: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  headerTextLine2: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  headerTextLine3: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 2,
  },
  headerAddress: {
    fontSize: 10,
    marginTop: 3,
  },
  contactInfo: {
    fontSize: 10,
    marginTop: 2,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 6,
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    marginVertical: 6,
    fontWeight: 'bold',
  },
  content: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  label: {
    width: 120,
  },
  separator: {
    width: 10,
  },
  value: {
    flex: 1,
  },
  footer: {
    marginTop: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

const SuratPDF: React.FC<SuratPDFProps> = ({
  peminjam,
  tanggal,
  waktu,
  ruangan,
  kegiatan,
  mengetahui,
  status,
}) => {
  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image src={logo} style={styles.logo} />
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerTextLine1}>MAJELIS JEMAAT</Text>
            <Text style={styles.headerTextLine2}>
              GEREJA KRISTEN INDONESIA CIPINANG ELOK
            </Text>
            <Text style={styles.headerTextLine3}>
              ANGGOTA PERSEKUTUAN GEREJA-GEREJA DI INDONESIA
            </Text>
            <Text style={styles.headerAddress}>
              Jl. Cipinang Elok I blok G No.1, Jakarta 13420
            </Text>
            <Text style={styles.contactInfo}>
              (021) 8191451   gki.ciplok@yahoo.com
            </Text>
          </View>
        </View>

        <View style={styles.line} />

        <Text style={styles.title}>SURAT KEPUTUSAN PEMINJAMAN RUANGAN</Text>

        <View style={styles.content}>
          <Text style={{ marginBottom: 6 }}>
            Bersama dengan ini, Majelis Jemaat menyatakan bahwa:
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Peminjam</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.value}>{peminjam}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Hari / Tanggal</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.value}>{tanggal}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Waktu</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.value}>{waktu}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ruangan</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.value}>{ruangan}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Kegiatan</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.value}>{kegiatan}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Majelis Mengetahui</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.value}>{mengetahui}</Text>
          </View>

          {/* Status */}
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
            }}
          >
            {status === 'Rejected'
              ? 'Belum dapat disetujui untuk menggunakan ruangan sesuai jadwal di atas.'
              : 'Telah disetujui untuk menggunakan ruangan sesuai jadwal di atas.'}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {status !== 'Rejected' ? (
            <>
              <Text style={styles.bold}>Ketentuan:</Text>
              <Text>1. Pengguna ruangan tidak boleh mengubah jam pemakaian tanpa konfirmasi terlebih dahulu dengan TU</Text>
              <Text>2. Pengguna ruangan bertanggung jawab penuh & wajib memelihara kebersihan serta inventaris ruangan</Text>
              <Text>3. Pengguna ruangan wajib mematikan lampu dan AC sebelum meninggalkan ruangan</Text>
              <Text>4. Pengguna ruangan wajib menginformasikan kepada Koster, bahwa kegiatan telah selesai</Text>
            </>
          ) : (
            <>
              <Text>Dengan alasan belum memenuhi kriteria peminjaman ruangan yang telah diajukan.</Text>
              <Text>Pemohon dapat mengajukan kembali permintaan ruangan dengan tanggal, jam, dan tempat yang tidak bentrok dengan kegiatan lain.</Text>
              <Text>Terima kasih.</Text>
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default SuratPDF;
