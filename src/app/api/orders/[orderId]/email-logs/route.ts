import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ orderId: string }> }
) {
  try {
    const params = await props.params;

    const emailLogs = await prisma.emailLog.findMany({
      where: { orderId: params.orderId },
      orderBy: { sentAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      emailLogs,
    });
  } catch (error) {
    console.error('Error fetching email logs:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch email logs',
      },
      { status: 500 }
    );
  }
}
