import { useEffect, useState } from "react";
import PieChartPolisi from "./diagram/PieChart/PieChartPolisi";
import PieChartApotik, {
  TotalObatYear,
} from "./diagram/PieChart/PieChartApotik";
import Sidebar from "../../components/statistik/sidebar";
import BarChart from "./diagram/BarChart/BarChart";
import LineChart from "./diagram/LineChart/LineChart";
import {
  FaCircleArrowUp,
  FaCircleArrowDown,
  FaPeopleGroup,
  FaVirus,
} from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { GiMedicines } from "react-icons/gi";
import Header from "../../components/header";
import { DataSektor } from "./model/dataSektor";
import { IoSearch } from "react-icons/io5";
import { DataPegawaiRawat } from "./model/dataPegawaiRawat";
import { DataSakit } from "./model/dataSakit";

const currentYear = new Date().getFullYear();

export default function Statistik() {
  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState("most");
  const [sortedData, setSortedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { totalJumlahObat, totalObatKeluar } = TotalObatYear(year);
  const total = totalJumlahObat + totalObatKeluar;
  let persen_obat_masuk = 0;
  let persen_obat_keluar = 0;

  if (total === 0) {
    persen_obat_masuk = 0;
    persen_obat_keluar = 0;
  } else {
    persen_obat_masuk = ((totalJumlahObat / total) * 100).toFixed(1);
    persen_obat_keluar = ((totalObatKeluar / total) * 100).toFixed(1);
  }

  useEffect(() => {
    setData(DataSakit);
    filterDataByYear(DataSakit, year);
  }, [year]);

  useEffect(() => {
    filterDataByYear(data, year);
  }, [year, data]);

  const filterDataByYear = (data, year) => {
    const filtered = data.filter(
      (item) => new Date(item.tanggal).getFullYear() === parseInt(year)
    );
    setFilteredData(filtered);
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
  };

  const colorsPenyakit = [
    "#5726FF",
    "#FACC15",
    "#FCE073",
    "#DDD4FF",
    "#0099FF",
  ];
  const colorsSektor = ["#5726FF", "#FD9A28"];

  const combinedData = DataSektor.map((polisi) => ({
    ...polisi,
    rawat: DataPegawaiRawat.find((rawat) => rawat.uuid === polisi.uuid),
  }));

  useEffect(() => {
    const sorted =
      sortBy === "most"
        ? [...combinedData].sort((a, b) => b.rawat.lamacuti - a.rawat.lamacuti)
        : [...combinedData].sort((a, b) => a.rawat.lamacuti - b.rawat.lamacuti);
    setSortedData(sorted);
  }, [combinedData, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPolisi = sortedData.filter((entry) =>
    entry.namapegawai.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-[#E0F1EE] font-primary ">
        {/* Sidebar */}
        <div className="fixed z-50">
          <Sidebar
            userName="Rifki Rusdi Satma Putra"
            userStatus="Kepala Polisi"
            profilePicture="logo.png"
          />
        </div>
        <Header
          title="Statistik Data Laporan"
          userName="Rifki Rusdi Satma Putra"
          userStatus="Kepala Polisi"
          profilePicture="logo.png"
        />

        <div className="container mx-auto pl-5 pt-20 lg:pt-0">
          {/* Filter */}
          <div className="flex pt-7 gap-3 place-content-end pr-5">
            <div>
              <label htmlFor="year" className="mr-2">
                Tahun:
              </label>
              <select
                id="year"
                value={year}
                onChange={handleYearChange}
                className="p-2 rounded-md"
              >
                {[...Array(10)].map((_, i) => {
                  const y = currentYear - i;
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Statistik */}
          <div className="lg:flex pt-7 gap-3 place-content-center flex-wrap pr-5 lg:pr-0">
            {/* Polisi Sakit */}
            <div className="flex bg-white px-5 py-3 rounded-lg shadow-lg mb-3 lg:mb-0">
              <div className="text-white bg-primary-600 rounded-md">
                <BsPeopleFill size={75} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">28</h1>
                <h3 className="font-semibold text-lg">Polisi Sakit</h3>
              </div>
            </div>

            {/* Pengunjung Klinik */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg mb-3 lg:mb-0">
              <div className="text-white bg-primary-600 rounded-md place-content-center">
                <FaPeopleGroup size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">108</h1>
                <h3 className="font-semibold text-lg">Pengunjung Klinik</h3>
              </div>
            </div>

            {/* Obat Masuk */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg mb-3 lg:mb-0">
              <div className="text-white bg-primary-600 rounded-md">
                <GiMedicines size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">{totalJumlahObat}</h1>
                <h3 className="font-semibold text-lg">Obat Masuk</h3>
              </div>
            </div>

            {/* Obat Keluar */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg mb-3 lg:mb-0">
              <div className="text-white bg-primary-600 rounded-md">
                <GiMedicines size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">{totalObatKeluar}</h1>
                <h3 className="font-semibold text-lg">Obat Keluar</h3>
              </div>
            </div>

            {/* Jenis Penyakit */}
            <div className="flex bg-white px-4 py-3 rounded-lg shadow-lg mb-3 lg:mb-0">
              <div className="text-white bg-primary-600 rounded-md">
                <FaVirus size={70} className="p-2" />
              </div>
              <div className="place-content-center ml-3">
                <h1 className="text-3xl font-bold">12</h1>
                <h3 className="font-semibold text-lg">Jenis Penyakit</h3>
              </div>
            </div>
          </div>

          {/* Statistik */}
          <div className="lg:flex gap-3 place-content-center mr-5 lg:mr-0">
            {/* Pie Chart Polisi */}
            <div className="lg:py-7 py-3">
              <div className="shadow-lg py-2 rounded-lg bg-white">
                <div className="flex place-content-between pl-5">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Jenis Penyakit</h1>
                  </div>
                  <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 mr-5 rounded-full font-medium">
                    {year}
                  </p>
                </div>
                <div className="h-96 w-96 mb-2 lg:px-0 px-2 ">
                  <PieChartPolisi data={filteredData} colors={colorsPenyakit} />
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="lg:py-7 py-3">
              <div className="shadow-lg py-2 lg:px-5 rounded-lg bg-white">
                <div className="flex place-content-between px-5">
                  <div className="font-semibold">
                    <h1 className="text-secondary-400">Jenis Data</h1>
                    <h1>Jumlah Sakit Kesatuan Polisi</h1>
                  </div>
                  <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 rounded-full font-medium">
                    {year}
                  </p>
                </div>
                <div className="h-96 w-96 mt-2 lg:px-0 px-2">
                  <BarChart colors={colorsSektor} year={year.toString()} />
                </div>
              </div>
            </div>

            {/* Line Chart */}
            <div className="lg:flex-col">
              <div className="pt-7 pb-3">
                <div className="shadow-lg py-2 lg:px-5 rounded-lg bg-white">
                  <div className="flex place-content-between px-5">
                    <div className="font-semibold">
                      <h1 className="text-secondary-400">Jenis Data</h1>
                      <h1>Jumlah Sakit Kesatuan Polisi</h1>
                    </div>
                    <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 rounded-full font-medium">
                      {year}
                    </p>
                  </div>
                  <div className="lg:h-[149px] lg:px-0 px-2 h-60 w-96 mt-2 ">
                    <LineChart year={year.toString()} />
                  </div>
                </div>
              </div>

              {/* Pie Chaart Apotik */}
              <div className="pb-7">
                <div className="shadow-lg py-2 lg:px-5 rounded-lg bg-white">
                  <div className="flex place-content-between px-5">
                    <div className="font-semibold">
                      <h1 className="text-secondary-400">Jenis Data</h1>
                      <h1>Jumlah Obat Keluar/Masuk</h1>
                    </div>
                    <p className="bg-primary-200 text-primary-500 place-content-center my-2 px-5 rounded-full font-medium">
                      {year}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="h-[151px] w-44 mt-2 ">
                      <PieChartApotik
                        colors={colorsSektor}
                        year={year.toString()}
                      />
                    </div>
                    <div className="place-content-center text-base font-semibold ">
                      <div className="flex gap-4 place-content-center mb-3">
                        <div className="text-success-700 place-content-center">
                          <FaCircleArrowUp />
                        </div>
                        <p>
                          {persen_obat_masuk}% Obat Masuk ({totalJumlahObat})
                        </p>
                      </div>
                      <div className="flex gap-4 lg:px-0 px-2">
                        <div className="text-error-600 place-content-center">
                          <FaCircleArrowDown />
                        </div>
                        <p>
                          {persen_obat_keluar}% Obat Keluar ({totalObatKeluar})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Data Pengunjung */}
        <div className="container mx-auto pb-10 lg:pl-3 pl-5">
          <h1 className="text-2xl font-bold mt-4 mb-2 ">
            Data Seluruh Pengunjung Klinik
          </h1>
          <h2 className="text-xl font-semibold mb-4 text-secondary-500">
            Seluruh data terkait pengunjung di klinik
          </h2>
          <div className="flex justify-between mb-4">
            <div>
              <label htmlFor="sort">Urutkan berdasarkan:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="lg:ml-2 mt-2 lg:mt-0 border border-primary-600 rounded-md shadow-sm "
              >
                <option value="most">Cuti Terbanyak</option>
                <option value="least">Cuti Tersedikit</option>
              </select>
            </div>
            <div className="flex items-center mt-9 lg:mt-0">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <IoSearch className="text-xl text-gray-500" />
                </span>
                <input
                  type="text"
                  placeholder="Cari pengunjung..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="lg:px-2 lg:w-auto w-40 py-1 pl-8 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-primary-600 placeholder:ml-5"
                  style={{ paddingLeft: "2rem" }}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto pr-5 lg:pr-0">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tl-lg">
                    No
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">Nama</th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Pangkat/NRP
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Satuan Kerja
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Jenis Sakit
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Jenis Perawatan
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Sumber Biaya
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Awal Sakit
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white">
                    Lama Cuti
                  </th>
                  <th className="px-4 py-2 bg-primary-600 text-white ">WFH</th>
                  <th className="px-4 py-2 bg-primary-600 text-white rounded-tr-lg">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPolisi.map((entry, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0 ? "bg-primary-50" : "bg-primary-100"
                    }
                  >
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.namapegawai}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.pangkat + "/" + entry.nrp}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.satuankerja}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.jenispenyakit}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.jenisperawatan}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.sumberbiaya}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.awalsakit}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.lamacuti}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.WFH}
                    </td>
                    <td className="border border-primary-600 px-4 py-2 text-center">
                      {entry.rawat.keterangan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
