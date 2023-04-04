import prisma from "@/lib/prisma";
import { getUsers } from "@/lib/prisma/users";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request){
    try{

        const users= await getUsers()
        const error = users.error
        if(error) throw new Error(error)
        return NextResponse.json({users}, {status:200})
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}