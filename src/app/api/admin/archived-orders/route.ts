import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.archivedOrder.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit to last 100 orders
    });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Error fetching archived orders:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch archived orders',
      },
      { status: 500 }
    );
  }
}
