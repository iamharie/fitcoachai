// Firebase configuration
// TODO: Replace with your actual Firebase config
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com/",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase (uncomment when you have your config)
/*
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
*/