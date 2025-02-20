import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

//create product
export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      coffeeTypeId,
      sizeId,
      regionId,
      roastTypeId,
      images,
      description,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse('CategoryId is required', { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse('SizeId is required', { status: 400 });
    }
    if (!coffeeTypeId) {
      return new NextResponse('CoffeeTypeId is required', { status: 400 });
    }
    if (!roastTypeId) {
      return new NextResponse('Roast Type is required', { status: 400 });
    }
    if (!regionId) {
      return new NextResponse('Region is required', { status: 400 });
    }

    if (!params.projectId) {
      return new NextResponse('Project ID is required', { status: 400 });
    }

    const projectByUser = await prismadb.project.findFirst({
      where: {
        id: params.projectId,
        userId,
      },
    });
    if (!projectByUser) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        coffeeTypeId,
        sizeId,
        roastTypeId,
        description,
        regionId,
        images: {
          createMany: {
            data: [
              ...images.map((image: {url: string}) => image)
            ]
          }
        },
        isFeatured,
        isArchived,
        projectId: params.projectId,
      },
    });
    return NextResponse.json(product);
  } catch (e) {
    // console.log('[bproducts_post]', e);
    return new NextResponse('Interal error', { status: 500 });
  }
}

//get products
export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const coffeeTypeId = searchParams.get("coffeeTypeId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const regionId = searchParams.get("regionId") || undefined;
    const roastTypeId = searchParams.get("roastTypeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.projectId) {
      return new NextResponse('Project ID is required', { status: 403 });
    }

    const products = await prismadb.product.findMany({
      where: {
        projectId: params.projectId,
        categoryId,
        coffeeTypeId,
        sizeId,
        regionId,
        roastTypeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false
      },
      include: {
        images: true,
        category: true,
        coffeeType: true,
        roastType: true,
        size: true,
        region: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(products);
  } catch (e) {
    // console.log('[product_get]', e);
    return new NextResponse('Interal error', { status: 500 });
  }
}
