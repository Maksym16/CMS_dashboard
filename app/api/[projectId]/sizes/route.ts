import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//create size
export async function POST (
  req: Request,
  {params}: {params: {projectId: string}}
) {
  try {
    const { userId } = auth();
    const body = await req.json();
 
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 })
    }

    if (!params.projectId) {
      return new NextResponse("Project ID is required", { status: 400 })
    }

    const projectByUser = await prismadb.project.findFirst({
      where: {
        id: params.projectId,
        userId
      }
    })
    if (!projectByUser) {
      return new NextResponse("Unauthorized", { status: 403 })
    }
 
    const size = await prismadb.size.create({
      data: {
        name,
        value,
        projectId: params.projectId
      }
    });
    return NextResponse.json(size);
  } catch(e) {
    // console.log('[sizes_post]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//get size
export async function GET(
  req: Request,
  {params}: {params: {projectId: string}}
) {
  try {
    if (!params.projectId) {
      return new NextResponse("Project ID is required", { status: 403 })
    }
 
    const sizes = await prismadb.size.findMany({
      where: {
        projectId: params.projectId
      }
    });
    
    return NextResponse.json(sizes);
  } catch(e) {
    // console.log('[size_get]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}