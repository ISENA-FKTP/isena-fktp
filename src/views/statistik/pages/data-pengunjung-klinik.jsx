import Sidebar from "../../../components/statistik/sidebar";

export default function DataPengunjungKlinik() {
  return (
    <>
      {" "}
      <div className="flex">
        <Sidebar />
        <div className="p-7">
          <h1 className="text-2xl font-semibold">Data Pengunjung Klinik</h1>
        </div>
      </div>
    </>
  );
}