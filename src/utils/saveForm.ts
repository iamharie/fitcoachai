import { database } from "../firebase/config";
import { ref, push } from "firebase/database";

export const saveFormData = async (formData: any) => {
  const dbRef = ref(database, "form_submissions");

  await push(dbRef, {
    ...formData,
    submittedAt: new Date().toISOString(),
  });
};
