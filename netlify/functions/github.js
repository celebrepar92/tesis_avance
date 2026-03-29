exports.handler = async function(event) {
  const path = event.queryStringParameters.path || '';
  const qs   = event.queryStringParameters.qs   || '';

  if (path === '__repo_name') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repo: process.env.GH_REPO })
    };
  }

  const token = process.env.GH_TOKEN || '';
  const repo  = process.env.GH_REPO  || '';
  console.log('GH_REPO:', repo);
  console.log('GH_TOKEN presente:', token.length > 0);
  console.log('GH_TOKEN primeros 8 chars:', token.slice(0, 8));

  const url = path
    ? `https://api.github.com/repos/${repo}/${path}${qs}`
    : `https://api.github.com/repos/${repo}${qs}`;

  console.log('URL:', url);

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