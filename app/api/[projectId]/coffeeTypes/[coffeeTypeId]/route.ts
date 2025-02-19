import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//get coffeeType
export async function GET (
  req: Request,
  { params }: {params: { coffeeTypeId: string}}
) {
  try {
    if (!params.coffeeTypeId) {
      return new NextResponse("Coffee Type ID is required", { status: 400 })
    }

    const coffeeType = await prismadb.coffeeType.findUnique({
      where: {
        id: params.coffeeTypeId,
      }
    });
    
    return NextResponse.json(coffeeType);
  } catch(e) {
    return new NextResponse("Interal error", { status: 500 })
  }
}

//update Coffee Type
export async function PATCH (
  req: Request,
  {params}: {params: {projectId: string, coffeeTypeId: string}}
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

    if (!params.coffeeTypeId) {
      return new NextResponse("Coffee Type ID is required", { status: 400 })
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
 
    const coffeeType = await prismadb.coffeeType.updateMany({
      where: {
        id: params.coffeeTypeId,
      },
      data: {
        name,
        value
      }
    });
    
    return NextResponse.json(coffeeType);
  } catch(e) {
    return new NextResponse("Interal error", { status: 500 })
  }
}

//delete coffeeType
export async function DELETE (
  req: Request,
  { params }: {params: { projectId: string, coffeeTypeId: string}}
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.coffeeTypeId) {
      return new NextResponse("Coffee Type ID is required", { status: 400 })
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
 
 
    const coffeeType = await prismadb.coffeeType.deleteMany({
      where: {
        id: params.coffeeTypeId,
      }
    });
    return NextResponse.json(coffeeType);
  } catch(e) {
    return new NextResponse("Interal error", { status: 500 })
  }
}