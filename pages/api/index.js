import { NextRequest, NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to force-static
export const runtime = 'edge'
export default async function GET(request) {
  const { searchParams } = new URL(request.url);
  const toggles = searchParams.get('toggles')
  console.log(toggles)
  try {
    const url = process.env.EVANTO_API_URL + "?code=" + toggles;
    const headers = { 'Content-Type': 'application/json' };
    headers[
      'Authorization'
    ] = `Bearer ${process.env.EVANTO_PERSONAL_TOKEN}`;

    const res = await fetch(url, {
      headers,
      method: 'GET'
    });
    const data = await res.json()
    //return { props: { data } }
    return NextResponse.json({
      data
    })
  }
  catch (error) {
    const data = {
      'error': error
    }
    NextResponse.json({
      data
    }) 
  }
  
}
