import Sidebar from "../../../components/manage/sidebar";
import Header from "../../../components/header";
import { FormDataRekamMedis } from "../../../components/manage/formDataRekamMedis";

export default function TambahDataRekamMedis() {
  return (
    <div className=" font-primary">
      {/* Sidebar */}
      <div className="fixed z-50">
        <Sidebar />
      </div>
      <Header
        title="Tambah Rekam Medis Sakit Polisi"
        userName="Rifki Rusdi Satma Putra"
        userStatus="Kepala Polisi"
        profilePicture="/logo.png"
      />
      <main className="mt-12 ml-32 mr-12 space-y-4 pb-10 ">
        <FormDataRekamMedis />
      </main>
    </div>
  );
}
