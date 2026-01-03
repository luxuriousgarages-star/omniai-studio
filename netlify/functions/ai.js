export default async (req) => {
  try {
    const { prompt } = await req.json();

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.2",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await r.json();
    return new Response(JSON.stringify({
      reply: data.choices[0].message.content
    }), { status: 200 });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
