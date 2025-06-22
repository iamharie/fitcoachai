import { ref, push, set, get } from "firebase/database";
import { database } from "../firebase/config";
import type { UserProfile } from "../store/slices/userSlice";

export const saveUserProfile = async (
  userProfile: UserProfile
): Promise<string | null> => {
  try {
    const usersRef = ref(database, "users");
    const newUserRef = push(usersRef);

    const profileData = {
      ...userProfile,
      createdAt: userProfile.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await set(newUserRef, profileData);
    console.log("User profile saved successfully:", newUserRef.key);
    return newUserRef.key;
  } catch (error) {
    console.error("Error saving user profile:", error);
    return null;
  }
};

export const getUserProfile = async (
  userId: string
): Promise<UserProfile | null> => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val() as UserProfile;
    } else {
      console.log("No user data found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<boolean> => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await set(userRef, updateData);
    console.log("User profile updated successfully");
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
};

// Test form
export const saveFormData = async (formData: any) => {
  const dbRef = ref(database, "test_form_submissions");

  await push(dbRef, {
    ...formData,
    submittedAt: new Date().toISOString(),
  });
};
