const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendAdminMail = async (data) => {

    const response = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.ADMIN_EMAIL,
        subject: "New Contact Query",
        html: `
            <h2>New Contact Query</h2>

            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong> ${data.message}</p>
        `
    });

    console.log("Admin Mail Response:");
    console.log(response);
};

exports.sendUserMail = async (data) => {

    const response = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: data.email,
        subject: "Thank You for Contacting Us",
        html: `
            <h2>Hello ${data.name}</h2>

            <p>Thank you for contacting us.</p>

            <p>We have received your query.</p>
        `
    });

    console.log("User Mail Response:");
    console.log(response);
};