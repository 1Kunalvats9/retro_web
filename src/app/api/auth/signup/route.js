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

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        userName: userName,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Create new user
    // Note: In a real application, passwords should be hashed before storing
    const newUser = await prisma.user.create({
      data: {
        userName,
        password,
      },
    });

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Account created successfully',
        user: {
          id: newUser.id,
          userName: newUser.userName
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}