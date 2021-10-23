import * as admin from "firebase-admin";
import doOCR from "./handlers/doOCR";

admin.initializeApp();

module.exports = {doOCR};
