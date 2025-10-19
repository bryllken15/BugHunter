import { NextRequest, NextResponse } from 'next/server'
import { validateSolution } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userCode, solution, courseType } = body

    // Validate required fields
    if (!userCode || !solution || !courseType) {
      return NextResponse.json(
        { error: 'Missing required fields: userCode, solution, courseType' },
        { status: 400 }
      )
    }

    // Validate course type
    if (!['html', 'css', 'javascript'].includes(courseType)) {
      return NextResponse.json(
        { error: 'Invalid courseType. Must be html, css, or javascript' },
        { status: 400 }
      )
    }

    // Validate solution using AI
    const validation = await validateSolution(userCode, solution, courseType)

    return NextResponse.json(validation)

  } catch (error) {
    console.error('Error in validate-solution API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
