import { useEffect, useState } from "react";
import { IReport } from "../../../interfaces/IReport";
import { getReportsAPI } from "../../../server/server";
import "./reports.scss";
import ReportTile from "./ReportTile";

const Reports = () => {
  const [reports, setReports] = useState<IReport[]>([]);
  useEffect(() => {
    const fetchReports = async () => {
      const fetchedReports = await getReportsAPI();
      setReports(fetchedReports);
    };
    fetchReports();
  }, []);
  return (
    <div className="report-container">
      <h1>Reports:</h1>
      {reports.map((report) => (
        <ReportTile
          key={report.id}
          report={report}
          reports={reports}
          setReports={setReports}
        />
      ))}
      ;
    </div>
  );
};
export default Reports;
