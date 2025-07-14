import React from "react";
import "./App.css";
import Sidebar from "./components/SideMenu/SideBar";
import { useLocation } from "react-router-dom";
// import AppNavBar from "./components/NavBar/NavBar";
import { FooterPublicRoutes } from "./components/Footer/footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DataMajelis } from "./pages/dataMajelis/DataMajelis";
import { DataPeminjam } from "./pages/dataPeminjam/DataPeminjam";
import { DataKegiatan } from "./pages/dataKegiatan/DataKegiatan";
import { DataRuangan } from "./pages/dataRuangan/DataRuangan";
import { PeminjamanRuangan } from "./pages/formPeminjaman/PeminjamanRuangan";
import { Approval } from "./pages/approval/Approval";
import { ManageMajelis } from "./pages/dataMajelis/ManageMajelis";
import { ManagePeminjam } from "./pages/dataPeminjam/ManageDataPeminjam";
import { ManageKegiatan } from "./pages/dataKegiatan/ManageDataKegiatan";
import { ManageRuangan } from "./pages/dataRuangan/ManageRuangan";
import { ManagePeminjamanRuangan } from "./pages/formPeminjaman/ManagePeminjamanRuangan";
import { DetailApproval } from "./pages/approval/DetailApproval";
import { Login } from "./pages/login/login";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {isLoginPage ? (
        // Full page khusus login (tanpa sidebar & navbar)
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        // Layout utama untuk halaman lain
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {/* <AppNavBar /> */}
         
            <main style={{ padding: 20, flex: 1, overflowY: "auto" }}>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route
                  path="/master-data/data-majelis"
                  element={<DataMajelis />}
                />
                <Route
                  path="/master-data/data-peminjam"
                  element={<DataPeminjam />}
                />
                <Route
                  path="/master-data/data-kegiatan"
                  element={<DataKegiatan />}
                />
                <Route
                  path="/master-data/data-ruangan"
                  element={<DataRuangan />}
                />
                <Route
                  path="/pinjam-ruangan/form-peminjaman"
                  element={<PeminjamanRuangan />}
                />
                <Route path="/pinjam-ruangan/approval" element={<Approval />} />
                <Route path="manage-majelis" element={<ManageMajelis />} />
                <Route path="manage-peminjam" element={<ManagePeminjam />} />
                <Route path="manage-kegiatan" element={<ManageKegiatan />} />
                <Route path="manage-ruangan" element={<ManageRuangan />} />
                <Route
                  path="manage-peminjaman-ruangan"
                  element={<ManagePeminjamanRuangan />}
                />
                <Route path="detail-approval" element={<DetailApproval />} />
              </Routes>
            </main>
           <FooterPublicRoutes />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
