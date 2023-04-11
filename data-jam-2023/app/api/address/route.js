import prisma from "@/lib/prisma";
import { getUsers } from "@/lib/prisma/users";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import axios from "axios"; 

export async function GET(request){
    const {searchParams}= new URL(request.url);
    try{
        const baseURL= "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress"
        const address = searchParams.get("address")
        const benchmark = searchParams.get("benchmark")
        const format = searchParams.get("format")
      const data = await axios.get(baseURL, {
        params:{
          address, benchmark, format
        }
      })
      const result = data.data.result;
        const error = data.error
        if(error) throw new Error(error)
        return NextResponse.json({result}, {status:200})
    }catch(error){
        console.log("errored", error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}