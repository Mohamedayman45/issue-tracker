import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { PrismaClient } from '@/app/generated/prisma';
const prisma = new PrismaClient();

const issueSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(3).max(1024).optional(),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).default("OPEN"),
});

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
