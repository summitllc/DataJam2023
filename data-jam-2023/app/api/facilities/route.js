import {NextResponse} from "next/server";
import axios from "axios";

export async function GET(request) {
    const {searchParams} = new URL(request.url);
    try {
        const baseURL = "https://xzobjj8thb.execute-api.us-east-1.amazonaws.com/test/fetch-data"
        const address = searchParams.get("address")
        const lat = searchParams.get("lat")
        const long = searchParams.get("long")
        const range = searchParams.get("range")
        const codes = searchParams.get("codes")

        console.log("get")

        const data = await axios.get(baseURL, {
            params: {
                address, lat, long, range, codes
            }
        })
        const result = data.data.result;
        const error = data.error
        if (error) throw new Error(error)
        return NextResponse.json({result}, {status: 200})
    } catch (error) {
        console.log("errored", error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}