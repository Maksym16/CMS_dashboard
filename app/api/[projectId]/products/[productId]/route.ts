import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

//get product
export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse('Product ID is required', { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        coffeeType: true,
        roastType: true,
        region: true,
        size: true,
      },
    });
    return NextResponse.json(product);
  } catch (e) {
    // console.log('[projects_get]', e);
    return new NextResponse('Interal error', { status: 500 });
  }
}

//update product
export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      coffeeTypeId,
      roastTypeId,
      regionId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
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
      return new NextResponse('Roast Type is required', { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse('product ID is required', { status: 400 });
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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        coffeeTypeId,
        roastTypeId,
        regionId,
        sizeId,
        images: {
          deleteMany: {}
        },
        isFeatured,
        isArchived,
      },
    });
    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: {url: string}) => image)
            ]
          }
        },
      },
    });
    return NextResponse.json(product);
  } catch (e) {
    // console.log('[product_patch]', e);
    return new NextResponse('Interal error', { status: 500 });
  }
}

//delete product
export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse('Product ID is required', { status: 400 });
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product);
  } catch (e) {
    // console.log('[product_delete]', e);
    return new NextResponse('Interal error', { status: 500 });
  }
}
