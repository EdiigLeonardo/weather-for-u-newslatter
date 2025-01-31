import { NextResponse } from 'next/server';
import prisma from '@/wfu/app/lib/prisma';
interface RequestBody {
  email: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { email }: RequestBody = await req.json();

    // Save email in the database
    await prisma.user.create({
      data: { email },
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error', error: error.message }, { status: 500 });
  }
}
