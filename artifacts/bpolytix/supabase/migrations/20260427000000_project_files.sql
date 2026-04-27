-- RUN THIS IN SUPABASE SQL EDITOR BEFORE DEPLOYING THE PROJECT FILES FEATURE

CREATE TABLE public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id),
  file_name text not null,
  file_path text not null,
  file_size bigint not null,
  label text,
  created_at timestamptz not null default now()
);

ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients see own project files"
  ON public.project_files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_files.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Admin sees all files"
  ON public.project_files FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Authenticated users can insert files"
  ON public.project_files FOR INSERT
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Admin can delete any file"
  ON public.project_files FOR DELETE
  USING (public.is_admin());

CREATE POLICY "Clients can delete own uploads"
  ON public.project_files FOR DELETE
  USING (auth.uid() = uploaded_by);
