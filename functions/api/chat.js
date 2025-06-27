export async function onRequestPost(context) {
  const apiKey = context.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "No OPENAI_API_KEY set" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
  const reqBody = await context.request.text();

  // Forward everything to OpenAI's API
  const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${apiKey}`,
    },
    body: reqBody,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    },
  });
}