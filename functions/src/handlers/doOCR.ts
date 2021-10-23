import * as functions from "firebase-functions";
import vision from "@google-cloud/vision";
import * as admin from "firebase-admin";
import * as path from "path";
const visionClient = new vision.ImageAnnotatorClient();

export default functions.storage.object().onFinalize(async (storageObject) => {
    const filePath = `gs://${storageObject.bucket}/${storageObject.name}`;
    console.log(`filePath: ${filePath}`);

    if (!storageObject.name?.startsWith("to-be-detected") ||
        !storageObject.contentType?.startsWith("image/")) {
        return false;
    }

    const [result] = await visionClient.textDetection(filePath);
    console.log("detected: ");

    const lines: any[] = [];
    result.textAnnotations?.forEach((text, index) => {
        console.log(`line ${index}`, JSON.stringify(text));
        lines.push(text);
    });

    const [fileName] = path.basename(storageObject.name).split(".");

    const ref = admin.database().ref(`doOCR/${fileName}`);
    return ref.set(lines);
});
