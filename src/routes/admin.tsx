import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { LogOut, Pencil, Plus, Trash2, TreePine } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { adminExists, bootstrapAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — S.S. WoodCraft" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Content management for S.S. WoodCraft." },
    ],
  }),
  component: AdminPage,
});

type Tab = "products" | "gallery";

type Row = {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  image_url: string | null;
  category: string;
  display_order: number;
  is_active: boolean;
};

type FormState = {
  id?: string;
  label: string;
  description: string;
  category: string;
  display_order: number;
  is_active: boolean;
  image_url: string | null;
};

const emptyForm: FormState = {
  label: "",
  description: "",
  category: "General",
  display_order: 0,
  is_active: true,
  image_url: null,
};

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Loading…</div>;
  }

  return session ? <Dashboard onSignOut={() => setSession(null)} /> : <AuthScreen />;
}

/* ---------------------------------- auth --------------------------------- */

function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [needsSetup, setNeedsSetup] = useState<boolean | null>(null);

  useEffect(() => {
    adminExists()
      .then((r) => setNeedsSetup(!r.exists))
      .catch(() => setNeedsSetup(false));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (needsSetup) {
        const res = await bootstrapAdmin({ data: { email: email.trim(), password } });
        if (!res.ok) {
          toast.error(res.message);
          return;
        }
        setNeedsSetup(false);
        toast.success(res.message);
      }
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) toast.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-forest-gradient px-4 py-12">
      <form onSubmit={submit} className="surface-card w-full max-w-sm rounded-sm p-8">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-sm border border-gold/60">
            <TreePine className="size-4 text-gold" aria-hidden="true" />
          </span>
          <span className="font-display text-xl">S.S. WoodCraft</span>
        </div>
        <h1 className="mt-6 font-display text-2xl">
          {needsSetup ? "Create admin account" : "Admin sign in"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {needsSetup
            ? "This is a one-time setup. Choose the email and password you will use to manage the site."
            : "Manage products and gallery photos."}
        </p>

        <label className="mt-6 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm normal-case tracking-normal text-foreground outline-hidden focus:border-gold"
          />
        </label>
        <label className="mt-4 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Password
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm normal-case tracking-normal text-foreground outline-hidden focus:border-gold"
          />
        </label>
        <button
          type="submit"
          disabled={busy || needsSetup === null}
          className="mt-6 w-full rounded-sm bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Please wait…" : needsSetup ? "Create account & sign in" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

/* -------------------------------- dashboard ------------------------------- */

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [tab, setTab] = useState<Tab>("products");
  const queryClient = useQueryClient();

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    onSignOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-forest-gradient">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5 text-primary-foreground">
            <TreePine className="size-4 text-gold" aria-hidden="true" />
            <span className="font-display text-lg">Site Manager</span>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 rounded-sm border border-primary-foreground/30 px-3 py-2 text-xs text-primary-foreground"
          >
            <LogOut className="size-3.5" aria-hidden="true" /> Sign out
          </button>
        </div>
      </header>

      <div className="container-x py-8">
        <div className="flex gap-2">
          {(["products", "gallery"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-sm px-5 py-2.5 text-sm capitalize transition-colors ${
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <Manager key={tab} table={tab} />
      </div>
    </div>
  );
}

/* --------------------------------- manager -------------------------------- */

function Manager({ table }: { table: Tab }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState | null>(null);
  const [uploading, setUploading] = useState(false);
  const labelField = table === "products" ? "name" : "title";

  const { data, isLoading } = useQuery({
    queryKey: ["admin", table],
    queryFn: async (): Promise<Row[]> => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", table] });
    queryClient.invalidateQueries({ queryKey: [table, "public"] });
  };

  const save = useMutation({
    mutationFn: async (value: FormState) => {
      const payload: Record<string, unknown> = {
        [labelField]: value.label.trim(),
        category: value.category.trim() || "General",
        display_order: Number(value.display_order) || 0,
        is_active: value.is_active,
        image_url: value.image_url,
      };
      if (table === "products") payload.description = value.description.trim();

      if (value.id) {
        const { error } = await supabase.from(table).update(payload as never).eq("id", value.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert(payload as never);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Saved");
      setForm(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggle = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from(table).update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  const onUpload = async (file: File) => {
    if (!form) return;
    setUploading(true);
    try {
      const path = `${table}/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
      const { error } = await supabase.storage.from("site-images").upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (error) throw error;
      const { data, error: signError } = await supabase.storage
        .from("site-images")
        .createSignedUrl(path, TEN_YEARS);
      if (signError || !data) throw signError ?? new Error("Could not create image link");
      setForm({ ...form, image_url: data.signedUrl });
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const nextOrder = useMemo(
    () => (data?.length ? Math.max(...data.map((r) => r.display_order)) + 1 : 1),
    [data],
  );

  return (
    <div className="mt-6">
      <button
        onClick={() => setForm({ ...emptyForm, display_order: nextOrder })}
        className="flex items-center gap-2 rounded-sm bg-gold px-5 py-2.5 text-sm font-medium text-accent-foreground"
      >
        <Plus className="size-4" aria-hidden="true" /> Add new
      </button>

      {form && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate(form);
          }}
          className="surface-card mt-5 grid gap-4 rounded-sm p-5 sm:grid-cols-2"
        >
          <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {table === "products" ? "Product name" : "Photo title"}
            <input
              required
              maxLength={120}
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm normal-case tracking-normal text-foreground outline-hidden focus:border-gold"
            />
          </label>

          <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Category
            <input
              maxLength={60}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm normal-case tracking-normal text-foreground outline-hidden focus:border-gold"
            />
          </label>

          {table === "products" && (
            <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground sm:col-span-2">
              Description
              <textarea
                rows={3}
                maxLength={400}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="mt-2 w-full resize-none rounded-sm border border-input bg-background px-3 py-2.5 text-sm normal-case tracking-normal text-foreground outline-hidden focus:border-gold"
              />
            </label>
          )}

          <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Display order
            <input
              type="number"
              value={form.display_order}
              onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
              className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-hidden focus:border-gold"
            />
          </label>

          <label className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
              className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2 text-xs normal-case tracking-normal text-foreground"
            />
          </label>

          {form.image_url && (
            <img
              src={form.image_url}
              alt="Selected"
              className="h-24 w-32 rounded-sm object-cover sm:col-span-2"
            />
          )}

          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="size-4 accent-[var(--forest)]"
            />
            Visible on the website
          </label>

          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              disabled={save.isPending || uploading}
              className="rounded-sm bg-primary px-6 py-2.5 text-sm text-primary-foreground disabled:opacity-60"
            >
              {uploading ? "Uploading…" : save.isPending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setForm(null)}
              className="rounded-sm border border-border px-6 py-2.5 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {data?.map((row) => {
          const label = (row.name ?? row.title ?? "") as string;
          return (
            <div
              key={row.id}
              className="surface-card flex flex-wrap items-center gap-4 rounded-sm p-3"
            >
              {row.image_url ? (
                <img
                  src={row.image_url}
                  alt={label}
                  className="size-14 shrink-0 rounded-sm object-cover"
                />
              ) : (
                <div className="grid size-14 shrink-0 place-items-center rounded-sm bg-muted text-[0.6rem] text-muted-foreground">
                  No image
                </div>
              )}

              <div className="min-w-40 flex-1">
                <p className="font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">
                  {row.category} · order {row.display_order}
                </p>
              </div>

              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={row.is_active}
                  onChange={(e) => toggle.mutate({ id: row.id, is_active: e.target.checked })}
                  className="size-4 accent-[var(--forest)]"
                />
                Visible
              </label>

              <button
                onClick={() =>
                  setForm({
                    id: row.id,
                    label,
                    description: row.description ?? "",
                    category: row.category,
                    display_order: row.display_order,
                    is_active: row.is_active,
                    image_url: row.image_url,
                  })
                }
                aria-label={`Edit ${label}`}
                className="grid size-9 place-items-center rounded-sm border border-border"
              >
                <Pencil className="size-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${label}"?`)) remove.mutate(row.id);
                }}
                aria-label={`Delete ${label}`}
                className="grid size-9 place-items-center rounded-sm border border-border text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
