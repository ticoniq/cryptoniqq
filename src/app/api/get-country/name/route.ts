import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from 'next/cache';

const ip_token = process.env.IPINFO_TOKEN;

const getCountryData = unstable_cache(
  async () => {
    const response = await fetch(`https://ipinfo.io?token=${ip_token}`);
    if (!response.ok) throw new Error(`Error fetching country: ${response.statusText}`);
    const data = await response.json();
    return data;
  },
  ['country-data'],
  { revalidate: 3600 }
);

export async function GET(request: NextRequest) {
  try {
    const country = await getCountryData();

    if (!country) throw new Error('Country not found in response');

    return NextResponse.json({ country }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch country' }, { status: 500 });
  }
}