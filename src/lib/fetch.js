
/*
A simple wrapper over the fetch api,
by default we are preventing the cache behavior of next js, can easily add a option to
enable it if needed.
*/
export async function makeRequestServer(endpoint = "/", options = { method: 'GET', data: {} }) {

    const fetchOptions = {
        // cache: "no-cache",
        revalidate: 0,
        method: options.method.toUpperCase(),
        body: JSON.stringify(options.data),
        credentials: "include",
        headers: {
            'Accept': 'application/json; charset=UTF-8"',
            'Content-Type': 'application/json',
            'Authorization': process.env.AUTH_TOKEN
        }
    }

    if (fetchOptions.method === 'GET' || fetchOptions.method === 'HEAD') {
        delete fetchOptions.body;
        delete fetchOptions.headers['Content-Type'];
    }

    const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + endpoint,
        fetchOptions
    )

    if (res.status >= 400) {
        // This will activate the closest `error.js` Error Boundary
        let finalError = "Error";
        try {
            const json = await res.json();
            finalError = json;
        } catch (err) {
            finalError = "Something went wrong"
        }
        finally {
            throw finalError;
        }
    }

    return res.json();
}

export async function makeRequestClient(endpoint = "/", options = { method: 'GET', data: {}, headers: {} }) {

    const fetchOptions = {
        // cache: "no-cache",
        revalidate: 0,
        method: options.method.toUpperCase(),
        body: JSON.stringify(options.data),
        credentials: "include",
        headers: {
            'Accept': 'application/json; charset=UTF-8"',
            'Content-Type': 'application/json',
            ...options.headers
        }
    }
    if (fetchOptions.method === 'GET' || fetchOptions.method === 'HEAD') {
        delete fetchOptions.body;
        delete fetchOptions.headers['Content-Type'];
    }

    const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + endpoint,
        fetchOptions
    )

    if (res.status >= 400) {
        // This will activate the closest `error.js` Error Boundary
        let finalError = "Error";
        try {
            const json = await res.json();
            finalError = json;
        } catch (err) {
            finalError = "Something went wrong"
        }
        finally {
            throw finalError;
        }
    }

    return res.json();
}