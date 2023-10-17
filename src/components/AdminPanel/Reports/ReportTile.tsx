import { IReport } from "../../../interfaces/IReport";
import { useNavigate } from "react-router";
import { deleteReportAPI } from "../../../server/server";
import Confirmation from "../../shared/confirmation";
import { useEffect, useState } from "react";

type ReportProps = {
  report: IReport;
  reports: IReport[];
  setReports: (reports: IReport[]) => void;
};

const ReportTile: React.FC<ReportProps> = ({ report, reports, setReports }) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const [chosen, setChosen] = useState<number>(-1);
  const navigate = useNavigate();
  useEffect(() => {
    handleDelete();
  }, [reply]);

  const handleDelete = async () => {
    if (chosen === -1) return;
    try {
      await deleteReportAPI(chosen);
      const newReports = reports.filter((report) => report.id !== chosen);
      setReports(newReports);
      setChosen(-1);
    } catch {
      alert("Unable to delete report");
    }
  };
  return (
    <div className="report-container__tile" key={report.id}>
      {showConfirmation && (
        <Confirmation
          setShowConfirmation={setShowConfirmation}
          setReply={setReply}
        />
      )}
      <div className="report-container__tile__main">
        <button
          onClick={() => {
            setShowConfirmation(true);
            setChosen(report.id);
          }}
          className="report-container__tile__main__delete remove-btn"
        >
          X
        </button>
        <div
          className={`report-container__tile__main__review-status report-container__tile__main__review-status${
            report.isReviewed ? "--reviewed" : "--not-reviewed"
          } `}
        >
          {""}
        </div>

        <div className="report-container__tile__main__info">
          <div className="report-container__tile__main__info__part">
            <h2>Topic:</h2>
            <span>{report.topic}</span>
          </div>
          <div className="report-container__tile__main__info__part">
            <h2>Email:</h2>
            <span>{report.email}</span>
          </div>
        </div>
        <div className="report-container__tile__main__message">
          <h2>Message:</h2>
          <span>{report.message}</span>
        </div>
        <button
          onClick={() => {
            navigate(`/reports/${report.id}`);
          }}
          className="report-container__tile__main__btn"
        >
          Reply &gt;&gt;&gt;{" "}
        </button>
      </div>
    </div>
  );
};
export default ReportTile;
