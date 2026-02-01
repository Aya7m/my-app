import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { uploadToCloudinary } from "@/services/cloudinary";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const coverImage = formData.get("coverImage") as File;
    const excerpt = formData.get("excerpt") as string;

    if (!title || !content || !excerpt || !coverImage) {
      return NextResponse.json(
        { message: "All Fields Are Required" },
        { status: 400 },
      );
    }

    // generate slug
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    let counter = 1;

    while (await prisma.blog.findUnique({ where: { slug } })) {
      slug = `${slug}-${counter}`;
      counter++;
    }

    //   upload cover image to cloudinary
    const imageData = await uploadToCloudinary(coverImage);

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        excerpt,
        slug,
        coverImageUrl: imageData.secure_url,
        coverImagePublicId: imageData.public_id,
        authorId: session.user.id,
      },
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const Diffult_Limit = 3;
    const cursor = searchParams.get("cursor");
    const limit = Number(searchParams.get("limit")) || Diffult_Limit;
    const blogs = await prisma.blog.findMany({
      take: limit + 1,
      orderBy: {
        createdAt: "desc",
      },

      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt:true,
        createdAt: true,
        coverImageUrl: true,
      },
    });

    // Determine if there is a next page
    const hasMore = blogs.length > limit;
    const items = hasMore ? blogs.slice(0, limit) : blogs;
    const NextCursor = hasMore ? items[items.length - 1].id : null;
    return NextResponse.json({ blogs:items, nextCursor: NextCursor });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
