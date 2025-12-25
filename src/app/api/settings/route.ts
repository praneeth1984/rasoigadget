import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    const settingsMap = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      settings: settingsMap,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json();

    if (!key) {
      return NextResponse.json(
        { success: false, message: 'Key is required' },
        { status: 400 }
      );
    }

    let finalValue = value;

    // Special handling forProductImages to download it locally
    if (key === 'productImage' && value && value.startsWith('http')) {
      try {
        const response = await fetch(value);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
        
        const buffer = Buffer.from(await response.arrayBuffer());
        
        // Determine extension
        const urlPath = new URL(value).pathname;
        let ext = path.extname(urlPath) || '.jpg';
        if (ext.includes('?')) ext = ext.split('?')[0];
        
        const fileName = `hero-product${ext}`;
        const uploadDir = path.join(process.cwd(), 'public/images/config');
        
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        
        // Update the value to the relative local path
        finalValue = `/images/config/${fileName}`;
        console.log(`Image downloaded and saved to: ${finalValue}`);
      } catch (downloadError) {
        console.error('Error downloading image:', downloadError);
        // Fallback to the original URL if download fails, or return error?
        // Let's return an error to be safe and explicit
        return NextResponse.json(
          { success: false, message: 'Failed to download image locally' },
          { status: 500 }
        );
      }
    }

    const setting = await prisma.setting.upsert({
      where: { key },
      update: { value: finalValue },
      create: { key, value: finalValue },
    });

    return NextResponse.json({
      success: true,
      setting,
    });
  } catch (error) {
    console.error('Error updating setting:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update setting' },
      { status: 500 }
    );
  }
}
