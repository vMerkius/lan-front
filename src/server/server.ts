import axios from "axios";
import { IQuestion } from "../interfaces/IQuestion";
import { IQuiz, IQuizCreation } from "../interfaces/IQuiz";
import { IModule, IModuleCreation } from "../interfaces/IModule";
import { IWordCreation } from "../interfaces/IWord";
import { IFlashcard, IFlashcardCreation } from "../interfaces/IFlashcard";
import { ILesson, ILessonCreation } from "../interfaces/ILesson";
import { ICourseCreation } from "../interfaces/ICourse";
import { ISubject, ISubjectCreation } from "../interfaces/ISubject";
import { IReplyCreation } from "../interfaces/IReply";
import { IReport } from "../interfaces/IReport";
import { ISentenceCreation } from "../interfaces/ISentence";
const URL = "https://localhost:7275/api";

// User API
export const getUsersAPI = async () => {
  try {
    const res = await axios.get(`${URL}/user`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};

export const getUserAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/user/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return {};
  }
};
export const deleteUserAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/user/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete user:", error);
    return {};
  }
};
export const getUserAgeAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/user/age/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user's age:", error);
    return {};
  }
};

export const getUserCoursesAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/user/courses/attended/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user's courses:", error);
    return {};
  }
};

// Course API
export const getCoursesAPI = async () => {
  try {
    const res = await axios.get(`${URL}/course`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
};

export const getCourseAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/course/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch course:", error);
    return {};
  }
};

export const addCourseAPI = async (course: ICourseCreation) => {
  try {
    const res = await axios.post(`${URL}/course`, course);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch course:", error);
    return {};
  }
};

export const deleteCourseAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/course/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete course:", error);
    return {};
  }
};

export const getCourseAllModulesAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/course/all/modules/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch modules:", error);
    return [];
  }
};

export const getCourseAllQuizzesAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/course/all/quizzes/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
    return [];
  }
};

// Quiz API
export const getModuleQuizAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/quiz/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch quiz:", error);
    return {};
  }
};

export const getQuizQuestionsAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/quiz/all/questions/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return {};
  }
};

export const addQuizAPI = async (quiz: IQuizCreation) => {
  try {
    const res = await axios.post(`${URL}/quiz`, quiz);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch quiz:", error);
    return {};
  }
};

export const deleteQuizAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/quiz/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete quiz:", error);
    return {};
  }
};

export const editQuizAPI = async (id: number, quiz: IQuiz) => {
  try {
    const res = await axios.put(`${URL}/quiz/${id}`, quiz);
    return res.data;
  } catch (error) {
    console.error("Failed to edit quiz:", error);
    return {};
  }
};

// Question API
export const getQuestionAnswersAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/question/all/answers/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch answers:", error);
    return {};
  }
};

export const addQuestionAPI = async (question: any) => {
  try {
    const res = await axios.post(`${URL}/question`, question);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch question:", error);
    return {};
  }
};

export const deleteQuestionAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/question/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete question:", error);
    return {};
  }
};
export const editQuestionAPI = async (id: number, question: IQuestion) => {
  try {
    const res = await axios.put(`${URL}/question/${id}`, question);
    return res.data;
  } catch (error) {
    console.error("Failed to edit question:", error);
    return {};
  }
};

// Module API
export const addModuleAPI = async (module: IModuleCreation) => {
  try {
    const res = await axios.post(`${URL}/module`, module);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch module:", error);
    return {};
  }
};

export const deleteModuleAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/module/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete module:", error);
    return {};
  }
};

export const editModuleAPI = async (id: number, module: IModule) => {
  try {
    const res = await axios.put(`${URL}/module/${id}`, module);
    return res.data;
  } catch (error) {
    console.error("Failed to edit module:", error);
    return {};
  }
};

// Answer API
export const deleteAnswerAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/answer/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete answer:", error);
    return {};
  }
};

export const addAnswersAPI = async (answers: any) => {
  try {
    const res = await axios.post(`${URL}/answer/multiple`, answers);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch answers:", error);
    return {};
  }
};

// Flashcard API
export const getFlashcardsAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/module/all/flashcards/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch flashcards:", error);
    return [];
  }
};

export const addFlashcardAPI = async (flashcard: IFlashcardCreation) => {
  try {
    const res = await axios.post(`${URL}/flashcard`, flashcard);
    return res.data;
  } catch (error) {
    console.error("Failed to add flashcard:", error);
    return {};
  }
};

