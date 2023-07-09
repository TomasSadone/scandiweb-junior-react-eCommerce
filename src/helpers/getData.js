export const getData = async (query, variables) => {
  const resp = await fetch('https://scandiweb-endpoint-xmpq.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
  console.log(resp);
  const { data } = await resp.json();
  return data;
};
