import {NextResponse} from "next/server";
import axios from "axios";

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    try {
        const baseURL = "https://xzobjj8thb.execute-api.us-east-1.amazonaws.com/test/fetch-data"
        const address = searchParams.get("address")
        const latitude = searchParams.get("latitude")
        const longitude = searchParams.get("longitude")
        const range = searchParams.get("range")
        const codes = searchParams.get("codes")

        const data = await axios.get(baseURL, {
            params: {
                address, latitude, longitude, range, codes
            }
        })
        console.log("data", data)
        const result = data.data;
        const error = data.error
        if (error) throw new Error(error)
        return NextResponse.json({result}, {status: 200})
    } catch (error) {
        console.log("errored", error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}