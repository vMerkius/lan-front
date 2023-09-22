import axios from "axios";
import { IQuestion } from "../interfaces/IQuestion";
const URL = "https://localhost:7275/api";

export const getUsers = async () => {
  try {
    const res = await axios.get(`${URL}/user`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};

export const getCourses = async () => {
  try {
    const res = await axios.get(`${URL}/course`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
};

export const getCourse = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/course/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch course:", error);
    return {};
  }
};

export const getCourseAllModules = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/course/all/modules/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch modules:", error);
    return [];
  }
};

export const getCourseAllQuizzes = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/course/all/quizzes/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
    return [];
  }
};

export const getModuleQuiz = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/quiz/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch quiz:", error);
    return {};
  }
};

export const getQuizQuestions = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/quiz/all/questions/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return {};
  }
};

export const getQuestionAnswers = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/question/all/answers/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch answers:", error);
    return {};
  }
};

export const addQuestion = async (question: any) => {
  try {
    const res = await axios.post(`${URL}/question`, question);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch question:", error);
    return {};
  }
};
export const deleteQuestion = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/question/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete question:", error);
    return {};
  }
};
export const deleteAnswer = async (id: number) => {
  try {
    const res = await axios.delete(`${URL}/answer/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete answer:", error);
    return {};
  }
};

export const addAnswers = async (answers: any) => {
  try {
    const res = await axios.post(`${URL}/answer/multiple`, answers);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch answers:", error);
    return {};
  }
};