export const deleteFlashcardAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/flashcard/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete flashcard:", error);
    return {};
  }
};

export const editFlashcardAPI = async (id: number, flashcard: IFlashcard) => {
  try {
    const res = await axios.put(`${URL}/flashcard/${id}`, flashcard);
    return res.data;
  } catch (error) {
    console.error("Failed to edit flashcard:", error);
    return {};
  }
};

export const getFlashcardWordsAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/flashcard/all/words/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch words:", error);
    return {};
  }
};

// Word API
export const deleteWordAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/word/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete word:", error);
    return {};
  }
};

export const addWordAPI = async (word: IWordCreation) => {
  try {
    const res = await axios.post(`${URL}/word`, word);
    return res.data;
  } catch (error) {
    console.error("Failed to add word:", error);
    return {};
  }
};

export const addWordsAPI = async (words: Array<IWordCreation>) => {
  try {
    const res = await axios.post(`${URL}/word/multiple`, words);
    return res.data;
  } catch (error) {
    console.error("Failed to add words:", error);
    return {};
  }
};

//Lessons API
export const getLessonsAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/module/all/lessons/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch lessons:", error);
    return [];
  }
};

export const deleteLessonAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/lesson/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete lesson:", error);
    return {};
  }
};

export const addLessonAPI = async (lesson: ILessonCreation) => {
  try {
    const res = await axios.post(`${URL}/lesson`, lesson);
    return res.data;
  } catch (error) {
    console.error("Failed to add lesson:", error);
    return {};
  }
};
export const editLessonAPI = async (id: number, lesson: ILesson) => {
  try {
    const res = await axios.put(`${URL}/lesson/${id}`, lesson);
    return res.data;
  } catch (error) {
    console.error("Failed to edit lesson:", error);
    return {};
  }
};

//Subject API
export const getLessonSubjectsAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/lesson/all/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
    return {};
  }
};
export const deleteSubjectAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/subject/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete subject:", error);
    return {};
  }
};
export const addSubjectAPI = async (subject: ISubjectCreation) => {
  try {
    const res = await axios.post(`${URL}/subject`, subject);
    return res.data;
  } catch (error) {
    console.error("Failed to add subject:", error);
    return {};
  }
};

//Report API
export const getReportAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/report/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch report:", error);
    return [];
  }
};

export const getReportsAPI = async () => {
  try {
    const res = await axios.get(`${URL}/report`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return [];
  }
};
export const deleteReportAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/report/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete report:", error);
    return {};
  }
};
export const editReportAPI = async (id: number, report: IReport) => {
  try {
    const res = await axios.put(`${URL}/report/${id}`, report);
    return res.data;
  } catch (error) {
    console.error("Failed to edit report:", error);
    return {};
  }
};
export const getReportReplyAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/report/reply/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch reply:", error);
    return [];
  }
};

//Reply API
export const getReplyAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/reply/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch reply:", error);
    return [];
  }
};

export const getReplysAPI = async () => {
  try {
    const res = await axios.get(`${URL}/reply`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch replies:", error);
    return [];
  }
};
export const deleteReplyAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/reply/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete reply:", error);
    return {};
  }
};
export const addReplyAPI = async (reply: IReplyCreation) => {
  try {
    const res = await axios.post(`${URL}/reply`, reply);
    return res.data;
  } catch (error) {
    console.error("Failed to add reply:", error);
    return {};
  }
};

// Stats

export const getStatsAPI = async () => {
  try {
    const res = await axios.get(`${URL}/stats`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return [];
  }
};

// Sentences

export const getSentenceAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/sentence/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch sentence:", error);
    return [];
  }
};

export const getSentencesAPI = async () => {
  try {
    const res = await axios.get(`${URL}/sentence`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch sentences:", error);
    return [];
  }
};
export const deleteSentenceAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/sentence/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete sentence:", error);
    return {};
  }
};
export const addSentenceAPI = async (sentence: ISentenceCreation) => {
  try {
    const res = await axios.post(`${URL}/sentence`, sentence);
    return res.data;
  } catch (error) {
    console.error("Failed to add sentence:", error);
    return {};
  }
};
export const addSentencesAPI = async (sentences: Array<ISentenceCreation>) => {
  try {
    const res = await axios.post(`${URL}/sentence/multiple`, sentences);
    return res.data;
  } catch (error) {
    console.error("Failed to add sentences:", error);
    return {};
  }
};

export const getModuleSentencesAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/module/all/sentences/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch sentences:", error);
    return [];
  }
};
