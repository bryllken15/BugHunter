import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BH</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Bug Hunter</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Learn to code by hunting bugs like a detective! A gamified coding education platform 
              for mastering HTML, CSS, and JavaScript.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/challenges" className="text-sm text-gray-600 hover:text-primary-600">
                  HTML Challenges
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="text-sm text-gray-600 hover:text-primary-600">
                  CSS Challenges
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="text-sm text-gray-600 hover:text-primary-600">
                  JavaScript Challenges
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-sm text-gray-600 hover:text-primary-600">
                  Track Progress
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-primary-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2024 Bug Hunter. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/github" className="text-sm text-gray-500 hover:text-primary-600">
                GitHub
              </Link>
              <Link href="/twitter" className="text-sm text-gray-500 hover:text-primary-600">
                Twitter
              </Link>
              <Link href="/discord" className="text-sm text-gray-500 hover:text-primary-600">
                Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
