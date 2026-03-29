exports.handler = async function(event) {
  const path = event.queryStringParameters.path || '';
  const qs   = event.queryStringParameters.qs   || '';

  const REPO  = 'celebrepar92/tesis';
  const token = process.env.GH_TOKEN || '';

  if (path === '__repo_name') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repo: REPO })
    };
  }

  const url = path
    ? `https://api.github.com/repos/${REPO}/${path}${qs}`
    : `https://api.github.com/repos/${REPO}${qs}`;

  console.log('URL:', url);
  console.log('Token primeros 8:', token.slice(0, 8));

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  const data = await res.json();
  console.log('GitHub status:', res.status);

  return {
    statusCode: res.status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
};