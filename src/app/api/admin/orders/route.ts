import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('key');

    // Verify admin key
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all orders with user information
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calculate statistics
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.amount, 0);
    const totalOrders = orders.length;
    const uniqueCustomers = new Set(orders.map((order) => order.userId)).size;

    return NextResponse.json({
      success: true,
      orders,
      stats: {
        totalRevenue: totalRevenue / 100, // Convert from paise to rupees
        totalOrders,
        uniqueCustomers,
      },
    });
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
