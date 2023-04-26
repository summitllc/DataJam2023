import prisma from "@/lib/prisma/index";

export async function getUsers() {
    try {
        return await prisma.user.findMany()
    } catch (error) {
        return {error}
    }
}