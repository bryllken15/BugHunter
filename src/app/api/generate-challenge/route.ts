import { NextRequest, NextResponse } from 'next/server'
import { generateChallenge } from '@/lib/ai'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured. Please set up environment variables.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { skill_level, course_type, user_weaknesses, previous_challenges } = body

    // Validate required fields
    if (!skill_level || !course_type) {
      return NextResponse.json(
        { error: 'Missing required fields: skill_level, course_type' },
        { status: 400 }
      )
    }

    // Validate skill level
    if (!['beginner', 'intermediate', 'advanced'].includes(skill_level)) {
      return NextResponse.json(
        { error: 'Invalid skill_level. Must be beginner, intermediate, or advanced' },
        { status: 400 }
      )
    }

    // Validate course type
    if (!['html', 'css', 'javascript'].includes(course_type)) {
      return NextResponse.json(
        { error: 'Invalid course_type. Must be html, css, or javascript' },
        { status: 400 }
      )
    }

    // Generate challenge using AI
    const challenge = await generateChallenge({
      skill_level,
      course_type,
      user_weaknesses,
      previous_challenges
    })

    // Save challenge to database
    const { data, error } = await supabase
      .from('challenges')
      .insert({
        course_type,
        difficulty: skill_level,
        title: challenge.title,
        description: challenge.description,
        code_template: challenge.code_template,
        bugs: challenge.bugs,
        hints: challenge.hints,
        solution: challenge.solution,
        xp_reward: challenge.xp_reward
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving challenge:', error)
      return NextResponse.json(
        { error: 'Failed to save challenge' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      challenge: data
    })

  } catch (error) {
    console.error('Error in generate-challenge API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured. Please set up environment variables.' },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const course_type = searchParams.get('course_type')
    const difficulty = searchParams.get('difficulty')
    const limit = parseInt(searchParams.get('limit') || '10')

    let query = supabase
      .from('challenges')
      .select('*')
      .limit(limit)

    if (course_type) {
      query = query.eq('course_type', course_type)
    }

    if (difficulty) {
      query = query.eq('difficulty', difficulty)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching challenges:', error)
      return NextResponse.json(
        { error: 'Failed to fetch challenges' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      challenges: data
    })

  } catch (error) {
    console.error('Error in generate-challenge GET API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
