import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Save the contact request to the database
    const contactRequest = await prisma.contactRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'pending'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Contact request submitted successfully',
      id: contactRequest.id
    });
  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit contact request' },
      { status: 500 }
    );
  }
}
