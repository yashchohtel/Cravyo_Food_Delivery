import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

// Firebase Admin Initialize
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// export admin
export default admin;