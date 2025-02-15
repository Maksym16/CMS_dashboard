import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//get category
export async function GET (
  req: Request,
  { params }: {params: { categoryId: string}}
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Billboard ID is required", { status: 400 })
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true
      }
    });
    
    return NextResponse.json(category);
  } catch(e) {
    // console.log('[category_deleted]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//update category
export async function PATCH (
  req: Request,
  {params}: {params: {projectId: string, categoryId: string}}
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name , billboardId} = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse("BillboardId is required", { status: 400 })
    }

    if (!params.categoryId) {
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
 
    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
       name,
       billboardId
      }
    });
    
    return NextResponse.json(category);
  } catch(e) {
    // console.log('[category_patch]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}

//delete category
export async function DELETE (
  req: Request,
  { params }: {params: { projectId: string, categoryId: string}}
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.categoryId) {
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
 
 
    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      }
    });
    return NextResponse.json(category);
  } catch(e) {
    // console.log('[category_delete]', e)
    return new NextResponse("Interal error", { status: 500 })
  }
}