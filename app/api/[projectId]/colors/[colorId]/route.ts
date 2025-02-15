import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//get color
export async function GET (
  req: Request,
  { params }: {params: { colorId: string}}
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 })
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      }
    });
    
    return NextResponse.json(color);
  } catch(e) {
    // console.log('[color_get]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//update color
export async function PATCH (
  req: Request,
  {params}: {params: {projectId: string, colorId: string}}
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 })
    }

    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 })
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
 
    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value
      }
    });
    
    return NextResponse.json(color);
  } catch(e) {
    // console.log('[color_patch]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//delete color
export async function DELETE (
  req: Request,
  { params }: {params: { projectId: string, colorId: string}}
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.colorId) {
      return new NextResponse("Color ID is required", { status: 400 })
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
 
 
    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      }
    });
    return NextResponse.json(color);
  } catch(e) {
    // console.log('[color_delete]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}