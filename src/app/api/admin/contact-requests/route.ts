import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would check for admin authentication here
    // For now, we'll assume the admin dashboard handles the auth check locally
    
    const requests = await prisma.contactRequest.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      requests
    });
  } catch (error) {
    console.error('API Admin Contact Requests Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact requests' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'ID and status are required' },
        { status: 400 }
      );
    }

    const updated = await prisma.contactRequest.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({
      success: true,
      request: updated
    });
  } catch (error) {
    console.error('API Admin Update Contact Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update contact request' },
      { status: 500 }
    );
  }
}
