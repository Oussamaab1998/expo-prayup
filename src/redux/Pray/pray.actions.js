import { updateDoc } from "firebase/firestore";
import { auth } from "../../firebase/utils";

export const addToPrayersNumber = () => async (dispatch) => {
    var numberOfPrayers;
    const userId = auth.currentUser.uid;
    try {
        const q = query(collection(db, "prayers"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (doc.id === userId) {
                numberOfPrayers = doc.data().prayers;
            }
        });
        await updateDoc(doc(db, "prayers", userId), {
            prayers: numberOfPrayers
        });
    } catch (err) {
        console.log("Error from Add To Prayers Number action !!");
        console.log(err);
    }
};