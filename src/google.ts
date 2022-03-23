import { JWT } from "google-auth-library";
import { google } from "googleapis";

/*
authenticate with google using JWT of the service account
https://github.com/googleapis/google-auth-library-nodejs/blob/main/samples/jwt.js
 */
export const authenticate = async (): Promise<JWT> => {
  const client = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return client;
};

export const writeToSheet = async (auth: JWT, { status, data }: any) => {
  console.log("writing to sheet...");

  try {
    const sheets = google.sheets({ version: "v4", auth });

    const editPromises = data.map((coin: any) => {
      /*
      explanation of append parameters
      https://developers.google.com/sheets/api/guides/concepts
      */
      return sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        valueInputOption: "RAW",
        range: `'${coin.slug}'!A2:I2`,
        requestBody: {
          values: [[status.timestamp].concat(Object.values(coin))],
        },
      });
    });

    await Promise.all(editPromises);

    console.log("DONE writing to sheets");
  } catch (error) {
    console.error(error);
  }
};
