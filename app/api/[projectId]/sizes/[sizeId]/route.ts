import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//get size
export async function GET (
  req: Request,
  { params }: {params: { sizeId: string}}
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 })
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      }
    });
    
    return NextResponse.json(size);
  } catch(e) {
    // console.log('[size_get]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//update size
export async function PATCH (
  req: Request,
  {params}: {params: {projectId: string, sizeId: string}}
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

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 })
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
 
    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value
      }
    });
    
    return NextResponse.json(size);
  } catch(e) {
    // console.log('[size_patch]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//delete size
export async function DELETE (
  req: Request,
  { params }: {params: { projectId: string, sizeId: string}}
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.sizeId) {
      return new NextResponse("Size ID is required", { status: 400 })
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
 
 
    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      }
    });
    return NextResponse.json(size);
  } catch(e) {
    // console.log('[size_delete]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}