import { JWT } from "google-auth-library";
import { google } from "googleapis";
import { CoinInfoType, ReportType } from "coin-types";

/*
authenticate with google using JWT of the service account
https://github.com/googleapis/google-auth-library-nodejs/blob/main/samples/jwt.js
 */
export const authenticate = async (): Promise<JWT> => {
  const google_email = process.env.GOOGLE_CLIENT_EMAIL || "";
  const google_key = process.env.GOOGLE_PRIVATE_KEY || "";

  const client = new JWT({
    email: google_email,
    key: google_key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return client;
};

export const writeToSheet = async (auth: JWT, { status, data }: ReportType) => {
  console.log("writing to sheet...");

  try {
    const sheets = google.sheets({ version: "v4", auth });

    const editPromises = data.map((coin: CoinInfoType) => {
      /*
      explanation of append parameters
      https://developers.google.com/sheets/api/guides/concepts
      */

      const coinFields: any[] = Object.values(coin);

      return sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        valueInputOption: "RAW",
        range: `'${coin.slug}'!A2:I2`,
        requestBody: {
          values: [[status.timestamp].concat(coinFields)],
        },
      });
    });

    await Promise.all(editPromises);

    console.log("DONE writing to sheets");
  } catch (error) {
    console.error(error);
  }
};
