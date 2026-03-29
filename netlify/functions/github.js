exports.handler = async function(event) {
  const path = event.queryStringParameters.path || '';
  const qs   = event.queryStringParameters.qs   || '';

  // Caso especial: solo devuelve el nombre del repo, sin llamar a GitHub
  if (path === '__repo_name') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repo: process.env.GH_REPO })
    };
  }

  const res = await fetch(
    `https://api.github.com/repos/${process.env.GH_REPO}/${path}${qs}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.GH_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }
  );

  const data = await res.json();
  return {
    statusCode: res.status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
};