import { useState } from "react";
import { IReplyCreation } from "../../../../interfaces/IReply";
import { IReport } from "../../../../interfaces/IReport";
import { addReplyAPI, editReportAPI } from "../../../../server/server";
import "./report-section.scss";

type AddReplyProps = {
  id: number;
  report: IReport;
};
const AddReply: React.FC<AddReplyProps> = ({ id, report }) => {
  const [reply, setReply] = useState<IReplyCreation>({
    message: "",
    reportId: id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply({ ...reply, message: e.target.value });
  };

  const handleAdd = () => {
    if (reply.message === "") {
      alert("Please fill all the fields");
    } else {
      const reportToSend = {
        ...report,
        isReviewed: true,
      };
      console.log(reportToSend, id);

      editReportAPI(id, reportToSend);
      addReplyAPI(reply);
      window.location.reload();
    }
  };

  return (
    <div>
      <form className="add-reply-container">
        <textarea
          className="input-style"
          placeholder="Reply"
          onChange={handleChange}
        ></textarea>
        <button
          className="add-btn--big"
          onClick={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AddReply;
