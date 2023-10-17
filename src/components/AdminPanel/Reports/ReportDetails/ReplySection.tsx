import { IReply } from "../../../../interfaces/IReply";

type ReplySectionProps = {
  reply: IReply;
};

const ReplySection: React.FC<ReplySectionProps> = ({ reply }) => {
  return (
    <div className="reply-section-container">
      <span>{reply.message}</span>
    </div>
  );
};
export default ReplySection;
