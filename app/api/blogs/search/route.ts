import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q")?.trim();
    const limit = Number(searchParams.get("limit")) || 4;

    if (!query) {
      return NextResponse.json({ blogs: [] });
    }
    const blogs = await prisma.blog.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },

          {
            excerpt: {
              contains: query,
              mode: "insensitive",
            },
          },

          {
            content: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },

      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
      },
    });

    return NextResponse.json({ blogs });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "fail to search" });
  }
}
