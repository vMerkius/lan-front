import { useState } from "react";
import "./add-flashcard.scss";
import { addFlashcardAPI } from "../../../../../../server/server";

type AddFlashcardProps = {
  setShowAddSection: (show: boolean) => void;
  idModule: number;
};
const AddFlashcard: React.FC<AddFlashcardProps> = ({
  setShowAddSection,
  idModule,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    moduleId: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = () => {
    const dataSend: any = {
      ...formData,
      moduleId: idModule,
    };
    console.log(dataSend);

    addFlashcardAPI(dataSend);
    window.location.reload();
  };
  return (
    <div className="container">
      <div className="container__add">
        <button
          onClick={() => {
            setShowAddSection(false);
          }}
        >
          X
        </button>
        <h2>add Flashcard</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFlashcard;
