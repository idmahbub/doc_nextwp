import { NextRequest, NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to force-static
export const runtime = 'edge'
export default async function GET(request) {
  const { searchParams } = new URL(request.url);
  const toggles = searchParams.get('toggles')
  if (toggles===process.env.DEV_ACCESS){
    return NextResponse.json(
      {"data":{"amount":"19.84","sold_at":"2016-09-07T10:54:28+10:00","license":"Regular License","support_amount":"0.00","supported_until":"2017-03-09T01:54:28+11:00","item":{"id":17022701,"name":"SEO Studio - Professional Tools for SEO","description":"<strong>Full</strong> HTML description here...","author_username":"baileyherbert","updated_at":"2017-11-02T15:57:41+11:00","site":"codecanyon.net","price_cents":2000,"published_at":"2016-07-13T19:07:03+10:00"},"buyer":"buyer_username_or_null","purchase_count":1}}
    )
  }
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
