-- Seed Sample Challenges for Bug Hunter
-- Run this to add some initial challenges for testing

-- HTML Challenges
INSERT INTO challenges (course_type, difficulty, title, description, code_template, bugs, hints, solution, xp_reward) VALUES
('html', 'easy', 'Missing Closing Tag', 'This HTML has a missing closing tag. Can you find and fix it?',
'<html>
<head>
<title>My Page</title>
</head>
<body>
<h1>Welcome</h1>
<p>This is a paragraph
</body>
</html>',
'[{"id": "bug1", "line": 7, "description": "Missing closing </p> tag", "type": "syntax", "severity": "high"}]'::jsonb,
'["Look at the paragraph tag", "Check if all tags are properly closed", "The <p> tag is missing its closing </p>"]'::jsonb,
'<html>
<head>
<title>My Page</title>
</head>
<body>
<h1>Welcome</h1>
<p>This is a paragraph</p>
</body>
</html>',
25),

('html', 'easy', 'Broken Link', 'This HTML link is not properly closed. Fix the issue!',
'<html>
<body>
<a href="https://example.com">Visit Example
</body>
</html>',
'[{"id": "bug1", "line": 3, "description": "Missing closing </a> tag", "type": "syntax", "severity": "high"}]'::jsonb,
'["Check the anchor tag", "Links need closing tags", "Add </a> after the link text"]'::jsonb,
'<html>
<body>
<a href="https://example.com">Visit Example</a>
</body>
</html>',
25),

-- CSS Challenges
('css', 'easy', 'Missing Semicolons', 'This CSS is missing semicolons. Can you fix it?',
'.button {
  text-align: center
  margin: auto
  padding: 10px
}',
'[{"id": "bug1", "line": 2, "description": "Missing semicolon after text-align", "type": "syntax", "severity": "medium"}, {"id": "bug2", "line": 3, "description": "Missing semicolon after margin", "type": "syntax", "severity": "medium"}, {"id": "bug3", "line": 4, "description": "Missing semicolon after padding", "type": "syntax", "severity": "medium"}]'::jsonb,
'["Check your CSS syntax", "Look for missing semicolons", "CSS properties need semicolons at the end"]'::jsonb,
'.button {
  text-align: center;
  margin: auto;
  padding: 10px;
}',
25),

-- JavaScript Challenges
('javascript', 'easy', 'Missing Parenthesis', 'This JavaScript function call is missing a closing parenthesis. Fix it!',
'function clickButton() {
  alert("Hello World")
}
document.getElementById("btn").addEventListener("click", clickButton',
'[{"id": "bug1", "line": 4, "description": "Missing closing parenthesis", "type": "syntax", "severity": "high"}]'::jsonb,
'["Check your function call", "Look for missing parentheses", "The addEventListener call needs a closing )"]'::jsonb,
'function clickButton() {
  alert("Hello World")
}
document.getElementById("btn").addEventListener("click", clickButton)',
25)
ON CONFLICT DO NOTHING;

