const sheets = require("../config/google");

exports.saveToSheet = async (data) => {
  try {

    await sheets.spreadsheets.values.append({

      spreadsheetId: process.env.SPREADSHEET_ID,

      range: "Sheet1!A:E",

      valueInputOption: "USER_ENTERED",

      requestBody: {

        values: [[

          new Date().toLocaleString(),

          data.name,

          data.email,

          data.subject,

          data.message

        ]]

      }

    });

    console.log("Data saved to Google Sheets");

  } catch (err) {

    console.log("Google Sheets Error:", err.message);

    throw err;

  }
};