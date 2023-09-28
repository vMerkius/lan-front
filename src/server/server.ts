import axios from "axios";
import { IQuestion } from "../interfaces/IQuestion";
import { IQuiz, IQuizCreation } from "../interfaces/IQuiz";
import { IModuleCreation } from "../interfaces/IModule";
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

export const addFlashcardAPI = async (flashcard: any) => {
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
