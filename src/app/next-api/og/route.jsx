import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

const key = crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode('my_secret'),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign'],
);

function toHex(arrayBuffer) {
    return Array.prototype.map
        .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, '0'))
        .join('');
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    // console.log(id);
    const token = searchParams.get('token');

    const verifyToken = toHex(
        await crypto.subtle.sign(
            'HMAC',
            await key,
            new TextEncoder().encode(JSON.stringify({ id })),
        ),
    );

    if (token !== verifyToken) {
        return new Response('Invalid token.', { status: 401 });
    }

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    letterSpacing: -2,
                    textAlign: 'center',
                    background: "black",
                    padding: "4rem"
                }}
            >
                <div
                    style={{
                        fontWeight: '900',
                        fontSize: "4rem",
                        backgroundImage: 'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
                        backgroundClip: 'text',
                        '-webkit-background-clip': 'text',
                        color: 'transparent',
                    }}
                >
                    {id}
                </div>
            </div>



        ),
        {
            width: 1200,
            height: 630,
        },
    );
}