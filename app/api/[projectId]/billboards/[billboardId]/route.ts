import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//get billboard
export async function GET (
  req: Request,
  { params }: {params: { billboardId: string}}
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      }
    });
    
    return NextResponse.json(billboard);
  } catch(e) {
    // console.log('[projects_delete]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//update billboard
export async function PATCH (
  req: Request,
  {params}: {params: {projectId: string, billboardId: string}}
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 })
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
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
 
    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl
      }
    });
    
    return NextResponse.json(billboard);
  } catch(e) {
    // console.log('[billboard_patch]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//delete billboard
export async function DELETE (
  req: Request,
  { params }: {params: { projectId: string, billboardId: string}}
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
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
 
 
    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      }
    });
    return NextResponse.json(billboard);
  } catch(e) {
    console.log('[billboard_delete]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}