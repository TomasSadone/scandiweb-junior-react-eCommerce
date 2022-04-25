//this function takes a string
export const getData = async (query) =>{

    const resp = await fetch(
        'http://localhost:4000/',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: query
            })
        }
    );
    const {data} = await resp.json();
    return data
}
