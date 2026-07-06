const { sendAdminMail, sendUserMail } = require("../services/resendService");
const { saveToSheet } = require("../services/sheetService");

exports.contact = async (req, res) => {

  try {

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {

      return res.status(400).json({

        success: false,

        message: "All fields are required"

      });

    }

    const data = {

      name,

      email,

      subject,

      message

    };

    await sendAdminMail(data);

    await sendUserMail(data);

    await saveToSheet(data);

    res.status(200).json({

      success: true,

      message: "Query submitted successfully"

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message

    });

  }

};