import { useEffect, useState } from "react";
import { IReport } from "../../../interfaces/IReport";
import { getReportsAPI } from "../../../server/server";
import "./reports.scss";
import { useContext } from "react";
import ReportTile from "./ReportTile";
import PagingPanel from "../Users/PagingPanel";
import SearchBarContext from "../../SearchBar/SearchBarContext";

const Reports = () => {
  const { searchValue, setSearchValue } = useContext(SearchBarContext);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reports, setReports] = useState<IReport[]>([]);
  const [displayedReports, setDisplayedReports] = useState<IReport[]>([]);
  const totalPages = Math.ceil(reports.length / itemsPerPage);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setSearchValue("");
    const fetchReports = async () => {
      let fetchedReports = await getReportsAPI();
      fetchedReports = fetchedReports.sort((a: IReport, b: IReport) => {
        if (a.isReviewed && !b.isReviewed) {
          return 1;
        } else if (!a.isReviewed && b.isReviewed) {
          return -1;
        } else {
          return 0;
        }
      });
      setReports(fetchedReports);
    };
    fetchReports();
  }, []);
  useEffect(() => {
    const filteredReports = reports.filter((report) =>
      report.topic.toLowerCase().includes(searchValue.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setDisplayedReports(filteredReports.slice(startIndex, endIndex));
  }, [searchValue, currentPage, reports]);
  return (
    <div className="report-container">
      <h1>Reports:</h1>
      {displayedReports.map((report) => (
        <ReportTile
          key={report.id}
          report={report}
          reports={reports}
          setReports={setReports}
        />
      ))}
      <PagingPanel
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />{" "}
    </div>
  );
};
export default Reports;
