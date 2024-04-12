import { getDoc, doc } from "firebase/firestore";
import { db } from "./fb"; // Assuming `db` is imported from your Firebase configuration file
const GetArrayFromFirestore = async (documentId) => {
  try {
    const docRef = doc(db, "todoData", documentId); // Reference the specific document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
      const retrievedData = docSnap.data();

      // Check if 'mainLists' property exists and is an array
      if (
        retrievedData.hasOwnProperty("mainLists") &&
        Array.isArray(retrievedData.mainLists)
      ) {
        // Extract and return the array
        console.log(retrievedData.mainLists);
        return retrievedData.mainLists;
      } else {
        console.warn("Document doesn't contain a 'mainLists' array property.");
        return []; // Return empty array if not found
      }
    } else {
      console.log("No document found!");
      return []; // Return empty array if document doesn't exist
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return []; // Return empty array on error
  }
};
export default GetArrayFromFirestore;
