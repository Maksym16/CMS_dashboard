import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//get region
export async function GET (
  req: Request,
  { params }: {params: { regionId: string}}
) {
  try {
    if (!params.regionId) {
      return new NextResponse("region ID is required", { status: 400 })
    }

    const region = await prismadb.region.findUnique({
      where: {
        id: params.regionId,
      }
    });
    
    return NextResponse.json(region);
  } catch(e) {
    // console.log('[region_get]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//update region
export async function PATCH (
  req: Request,
  {params}: {params: {projectId: string, regionId: string}}
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

    if (!params.regionId) {
      return new NextResponse("region ID is required", { status: 400 })
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
 
    const region = await prismadb.region.updateMany({
      where: {
        id: params.regionId,
      },
      data: {
        name,
        value
      }
    });
    
    return NextResponse.json(region);
  } catch(e) {
    // console.log('[region_patch]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//delete region
export async function DELETE (
  req: Request,
  { params }: {params: { projectId: string, regionId: string}}
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.regionId) {
      return new NextResponse("region ID is required", { status: 400 })
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
 
 
    const region = await prismadb.region.deleteMany({
      where: {
        id: params.regionId,
      }
    });
    return NextResponse.json(region);
  } catch(e) {
    // console.log('[region_delete]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}