export default function Key({ data }) {
    //return JSON.stringify(data)
    return Response.json([])
}
export async function getServerSideProps({ params }) {
    try {
        const url = process.env.EVANTO_API_URL + "?code=" + params.key;
        const headers = { 'Content-Type': 'application/json' };
        headers[
            'Authorization'
        ] = `Bearer ${process.env.EVANTO_PERSONAL_TOKEN}`;

        const res = await fetch(url, {
            headers,
            method: 'GET'
        });
        const data = await res.json()
        return { props: { data } }
    }
    catch (error) {
        const data = {
            'error' : error
        }
        return { props: { data } }
    }
    
}