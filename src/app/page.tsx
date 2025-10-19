import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { 
  Code, 
  Target, 
  Trophy, 
  BarChart3, 
  Zap, 
  Users, 
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="primary" size="lg" className="w-fit">
                  🦸 New: AI-Powered Challenges
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Learn to Code by{' '}
                  <span className="text-primary-600">Hunting Bugs</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Master HTML, CSS, and JavaScript through interactive bug-hunting challenges. 
                  Like Duolingo, but for coding! 🐛
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-4" asChild>
                  <Link href="/register">
                    Start Learning Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                  <Link href="/challenges">
                    Try Demo
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600" />
                  <span>Free Forever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-600" />
                  <span>Mobile Friendly</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                <Image
                  src="/Main Hero Image.png"
                  alt="Bug Hunter - Learn to code by hunting bugs. Interactive coding challenges with AI-powered learning and gamification features."
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Bug Hunter?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make learning to code fun, engaging, and effective through gamification 
              and AI-powered personalization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle>Interactive Challenges</CardTitle>
                <CardDescription>
                  Hunt bugs in real code examples. Learn by doing, not just reading.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-secondary-600" />
                </div>
                <CardTitle>AI-Powered Learning</CardTitle>
                <CardDescription>
                  Get personalized challenges that adapt to your skill level and learning pace.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-success-600" />
                </div>
                <CardTitle>Gamified Progress</CardTitle>
                <CardDescription>
                  Earn XP, unlock badges, and maintain streaks. Learning has never been this fun!
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle>Track Your Progress</CardTitle>
                <CardDescription>
                  See your improvement with detailed analytics and skill tracking.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-secondary-600" />
                </div>
                <CardTitle>Quick Daily Practice</CardTitle>
                <CardDescription>
                  Perfect for busy schedules. Learn in 5-15 minute sessions.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-success-600" />
                </div>
                <CardTitle>Join the Community</CardTitle>
                <CardDescription>
                  Connect with other learners and share your coding journey.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Master Web Development
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn the fundamentals of web development through our structured courses 
              and interactive challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-orange-200 hover:border-orange-300 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-lg">&lt;/&gt;</span>
                  </div>
                  <CardTitle className="text-orange-600">HTML</CardTitle>
                </div>
                <CardDescription>
                  Learn the structure of web pages with interactive HTML challenges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Challenges</span>
                    <span className="font-medium">10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Difficulty</span>
                    <Badge variant="success" size="sm">Beginner</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time</span>
                    <span className="font-medium">1-2 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 hover:border-blue-300 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">🎨</span>
                  </div>
                  <CardTitle className="text-blue-600">CSS</CardTitle>
                </div>
                <CardDescription>
                  Master styling and layout with CSS bug-hunting challenges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Challenges</span>
                    <span className="font-medium">10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Difficulty</span>
                    <Badge variant="secondary" size="sm">Intermediate</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time</span>
                    <span className="font-medium">1-2 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200 hover:border-yellow-300 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 font-bold text-lg">⚡</span>
                  </div>
                  <CardTitle className="text-yellow-600">JavaScript</CardTitle>
                </div>
                <CardDescription>
                  Add interactivity to your websites with JavaScript challenges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Challenges</span>
                    <span className="font-medium">10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Difficulty</span>
                    <Badge variant="danger" size="sm">Advanced</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time</span>
                    <span className="font-medium">2-3 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of learners who are already mastering web development with Bug Hunter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
              <Link href="/register">
                Start Learning Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white text-primary-600 hover:bg-gray-50" asChild>
              <Link href="/challenges">
                Try Demo First
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
