import {auth, db} from "@/firebase";
import {doc, getDoc, increment, updateDoc} from "@firebase/firestore";

export const checkApiLimit = async () => {
    const user = auth.currentUser

    if (!user) {
        return false;
    }

    const userSnap = await getDoc(doc(db, 'users', user.uid))
    if (!userSnap.exists()) {
        return false
    }
    const amountOfUsages = userSnap.data().amountOfUsages

    return amountOfUsages < 10;
};

export const incrementApiLimit = async () => {
    const user = auth.currentUser

    if (!user) {
        return false;
    }

    await updateDoc(doc(db, 'users', user.uid), {
        amountOfUsages: increment(1)
    })

}
