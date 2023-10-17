import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getReportAPI, getReportReplyAPI } from "../../../../server/server";
import { IReport } from "../../../../interfaces/IReport";
import ReportSection from "./ReportSection";
import { IReply } from "../../../../interfaces/IReply";
import AddReply from "./AddReply";
import ReplySection from "./ReplySection";

const ReportDetails = () => {
  const value = useParams();
  const id = Number(value.id);
  const [report, setReport] = useState<IReport>({
    id: 0,
    topic: "",
    email: "",
    message: "",
    isReviewed: false,
  });
  const [reply, setReply] = useState<IReply>({
    id: 0,
    message: "",
    reportId: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReport = await getReportAPI(id);
      let fetchedReply;
      if (fetchedReport.isReviewed) fetchedReply = await getReportReplyAPI(id);
      setReply(fetchedReply);
      setReport(fetchedReport);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Report Details:</h1>
      <ReportSection report={report} />

      <h1>Reply: </h1>
      {report.isReviewed ? (
        <ReplySection reply={reply} />
      ) : (
        <AddReply id={id} report={report} />
      )}
    </div>
  );
};

export default ReportDetails;
