import "./confirmation.scss";
const Confirmation = ({ setShowConfirmation, setReply }: any) => {
  const handleClickYes = () => {
    setShowConfirmation(false);
    setReply(true);
  };
  const handleClickNo = () => {
    setShowConfirmation(false);
    setReply(false);
  };
  return (
    <div className="confirmation-container">
      <div className="confirmation-container__window">
        <h2>Are u sure?</h2>
        <div className="confirmation-container__window__buttons">
          <button
            className="add-btn--big confirmation-container__window__buttons__button"
            onClick={(e) => {
              e.preventDefault();
              handleClickYes();
            }}
          >
            Yes
          </button>
          <button
            className="add-btn--big confirmation-container__window__buttons__button confirmation-container__window__buttons__button--delete"
            onClick={(e) => {
              e.preventDefault();
              handleClickNo();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
