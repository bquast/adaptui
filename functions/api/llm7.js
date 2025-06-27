export async function onRequestPost(context) {
  const reqBody = await context.request.text();
  const upstream = await fetch('https://llm7.io/v1/chat/completions', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: reqBody,
  });
  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      // you can add more headers here if needed
    },
  });
}