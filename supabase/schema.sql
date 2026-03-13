create table if not exists users (
  id uuid primary key,
  email text not null unique,
  role text check (role in ('student','teacher','professional')),
  name text,
  level text,
  goals text,
  created_at timestamptz default now()
);

create table if not exists conversations (
  id bigint generated always as identity primary key,
  user_id uuid references users(id) on delete cascade,
  role text,
  messages jsonb,
  created_at timestamptz default now()
);

create table if not exists quizzes (
  id bigint generated always as identity primary key,
  user_id uuid references users(id) on delete cascade,
  topic text,
  questions jsonb,
  score int,
  taken_at timestamptz default now()
);

create table if not exists lesson_plans (
  id bigint generated always as identity primary key,
  teacher_id uuid references users(id) on delete cascade,
  subject text,
  content text,
  created_at timestamptz default now()
);

create table if not exists user_xp (
  id bigint generated always as identity primary key,
  user_id uuid references users(id) on delete cascade,
  total_xp int default 0,
  updated_at timestamptz default now()
);

create table if not exists badges (
  id bigint generated always as identity primary key,
  user_id uuid references users(id) on delete cascade,
  badge_name text,
  earned_at timestamptz default now()
);

create table if not exists streaks (
  id bigint generated always as identity primary key,
  user_id uuid references users(id) on delete cascade,
  current_streak int default 0,
  last_active date
);
