import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { issueSchema } from "../../issueSchema";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.issues },
      { status: 400 }
    );
  }

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  return NextResponse.json(issue, { status: 201 });
}

export async function GET() {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const issue = await prisma.issue.delete({
    where: {
      id: Number(id),
    },
  });
  return NextResponse.json(issue);
}
