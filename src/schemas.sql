create table
  public.bookmarks (
    id uuid not null default gen_random_uuid (),
    user_id uuid not null default auth.uid (),
    project_id uuid not null,
    constraint bookmarks_pkey primary key (id),
    constraint bookmarks_project_id_fkey foreign key (project_id) references projects (id) on delete cascade,
    constraint bookmarks_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

  create table
  public.comments (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    content text null,
    tags json null,
    project_id uuid not null,
    user_id uuid not null default auth.uid (),
    profile_img_url text null,
    user_name text null,
    constraint comments_pkey primary key (id),
    constraint comments_project_id_fkey1 foreign key (project_id) references projects (id) on delete cascade,
    constraint comments_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

  create table
  public.projects (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    url text null,
    user_id uuid null default auth.uid (),
    name text not null,
    is_public boolean null default false,
    thumbnail_url text null,
    constraint test_pkey primary key (id),
    constraint projects_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;


  create table
  public.whitelist (
    id uuid not null default gen_random_uuid (),
    email text not null,
    project_id uuid not null,
    user_id uuid not null default auth.uid (),
    constraint whitelist_pkey primary key (id),
    constraint whitelist_project_id_fkey foreign key (project_id) references projects (id) on delete cascade,
    constraint whitelist_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;


  -- Returns every project user has access to (owner of, in whitelist or project public)
CREATE OR REPLACE VIEW view_all_project_details WITH (security_invoker) AS
SELECT
  p.id,
  p.name,
  p.url,
  p.thumbnail_url,
  (p.user_id = auth.uid()) AS is_owner,
  p.is_public,
  COALESCE(
    json_agg(
      json_build_object('id', w.id, 'email', w.email)
      ORDER BY w.id
    ) FILTER (WHERE w.id IS NOT NULL),
    '[]'
  ) AS whitelist
FROM projects p
LEFT JOIN whitelist w 
  ON p.id = w.project_id AND p.user_id = w.user_id
GROUP BY p.id;

CREATE or REPLACE VIEW view_bookmarks WITH (security_invoker) as
SELECT
b.id,
b.project_id
FROM bookmarks b
WHERE b.user_id = auth.uid()

CREATE OR REPLACE VIEW view_shared_project_details WITH (security_invoker) AS
SELECT
  p.id,
  p.name,
  p.url,
   p.thumbnail_url,
  (p.user_id = auth.uid()) AS is_owner,
  p.is_public,
  COALESCE(
    json_agg(
      json_build_object('id', w.id, 'email', w.email)
      ORDER BY w.id
    ) FILTER (WHERE w.id IS NOT NULL),
    '[]'
  ) AS whitelist
FROM
  projects p
LEFT JOIN whitelist w ON p.id = w.project_id AND p.user_id = w.user_id
JOIN bookmarks b ON b.project_id = p.id AND b.user_id = auth.uid()
GROUP BY p.id;

CREATE OR REPLACE VIEW view_user_project_details WITH (security_invoker) AS
SELECT
  p.id,
  p.name,
  p.url,
  p.thumbnail_url,
  (p.user_id = auth.uid()) AS is_owner,
  p.is_public,
  COALESCE(
    json_agg(
      json_build_object('id', w.id, 'email', w.email)
      ORDER BY w.id
    ) FILTER (WHERE w.id IS NOT NULL),
    '[]'
  ) AS whitelist
FROM projects p
LEFT JOIN whitelist w 
  ON p.id = w.project_id AND p.user_id = w.user_id
WHERE p.user_id = auth.uid()
GROUP BY p.id;

CREATE OR REPLACE FUNCTION allowed_project_ids()
RETURNS SETOF uuid AS $$
BEGIN
    RETURN QUERY SELECT project_id FROM whitelist WHERE email = (auth.jwt() ->> 'email');
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

