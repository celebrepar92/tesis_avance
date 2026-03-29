exports.handler = async function(event) {
  const path = event.queryStringParameters.path || '';
  const qs   = event.queryStringParameters.qs   || '';

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