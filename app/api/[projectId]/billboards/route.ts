import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//create billboard
export async function POST (
  req: Request,
  {params}: {params: {projectId: string}}
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 })
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
 
    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        projectId: params.projectId
      }
    });
    return NextResponse.json(billboard);
  } catch(e) {
    // console.log('[billboard_post]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//get billboards
export async function GET(
  req: Request,
  {params}: {params: {projectId: string}}
) {
  try {
    if (!params.projectId) {
      return new NextResponse("Project ID is required", { status: 403 })
    }
 
    const billboards = await prismadb.billboard.findMany({
      where: {
        projectId: params.projectId
      }
    });
    
    return NextResponse.json(billboards);
  } catch(e) {
    // console.log('[billboard_get]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}