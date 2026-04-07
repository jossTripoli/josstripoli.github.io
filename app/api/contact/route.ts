import { NextResponse } from "next/server"

const RECIPIENT_EMAIL = "joss@josstripoli.com"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const { name, email, message, captchaToken } = await request.json()

    if (!name || !email || !message || !captchaToken) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 })
    }

    const captchaSecret = process.env.RECAPTCHA_SECRET_KEY
    if (!captchaSecret) {
      return NextResponse.json({ error: "Captcha is not configured on the server." }, { status: 500 })
    }

    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: captchaSecret,
        response: captchaToken,
      }),
    })

    const verifyResult = await verifyResponse.json()
    if (!verifyResult.success) {
      return NextResponse.json({ error: "Captcha verification failed. Please try again." }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const senderEmail = process.env.CONTACT_SENDER_EMAIL

    if (!resendApiKey || !senderEmail) {
      return NextResponse.json({ error: "Email service is not configured on the server." }, { status: 500 })
    }

    const sendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [RECIPIENT_EMAIL],
        reply_to: email,
        subject: `New portfolio contact from ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        `,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    })

    if (!sendResponse.ok) {
      return NextResponse.json({ error: "Unable to send message at this time." }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Something went wrong sending the message." }, { status: 500 })
  }
}