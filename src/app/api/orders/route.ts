import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const razorpayOrderId = searchParams.get('razorpay_order_id');

    if (razorpayOrderId) {
      const order = await prisma.order.findUnique({
        where: { razorpayOrderId },
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
    }

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email or order ID is required' },
        { status: 400 }
      );
    }

    // Find user and their orders
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        orders: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json({
        success: true,
        orders: [],
      });
    }

    return NextResponse.json({
      success: true,
      orders: user.orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
