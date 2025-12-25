import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ orderId: string }> }
) {
  try {
    const params = await props.params;

    const order = await prisma.archivedOrder.findUnique({
      where: { id: params.orderId },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error fetching archived order:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch order',
      },
      { status: 500 }
    );
  }
}
