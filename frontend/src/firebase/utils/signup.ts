import firebase_app from "../config";
import { UserCredential, createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(email: string, password: string): Promise<{ result: UserCredential | null; error: Error | null }> {
  let result: UserCredential | null = null;
  let error: Error | null = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    error = e;
  }

  return { result, error };
}
