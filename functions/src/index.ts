import * as functions from "firebase-functions"
const admin = require("firebase-admin")
admin.initializeApp()
const db = admin.firestore();

export const createUser = functions.auth.user().onCreate((user) => {
    db.collection("users").doc(user.uid).set({sentences: [], amountOfUsages: 0, ...JSON.parse(JSON.stringify(user))})
})