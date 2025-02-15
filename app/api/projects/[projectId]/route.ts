import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//update project
export async function PATCH (
  req: Request,
  {params}: {params: {projectId: string}}
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

    if (!params.projectId) {
      return new NextResponse("Project ID is required", { status: 400 })
    }
 
    const project = await prismadb.project.updateMany({
      where: {
        id: params.projectId,
        userId
      },
      data: {
        name
      }
    });
    
    return NextResponse.json(project);
  } catch(e) {
    // console.log('[projects_patch]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//delete project
export async function DELETE (
  req: Request,
  { params }: {params: {projectId: string}}
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.projectId) {
      return new NextResponse("Project ID is required", { status: 400 })
    }
 
    const project = await prismadb.project.deleteMany({
      where: {
        id: params.projectId,
        userId
      }
    });
    
    return NextResponse.json(project);
  } catch(e) {
    // console.log('[projects_delete]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}