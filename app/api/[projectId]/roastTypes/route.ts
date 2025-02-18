import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//create roast type
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
 
    const roastType = await prismadb.roastType.create({
      data: {
        name,
        value,
        projectId: params.projectId
      }
    });
    return NextResponse.json(roastType);
  } catch(e) {
    // console.log('[roastTypes_post]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//get roast type
export async function GET(
  req: Request,
  {params}: {params: {projectId: string}}
) {
  try {
    if (!params.projectId) {
      return new NextResponse("Project ID is required", { status: 403 })
    }
 
    const roastTypes = await prismadb.roastType.findMany({
      where: {
        projectId: params.projectId
      }
    });
    return NextResponse.json(roastTypes);
  } catch(e) {
    // console.log('[roastType_get]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}