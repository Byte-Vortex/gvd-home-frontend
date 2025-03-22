export async function getMetaData(slug="global") {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/metadata/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            slug,
        })
    });
    const res = await response.json();

    // console.log(res);

    return res.data;
}