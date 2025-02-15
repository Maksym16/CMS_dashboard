import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }
 
    const project = await prismadb.project.create({
      data: {
        name,
        userId
      }
    });
    
    return NextResponse.json(project);
  } catch (error) {
    // console.log('[projects_post]', error)
    return new NextResponse("Interal error", { status: 500 })
  }
}