import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const token = process.env.CHAT_BOT_TOKEN
    const chatId = process.env.CHAT_ID
    if (!token || !chatId) {
      return NextResponse.json({ error: "No environment variables specified" }, { status: 500 })
    }

    // 2. Отправка сообщения в Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    })

    if (!telegramResponse.ok) {
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: `Failed to send message, ${err}` }, { status: 500 })
  }
}
