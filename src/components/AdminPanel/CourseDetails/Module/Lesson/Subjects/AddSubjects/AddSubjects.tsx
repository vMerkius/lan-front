import { useEffect, useState } from "react";
import "./add-subjects.scss";
import { addSubjectAPI } from "../../../../../../../server/server";

import React from "react";
// import { Editor } from "./Editor";

import { ContentState, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";

type AddSubjectsProps = {
  setShowAddSection: (show: boolean) => void;
  idLesson: number;
};
const AddSubjects: React.FC<AddSubjectsProps> = ({
  setShowAddSection,
  idLesson,
}) => {
  const _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw); // ContentState JSON
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);
  console.log(convertedContent);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    lessonId: 0,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = () => {
    const dataSend: any = {
      ...formData,
      lessonId: idLesson,
    };
    if (dataSend.name === "" || dataSend.description === "") {
      alert("Fill all fields");
    } else {
      addSubjectAPI(dataSend);
      window.location.reload();
    }
  };

  return (
    <div className="add-subjects-container">
      <div className="add-subjects-container__add">
        <Editor
          defaultContentState={contentState}
          onContentStateChange={setContentState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
        {/* <Editor /> */}
        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddSection(false);
          }}
        >
          X
        </button>
        <h2 className="add-subjects-container__add__heading">Subjects:</h2>
        <form className="add-subjects-container__add__form">
          <label className="add-subjects-container__add__form__row">
            Name:
            <input
              className="input-style"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className="add-subjects-container__add__form__row">
            Description:
            <textarea
              className="input-style"
              // type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label className="add-subjects-container__add__form__row">
            Image URL:
            <input
              className="input-style"
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </label>

          <button
            className="add-btn add-subjects-container__add__form__button"
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

export default AddSubjects;
