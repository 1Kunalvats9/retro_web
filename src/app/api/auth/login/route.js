import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { userName, password } = await request.json();

    // Basic validation
    if (!userName || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Find the user in the database
    const user = await prisma.user.findFirst({
      where: {
        userName: userName,
      },
    });

    // Check if user exists and password matches
    // Note: In a real application, passwords should be hashed
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Return success response
    // In a real application, you would generate and return a JWT token here
    return NextResponse.json(
      { 
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          userName: user.userName
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}