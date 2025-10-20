-- Seed Initial Achievements for Bug Hunter
-- Run this after creating the database schema

-- Ensure a unique constraint exists on achievements.name for ON CONFLICT to work
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM   pg_indexes
    WHERE  schemaname = 'public'
    AND    indexname = 'achievements_name_key'
  ) THEN
    -- Try to add a unique constraint; if table already has it under a different name, this will fail harmlessly in Supabase UI context
    BEGIN
      ALTER TABLE achievements ADD CONSTRAINT achievements_name_key UNIQUE (name);
    EXCEPTION WHEN duplicate_table THEN
      -- ignore
    END;
  END IF;
END$$;

INSERT INTO achievements (name, description, icon, xp_reward, requirements) VALUES
('First Bug Fixed', 'Complete your first challenge', '🐛', 25, '{"challenges_completed": 1}'::jsonb),
('HTML Master', 'Complete 10 HTML challenges', '🌐', 100, '{"html_challenges": 10}'::jsonb),
('CSS Wizard', 'Master 10 CSS challenges', '🎨', 100, '{"css_challenges": 10}'::jsonb),
('JavaScript Jedi', 'Complete 10 JavaScript challenges', '⚡', 100, '{"js_challenges": 10}'::jsonb),
('Speed Coder', 'Complete 5 challenges under 2 minutes', '🏃', 75, '{"fast_completions": 5}'::jsonb),
('Perfect Score', 'Get 100% accuracy on 5 challenges', '🎯', 75, '{"perfect_scores": 5}'::jsonb),
('Streak Master', 'Maintain a 7-day learning streak', '🔥', 150, '{"streak_days": 7}'::jsonb),
('Code Detective', 'Complete 10 challenges using ≤1 hint', '🔍', 125, '{"hint_efficient": 10}'::jsonb),
('Learning Legend', 'Reach level 5', '👑', 200, '{"level": 5}'::jsonb),
('Bug Slayer', 'Complete 30 total challenges', '⚔️', 250, '{"total_challenges": 30}'::jsonb)
ON CONFLICT (name) DO NOTHING;

