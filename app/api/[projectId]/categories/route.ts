import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//create category
export async function POST (
  req: Request,
  {params}: {params: {projectId: string}}
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
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
    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        projectId: params.projectId
      }
    });
    return NextResponse.json(category);
  } catch(e) {
    console.log('[billboard_post]', e)
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
 
    const categories = await prismadb.category.findMany({
      where: {
        projectId: params.projectId
      }
    });
    
    return NextResponse.json(categories);
  } catch(e) {
    console.log('[billboard_get]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}