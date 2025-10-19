import { GoogleGenerativeAI } from '@google/generative-ai'

const geminiApiKey = process.env.GEMINI_API_KEY || 'placeholder-key'
const genAI = geminiApiKey === 'placeholder-key' ? null : new GoogleGenerativeAI(geminiApiKey)

export interface ChallengeRequest {
  skill_level: 'beginner' | 'intermediate' | 'advanced'
  course_type: 'html' | 'css' | 'javascript'
  user_weaknesses?: string[]
  previous_challenges?: string[]
}

export interface GeneratedChallenge {
  title: string
  description: string
  code_template: string
  bugs: Array<{
    id: string
    line: number
    description: string
    type: 'syntax' | 'logic' | 'semantic'
    severity: 'low' | 'medium' | 'high'
  }>
  hints: string[]
  solution: string
  xp_reward: number
}

export async function generateChallenge(request: ChallengeRequest): Promise<GeneratedChallenge> {
  try {
    // Check if Gemini API is configured
    if (!genAI) {
      console.warn('Gemini API not configured, using fallback challenge')
      return getFallbackChallenge(request.course_type, request.skill_level)
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = `
Generate a coding challenge for a ${request.skill_level} level ${request.course_type} developer.

Requirements:
- Course type: ${request.course_type}
- Skill level: ${request.skill_level}
- Include 1-3 bugs in the code
- Make it realistic and educational
- Provide progressive hints (3 levels)
- Include a complete solution

${request.user_weaknesses ? `Focus on these areas: ${request.user_weaknesses.join(', ')}` : ''}

${request.previous_challenges ? `Avoid similar challenges to: ${request.previous_challenges.join(', ')}` : ''}

Return the response as a JSON object with this exact structure:
{
  "title": "Challenge title",
  "description": "Clear description of what needs to be fixed",
  "code_template": "Code with bugs that the user needs to fix",
  "bugs": [
    {
      "id": "bug1",
      "line": 1,
      "description": "Description of the bug",
      "type": "syntax|logic|semantic",
      "severity": "low|medium|high"
    }
  ],
  "hints": [
    "First hint - subtle",
    "Second hint - more specific", 
    "Third hint - very specific"
  ],
  "solution": "Complete working code",
  "xp_reward": 25
}

Make sure the JSON is valid and properly formatted.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response')
    }
    
    const challenge = JSON.parse(jsonMatch[0])
    
    // Validate the response structure
    if (!challenge.title || !challenge.description || !challenge.code_template || !challenge.solution) {
      throw new Error('Invalid challenge structure from AI')
    }
    
    return challenge
  } catch (error) {
    console.error('Error generating challenge:', error)
    
    // Return a fallback challenge if AI fails
    return getFallbackChallenge(request.course_type, request.skill_level)
  }
}

function getFallbackChallenge(courseType: string, skillLevel: string): GeneratedChallenge {
  const fallbackChallenges = {
    html: {
      beginner: {
        title: 'Missing Closing Tag',
        description: 'This HTML has a missing closing tag. Can you find and fix it?',
        code_template: `<html>
<head>
<title>My Page</title>
</head>
<body>
<h1>Welcome</h1>
<p>This is a paragraph
</body>
</html>`,
        bugs: [{
          id: 'bug1',
          line: 7,
          description: 'Missing closing </p> tag',
          type: 'syntax' as const,
          severity: 'high' as const
        }],
        hints: [
          'Look at the paragraph tag',
          'Check if all tags are properly closed',
          'The <p> tag is missing its closing </p>'
        ],
        solution: `<html>
<head>
<title>My Page</title>
</head>
<body>
<h1>Welcome</h1>
<p>This is a paragraph</p>
</body>
</html>`,
        xp_reward: 25
      }
    },
    css: {
      beginner: {
        title: 'Missing Semicolons',
        description: 'This CSS is missing semicolons. Can you fix it?',
        code_template: `.button {
  text-align: center
  margin: auto
  padding: 10px
}`,
        bugs: [
          {
            id: 'bug1',
            line: 2,
            description: 'Missing semicolon after text-align',
            type: 'syntax' as const,
            severity: 'medium' as const
          },
          {
            id: 'bug2',
            line: 3,
            description: 'Missing semicolon after margin',
            type: 'syntax' as const,
            severity: 'medium' as const
          },
          {
            id: 'bug3',
            line: 4,
            description: 'Missing semicolon after padding',
            type: 'syntax' as const,
            severity: 'medium' as const
          }
        ],
        hints: [
          'Check your CSS syntax',
          'Look for missing semicolons',
          'CSS properties need semicolons at the end'
        ],
        solution: `.button {
  text-align: center;
  margin: auto;
  padding: 10px;
}`,
        xp_reward: 25
      }
    },
    javascript: {
      beginner: {
        title: 'Missing Parentheses',
        description: 'This JavaScript function call is missing a closing parenthesis. Fix it!',
        code_template: `function clickButton() {
  alert("Hello World")
}
document.getElementById("btn").addEventListener("click", clickButton`,
        bugs: [{
          id: 'bug1',
          line: 4,
          description: 'Missing closing parenthesis',
          type: 'syntax' as const,
          severity: 'high' as const
        }],
        hints: [
          'Check your function call',
          'Look for missing parentheses',
          'The addEventListener call needs a closing )'
        ],
        solution: `function clickButton() {
  alert("Hello World")
}
document.getElementById("btn").addEventListener("click", clickButton)`,
        xp_reward: 25
      }
    }
  }
  
  const courseChallenges = fallbackChallenges[courseType as keyof typeof fallbackChallenges]
  if (!courseChallenges) {
    throw new Error(`No fallback challenges for course type: ${courseType}`)
  }
  
  const challenge = courseChallenges[skillLevel as keyof typeof courseChallenges]
  if (!challenge) {
    throw new Error(`No fallback challenges for skill level: ${skillLevel}`)
  }
  
  return challenge
}

export async function validateSolution(
  userCode: string, 
  solution: string, 
  courseType: string
): Promise<{ isValid: boolean; feedback: string }> {
  try {
    // Check if Gemini API is configured
    if (!genAI) {
      console.warn('Gemini API not configured, using fallback validation')
      // Fallback to simple string comparison
      const normalizedUser = userCode.replace(/\s+/g, '').toLowerCase()
      const normalizedSolution = solution.replace(/\s+/g, '').toLowerCase()
      
      return {
        isValid: normalizedUser === normalizedSolution,
        feedback: normalizedUser === normalizedSolution 
          ? 'Great job! Your solution is correct.' 
          : 'Your solution needs some adjustments. Keep trying!'
      }
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const prompt = `
Compare the user's code with the expected solution for a ${courseType} challenge.

User's code:
\`\`\`${courseType}
${userCode}
\`\`\`

Expected solution:
\`\`\`${courseType}
${solution}
\`\`\`

Determine if the user's code is functionally equivalent to the solution. Consider:
- Different but correct approaches
- Minor formatting differences
- Equivalent but different variable names
- Different but valid syntax

Return a JSON response:
{
  "isValid": true/false,
  "feedback": "Brief explanation of why it's correct or what needs to be fixed"
}
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return { isValid: false, feedback: 'Unable to validate solution' }
    }
    
    const validation = JSON.parse(jsonMatch[0])
    return validation
  } catch (error) {
    console.error('Error validating solution:', error)
    
    // Fallback to simple string comparison
    const normalizedUser = userCode.replace(/\s+/g, '').toLowerCase()
    const normalizedSolution = solution.replace(/\s+/g, '').toLowerCase()
    
    return {
      isValid: normalizedUser === normalizedSolution,
      feedback: normalizedUser === normalizedSolution 
        ? 'Great job! Your solution is correct.' 
        : 'Your solution needs some adjustments. Keep trying!'
    }
  }
}
