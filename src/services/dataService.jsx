// Import mocked data
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "../mock/data";

// toggle between Mock and API
const USE_MOCK = true; // true = mock / false = API

// URL for API calls
const BASE_URL = "http://localhost:3000/user";

/*******
 * Utility function to simulate a delay (used in Mock mode).
 * @param {number} ms
********/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/********
 * Normalization of user core data.
*********/
const normalizeMainData = (data) => ({
  id: data.id,
  userInfos: data.userInfos,
  todayScore: data.todayScore ?? data.score, // Standardize todayScore and score
  keyData: {
    calorieCount: data.keyData.calorieCount,
    proteinCount: data.keyData.proteinCount,
    carbohydrateCount: data.keyData.carbohydrateCount,
    lipidCount: data.keyData.lipidCount,
  },
});

/*******
 * Normalization of user activity data.
********/
const normalizeActivityData = (data) => ({
  userId: data.userId,
  sessions: data.sessions.map((session, index) => ({
    ...session,
    day: (index + 1).toString(), // Number the days from 1 to 7
  })),
});

/*******
 * Correspondence between days and their abbreviations.
*******/
const dayAbbreviations = ["L", "M", "M", "J", "V", "S", "D"];

/******
* Normalizes average user session data.
* Replaces "day" with the corresponding abbreviation (L, M, M, etc.).
*******/
const normalizeAverageSessionsData = (data) => ({
  userId: data.userId,
  sessions: data.sessions.map((session) => ({
    ...session,
    day: dayAbbreviations[session.day - 1], // Mapper day on abbreviations
  })),
});

/******
 * Normalization of user performance data.
********/

const performanceLabels = {
  cardio: "Cardio",
  energy: "Énergie",
  endurance: "Endurance",
  strength: "Force",
  speed: "Vitesse",
  intensity: "Intensité",
};

const normalizePerformanceData = (data) => {
  // Desired order
  const performanceOrder = ["intensity", "speed", "strength", "endurance", "energy", "cardio"];
  
  const orderedData = performanceOrder.map((kind) => {
    const entry = data.data.find((e) => data.kind[e.kind] === kind);
    return {
      ...entry,
      kindLabel: performanceLabels[kind],
    };
  });

  return {
    userId: data.userId,
    kind: data.kind,
    data: orderedData,
  };
};

/******
 * Retrieve a user's primary data.
*******/
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

/******
 * Retrieve a user's activity.
*******/
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

/*******
 * Retrieve a user's average sessions.
*******/
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

/********
 * Retrieve a user's performance.
*********/
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
