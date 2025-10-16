-- Bug Hunter Database Schema
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
ALTER TABLE IF EXISTS user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS challenge_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_achievements ENABLE ROW LEVEL SECURITY;

-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_type TEXT NOT NULL CHECK (course_type IN ('html', 'css', 'javascript')),
  challenges_completed INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_type)
);

-- Challenges Table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_type TEXT NOT NULL CHECK (course_type IN ('html', 'css', 'javascript')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  code_template TEXT NOT NULL,
  bugs JSONB NOT NULL DEFAULT '[]',
  hints JSONB NOT NULL DEFAULT '[]',
  solution TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 25,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenge Attempts Table
CREATE TABLE IF NOT EXISTS challenge_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  time_taken INTEGER DEFAULT 0, -- in seconds
  hints_used INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 50,
  requirements JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Row Level Security Policies

-- User Progress Policies
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Challenge Attempts Policies
CREATE POLICY "Users can view own attempts" ON challenge_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts" ON challenge_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own attempts" ON challenge_attempts
  FOR UPDATE USING (auth.uid() = user_id);

-- User Achievements Policies
CREATE POLICY "Users can view own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Challenges and Achievements are public (read-only)
CREATE POLICY "Challenges are viewable by everyone" ON challenges
  FOR SELECT USING (true);

CREATE POLICY "Achievements are viewable by everyone" ON achievements
  FOR SELECT USING (true);

-- Functions and Triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for user_progress updated_at
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate level from XP
CREATE OR REPLACE FUNCTION calculate_level(xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  IF xp < 100 THEN RETURN 1;
  ELSIF xp < 250 THEN RETURN 2;
  ELSIF xp < 500 THEN RETURN 3;
  ELSIF xp < 750 THEN RETURN 4;
  ELSE RETURN 5;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to check and award achievements
CREATE OR REPLACE FUNCTION check_achievements()
RETURNS TRIGGER AS $$
DECLARE
  achievement_record RECORD;
  user_total_xp INTEGER;
  user_total_challenges INTEGER;
  user_streak INTEGER;
BEGIN
  -- Get user's total stats
  SELECT 
    COALESCE(SUM(total_xp), 0),
    COALESCE(SUM(challenges_completed), 0),
    COALESCE(MAX(streak_days), 0)
  INTO user_total_xp, user_total_challenges, user_streak
  FROM user_progress
  WHERE user_id = NEW.user_id;

  -- Check each achievement
  FOR achievement_record IN 
    SELECT * FROM achievements 
    WHERE NOT EXISTS (
      SELECT 1 FROM user_achievements 
      WHERE user_id = NEW.user_id AND achievement_id = achievements.id
    )
  LOOP
    -- Check achievement requirements
    IF achievement_record.name = 'First Bug Fixed' AND user_total_challenges >= 1 THEN
      INSERT INTO user_achievements (user_id, achievement_id) 
      VALUES (NEW.user_id, achievement_record.id);
    ELSIF achievement_record.name = 'HTML Master' AND 
          EXISTS (SELECT 1 FROM user_progress WHERE user_id = NEW.user_id AND course_type = 'html' AND challenges_completed >= 10) THEN
      INSERT INTO user_achievements (user_id, achievement_id) 
      VALUES (NEW.user_id, achievement_record.id);
    ELSIF achievement_record.name = 'CSS Wizard' AND 
          EXISTS (SELECT 1 FROM user_progress WHERE user_id = NEW.user_id AND course_type = 'css' AND challenges_completed >= 10) THEN
      INSERT INTO user_achievements (user_id, achievement_id) 
      VALUES (NEW.user_id, achievement_record.id);
    ELSIF achievement_record.name = 'JavaScript Jedi' AND 
          EXISTS (SELECT 1 FROM user_progress WHERE user_id = NEW.user_id AND course_type = 'javascript' AND challenges_completed >= 10) THEN
      INSERT INTO user_achievements (user_id, achievement_id) 
      VALUES (NEW.user_id, achievement_record.id);
    ELSIF achievement_record.name = 'Learning Legend' AND user_total_xp >= 750 THEN
      INSERT INTO user_achievements (user_id, achievement_id) 
      VALUES (NEW.user_id, achievement_record.id);
    ELSIF achievement_record.name = 'Bug Slayer' AND user_total_challenges >= 30 THEN
      INSERT INTO user_achievements (user_id, achievement_id) 
      VALUES (NEW.user_id, achievement_record.id);
    ELSIF achievement_record.name = 'Streak Master' AND user_streak >= 7 THEN
      INSERT INTO user_achievements (user_id, achievement_id) 
      VALUES (NEW.user_id, achievement_record.id);
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to check achievements when user progress is updated
CREATE TRIGGER check_achievements_trigger
  AFTER UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION check_achievements();

-- Insert sample achievements
INSERT INTO achievements (name, description, icon, xp_reward, requirements) VALUES
('First Bug Fixed', 'Complete your first challenge', '🐛', 25, '{"challenges_completed": 1}'),
('HTML Master', 'Complete all HTML challenges', '🌐', 100, '{"course": "html", "challenges_completed": 10}'),
('CSS Wizard', 'Complete all CSS challenges', '🎨', 100, '{"course": "css", "challenges_completed": 10}'),
('JavaScript Jedi', 'Complete all JavaScript challenges', '⚡', 100, '{"course": "javascript", "challenges_completed": 10}'),
('Speed Coder', 'Complete 5 challenges under 2 minutes', '🏃', 75, '{"speed_challenges": 5}'),
('Perfect Score', 'Get 100% accuracy on 5 challenges', '🎯', 75, '{"perfect_scores": 5}'),
('Streak Master', 'Maintain a 7-day streak', '🔥', 100, '{"streak_days": 7}'),
('Code Detective', 'Use hints wisely (complete 10 challenges with ≤1 hint)', '🔍', 75, '{"efficient_challenges": 10}'),
('Learning Legend', 'Reach level 5', '👑', 150, '{"level": 5}'),
('Bug Slayer', 'Complete 30 total challenges', '⚔️', 200, '{"total_challenges": 30}');

-- Insert sample challenges
INSERT INTO challenges (course_type, difficulty, title, description, code_template, bugs, hints, solution, xp_reward) VALUES
('html', 'easy', 'Missing Closing Tag', 'This HTML has a missing closing tag. Can you find it?', '<html>
<head>
<title>My Page</title>
</head>
<body>
<h1>Welcome</h1>
<p>This is a paragraph
</body>
</html>', '[{"id": "1", "line": 7, "description": "Missing closing </p> tag", "type": "syntax", "severity": "high"}]', '["Look at the paragraph tag", "Check if all tags are properly closed", "The <p> tag is missing its closing </p>"]', '<html>
<head>
<title>My Page</title>
</head>
<body>
<h1>Welcome</h1>
<p>This is a paragraph</p>
</body>
</html>', 25),

('html', 'easy', 'Broken Link', 'This link is not working properly. Fix it!', '<a href="https://example.com">Visit Example</a>', '[{"id": "1", "line": 1, "description": "Missing closing </a> tag", "type": "syntax", "severity": "high"}]', '["Check the anchor tag structure", "Look for missing closing tags", "The <a> tag needs a closing </a>"]', '<a href="https://example.com">Visit Example</a>', 25),

('css', 'easy', 'Centering Problem', 'This button is not centered. Can you fix it?', '.button {
  text-align: center
  margin: auto
}', '[{"id": "1", "line": 2, "description": "Missing semicolon after text-align", "type": "syntax", "severity": "medium"}, {"id": "2", "line": 3, "description": "Missing semicolon after margin", "type": "syntax", "severity": "medium"}]', '["Check your CSS syntax", "Look for missing semicolons", "CSS properties need semicolons at the end"]', '.button {
  text-align: center;
  margin: auto;
}', 25),

('javascript', 'easy', 'Button Click Handler', 'This button click handler is not working. Fix it!', 'function clickButton() {
  alert("Hello World")
}
document.getElementById("btn").addEventListener("click", clickButton', '[{"id": "1", "line": 4, "description": "Missing closing parenthesis", "type": "syntax", "severity": "high"}]', '["Check your function call", "Look for missing parentheses", "The addEventListener call needs a closing )"]', 'function clickButton() {
  alert("Hello World")
}
document.getElementById("btn").addEventListener("click", clickButton)', 25);
