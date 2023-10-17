import { IReport } from "../../../../interfaces/IReport";
import "./report-section.scss";

type RepostSectionProps = {
  report: IReport;
};

const ReportSection: React.FC<RepostSectionProps> = ({ report }) => {
  return (
    <div className="report-section__tile" key={report.id}>
      <div className="report-section__tile__main">
        <div
          className={`report-section__tile__main__review-status report-section__tile__main__review-status${
            report.isReviewed ? "--reviewed" : "--not-reviewed"
          } `}
        >
          {""}
        </div>

        <div className="report-section__tile__main__info">
          <div className="report-section__tile__main__info__part">
            <h2>Topic:</h2>
            <span>{report.topic}</span>
          </div>
          <div className="report-section__tile__main__info__part">
            <h2>Email:</h2>
            <span>{report.email}</span>
          </div>
        </div>
        <div className="report-section__tile__main__message">
          <h2>Message:</h2>
          <span>{report.message}</span>
        </div>
      </div>
    </div>
  );
};
export default ReportSection;
