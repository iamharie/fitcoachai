import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  // Basic Information
  name: string;
  age: string;
  email: string;
  weight: string;
  height: string;
  gender: "male" | "female";
  activityLevel: string;
  goal: string;

  // Dietary Preferences
  dietaryRestrictions: string[];

  // Calculated Results
  bmr?: number;
  tdee?: number;
  goalCalories?: number;
  bmi?: number;
  weightStatus?: string;

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

interface UserState {
  profile: UserProfile;
  isProfileComplete: boolean;
  isDietaryPreferencesComplete: boolean;
}

const initialState: UserState = {
  profile: {
    name: "",
    age: "",
    email: "",
    weight: "",
    height: "",
    gender: "male",
    activityLevel: "moderate",
    goal: "maintain",
    dietaryRestrictions: [],
  },
  isProfileComplete: false,
  isDietaryPreferencesComplete: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateBasicInfo: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.profile = { ...state.profile, ...action.payload };
      state.profile.updatedAt = new Date().toISOString();

      // Check if basic info is complete
      const { name, age, email, weight, height } = state.profile;
      state.isProfileComplete = !!(name && age && email && weight && height);
    },

    updateCalculatedResults: (
      state,
      action: PayloadAction<{
        bmr: number;
        tdee: number;
        goalCalories: number;
        bmi: number;
        weightStatus: string;
      }>
    ) => {
      state.profile = { ...state.profile, ...action.payload };
      state.profile.updatedAt = new Date().toISOString();
    },

    updateDietaryPreferences: (
      state,
      action: PayloadAction<{ dietaryRestrictions: string[] }>
    ) => {
      state.profile.dietaryRestrictions = action.payload.dietaryRestrictions;
      state.profile.updatedAt = new Date().toISOString();
      state.isDietaryPreferencesComplete = true;
    },

    setCreatedAt: (state) => {
      if (!state.profile.createdAt) {
        state.profile.createdAt = new Date().toISOString();
      }
    },

    resetProfile: (state) => {
      state.profile = initialState.profile;
      state.isProfileComplete = false;
      state.isDietaryPreferencesComplete = false;
    },
  },
});

export const {
  updateBasicInfo,
  updateCalculatedResults,
  updateDietaryPreferences,
  setCreatedAt,
  resetProfile,
} = userSlice.actions;

export default userSlice.reducer;
