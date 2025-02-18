import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//get roastType
export async function GET (
  req: Request,
  { params }: {params: { roastTypeId: string}}
) {
  try {
    if (!params.roastTypeId) {
      return new NextResponse("Roast Type ID is required", { status: 400 })
    }

    const roastType = await prismadb.roastType.findUnique({
      where: {
        id: params.roastTypeId,
      }
    });
    
    return NextResponse.json(roastType);
  } catch(e) {
    // console.log('[roastType_get]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//update roastType
export async function PATCH (
  req: Request,
  {params}: {params: {projectId: string, roastTypeId: string}}
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

    if (!params.roastTypeId) {
      return new NextResponse("Roast Type ID is required", { status: 400 })
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
 
    const roastType = await prismadb.roastType.updateMany({
      where: {
        id: params.roastTypeId,
      },
      data: {
        name,
        value
      }
    });
    
    return NextResponse.json(roastType);
  } catch(e) {
    // console.log('[roastType_patch]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//delete roastType
export async function DELETE (
  req: Request,
  { params }: {params: { projectId: string, roastTypeId: string}}
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.roastTypeId) {
      return new NextResponse("Roast Type ID is required", { status: 400 })
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
 
 
    const roastType = await prismadb.roastType.deleteMany({
      where: {
        id: params.roastTypeId,
      }
    });
    return NextResponse.json(roastType);
  } catch(e) {
    // console.log('[roastType_delete]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}