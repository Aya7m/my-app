// import { auth } from "@/app/lib/auth";
// import prisma from "@/app/lib/prisma";
// import {
//   cloudinaryUploadResult,
//   deleteFromCloudinary,
// } from "@/services/cloudinary";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET(
//   _req: Request,
//   { params }: { params: { blogId: string } },
// ) {
//   try {
//     const session = await auth.api.getSession({ headers: await headers() });
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { blogId } =await  params; // هنا الصح

//     if (!blogId) {
//       return NextResponse.json({
//         error: "valid blog id required",
//         status: 400,
//       });
//     }

//     const blog = await prisma.blog.findUnique({
//       where: { id: blogId },
//     });

//     if (!blog) {
//       return NextResponse.json({ error: "blog not found", status: 404 });
//     }

//     if (blog.authorId !== session.user.id) {
//       return NextResponse.json({ error: "not authorized", status: 403 });
//     }

//     return NextResponse.json(blog, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "error to fetch", status: 500 });
//   }
// }

// export async function PATCH(
//   req: Request,
//   { params }: { params: { blogId: string } },
// ) {
//   try {
//     const session = await auth.api.getSession({ headers: await headers() });
//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { blogId } = await params; // هنا الصح

//     if (!blogId) {
//       return NextResponse.json({
//         error: "valid blog id required",
//         status: 400,
//       });
//     }

//     const blog = await prisma.blog.findUnique({
//       where: { id: blogId },
//     });

//     if (!blog) {
//       return NextResponse.json({ error: "blog not found", status: 404 });
//     }

//     if (blog.authorId !== session.user.id) {
//       return NextResponse.json({ error: "not authorized", status: 403 });
//     }

//     const formData = await req.formData();
//     const title = formData.get("title") as string;
//     const content = formData.get("content") as string;
//     const coverImage = formData.get("coverImage") as File;
//     const excerpt = formData.get("excerpt") as string;
//     let slug = blog.slug;

//     if (title && title !== blog.title) {
//       // generate slug
//       let newSlug = title
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)+/g, "");
//       let counter = 1;
//       while (await prisma.blog.findUnique({ where: { slug: newSlug } })) {
//         newSlug = `${newSlug}-${counter}`;
//         counter++;
//       }
//       slug = newSlug;
//     }

//     let imgData: CloudinaryUploadResult | null = null;
//     if (coverImage) {
//       imgData = await uploadToCloudinary(coverImage);
//       if (imgData && blog.coverImagePublicId) {
//         // delete old image from cloudinary
//         await deleteFromCloudinary(blog.coverImagePublicId);
//       }
//     }

//     const updatedBlog = await prisma.blog.update({
//       where: { id: blogId },
//       data: {
//         title: title || blog.title,
//         content: content || blog.content,
//         excerpt: excerpt || blog.excerpt,
//         slug,
//         coverImageUrl: imgData ? imgData.secure_url : blog.coverImageUrl,
//         coverImagePublicId: imgData
//           ? imgData.public_id
//           : blog.coverImagePublicId,
//       },
//     });
//     return NextResponse.json(updatedBlog, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "error to fetch", status: 500 });
//   }
// }
// // delete blog
// export async function DELETE(
//   _req: Request,
//   { params }: { params: { blogId: string } },
// ) {
//   try {
//     const session = await auth.api.getSession({ headers: await headers() });

//     if (!session?.user?.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { blogId } =await params; // ✅ بدون await

//     if (!blogId) {
//       return NextResponse.json(
//         { error: "valid blog id required" },
//         { status: 400 },
//       );
//     }

//     const blog = await prisma.blog.findUnique({
//       where: { id: blogId },
//     });

//     if (!blog) {
//       return NextResponse.json(
//         { error: "blog not found" },
//         { status: 404 },
//       );
//     }

//     if (blog.authorId !== session.user.id) {
//       return NextResponse.json(
//         { error: "not authorized" },
//         { status: 403 },
//       );
//     }

//     if (blog.coverImagePublicId) {
//       await deleteFromCloudinary(blog.coverImagePublicId);
//     }

//     await prisma.blog.delete({
//       where: { id: blogId },
//     });

//     return NextResponse.json(
//       { message: "blog deleted successfully" },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "error to fetch" },
//       { status: 500 },
//     );
//   }
// }

import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import {
  cloudinaryUploadResult as CloudinaryUploadResult,
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/services/cloudinary";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/* ======================= GET ======================= */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { blogId } = await params;

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return NextResponse.json({ error: "blog not found" }, { status: 404 });
    }

    if (blog.authorId !== session.user.id) {
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error to fetch" }, { status: 500 });
  }
}

/* ======================= PATCH ======================= */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { blogId } = await params;

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return NextResponse.json({ error: "blog not found" }, { status: 404 });
    }

    if (blog.authorId !== session.user.id) {
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string | null;
    const content = formData.get("content") as string | null;
    const excerpt = formData.get("excerpt") as string | null;
    const coverImage = formData.get("coverImage") as File | null;

    let slug = blog.slug;

    if (title && title !== blog.title) {
      let newSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      let counter = 1;
      while (await prisma.blog.findUnique({ where: { slug: newSlug } })) {
        newSlug = `${newSlug}-${counter++}`;
      }
      slug = newSlug;
    }

    let imgData: CloudinaryUploadResult | null = null;
    if (coverImage) {
      imgData = await uploadToCloudinary(coverImage);
      if (blog.coverImagePublicId) {
        await deleteFromCloudinary(blog.coverImagePublicId);
      }
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title: title ?? blog.title,
        content: content ?? blog.content,
        excerpt: excerpt ?? blog.excerpt,
        slug,
        coverImageUrl: imgData?.secure_url ?? blog.coverImageUrl,
        coverImagePublicId: imgData?.public_id ?? blog.coverImagePublicId,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error to fetch" }, { status: 500 });
  }
}

/* ======================= DELETE ======================= */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> },
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { blogId } = await params;

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      return NextResponse.json({ error: "blog not found" }, { status: 404 });
    }

    if (blog.authorId !== session.user.id) {
      return NextResponse.json({ error: "not authorized" }, { status: 403 });
    }

    if (blog.coverImagePublicId) {
      await deleteFromCloudinary(blog.coverImagePublicId);
    }

    await prisma.blog.delete({
      where: { id: blogId },
    });

    return NextResponse.json({ message: "blog deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error to fetch" }, { status: 500 });
  }
}
