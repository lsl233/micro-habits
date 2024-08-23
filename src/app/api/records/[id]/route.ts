import { db } from "@/lib/db"
import { serverResponseError } from "@/lib/server-response"
import { revalidatePath } from "next/cache"

export const DELETE = async (req: Request, {params}: {params: { id: string }}) => {
    try {
        const { id } = params
        await db.record.delete({
            where: {
                id
            }
        })
        
        revalidatePath('/')
        revalidatePath('/log')
        return Response.json({message: "Record deleted"})
    } catch (error) {
        return serverResponseError(error, req); 
    }
}