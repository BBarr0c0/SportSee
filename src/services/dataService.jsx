// Import des données mockées
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../mock/data";

// Constante pour basculer entre Mock et API
const USE_MOCK = true; // Changez à false pour utiliser l'API

// URL de base pour les appels à l'API
const BASE_URL = "http://localhost:3000/user";

/**
 * Fonction utilitaire pour simuler un délai (utilisée dans le mode Mock).
 * @param {number} ms - Temps en millisecondes.
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Normalisation des données principales de l'utilisateur.
 */
const normalizeMainData = (data) => ({
  id: data.id,
  userInfos: data.userInfos,
  todayScore: data.todayScore ?? data.score, // Uniformiser todayScore et score
  keyData: {
    calorieCount: data.keyData.calorieCount,
    proteinCount: data.keyData.proteinCount,
    carbohydrateCount: data.keyData.carbohydrateCount,
    lipidCount: data.keyData.lipidCount,
  },
});

/**
 * Normalisation des données d'activité de l'utilisateur.
 */
const normalizeActivityData = (data) => ({
  userId: data.userId,
  sessions: data.sessions.map((session, index) => ({
    ...session,
    day: (index + 1).toString(), // Numéroter les jours de 1 à 7
  })),
});

/**
 * Correspondance entre les jours et leurs abréviations.
 */
const dayAbbreviations = ["L", "M", "M", "J", "V", "S", "D"];

/**
 * Normalisation des données de sessions moyennes de l'utilisateur.
 * Remplace "day" par l'abréviation correspondante (L, M, M, etc.).
 */
const normalizeAverageSessionsData = (data) => ({
  userId: data.userId,
  sessions: data.sessions.map((session) => ({
    ...session,
    day: dayAbbreviations[session.day - 1], // Mapper day sur les abréviations
  })),
});

/**
 * Normalisation des données de performances de l'utilisateur.
 */

const performanceLabels = {
  cardio: "Cardio",
  energy: "Énergie",
  endurance: "Endurance",
  strength: "Force",
  speed: "Vitesse",
  intensity: "Intensité",
};

const normalizePerformanceData = (data) => ({
  userId: data.userId,
  kind: data.kind,
  data: data.data.map((entry) => ({
    ...entry,
    kindLabel: performanceLabels[data.kind[entry.kind]], // Traduire le label
  })),
});

/**
 * Récupérer les données principales d'un utilisateur.
 */
export const fetchUserMainData = async (userId) => {
  if (USE_MOCK) {
    const user = USER_MAIN_DATA.find((u) => u.id === userId);
    if (!user) throw new Error(`Mock data for user ${userId} not found.`);
    await delay(500);
    return normalizeMainData(user);
  }

  const response = await fetch(`${BASE_URL}/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch user main data.");
  const apiResponse = await response.json();
  return normalizeMainData(apiResponse.data);
};

/**
 * Récupérer l'activité d'un utilisateur.
 */
export const fetchUserActivity = async (userId) => {
  if (USE_MOCK) {
    const activity = USER_ACTIVITY.find((a) => a.userId === userId);
    if (!activity) throw new Error(`Mock activity data for user ${userId} not found.`);
    await delay(500);
    return normalizeActivityData(activity);
  }

  const response = await fetch(`${BASE_URL}/${userId}/activity`);
  if (!response.ok) throw new Error("Failed to fetch user activity data.");
  const apiResponse = await response.json();
  return normalizeActivityData(apiResponse.data);
};

/**
 * Récupérer les sessions moyennes d'un utilisateur.
 */
export const fetchUserAverageSessions = async (userId) => {
  if (USE_MOCK) {
    const averageSessions = USER_AVERAGE_SESSIONS.find((a) => a.userId === userId);
    if (!averageSessions) throw new Error(`Mock average sessions data for user ${userId} not found.`);
    await delay(500);
    return normalizeAverageSessionsData(averageSessions);
  }

  const response = await fetch(`${BASE_URL}/${userId}/average-sessions`);
  if (!response.ok) throw new Error("Failed to fetch user average sessions.");
  const apiResponse = await response.json();
  return normalizeAverageSessionsData(apiResponse.data);
};

/**
 * Récupérer les performances d'un utilisateur.
 */
export const fetchUserPerformance = async (userId) => {
  if (USE_MOCK) {
    const performance = USER_PERFORMANCE.find((p) => p.userId === userId);
    if (!performance) throw new Error(`Mock performance data for user ${userId} not found.`);
    await delay(500);
    return normalizePerformanceData(performance);
  }

  const response = await fetch(`${BASE_URL}/${userId}/performance`);
  if (!response.ok) throw new Error("Failed to fetch user performance data.");
  const apiResponse = await response.json();
  return normalizePerformanceData(apiResponse.data);
};
