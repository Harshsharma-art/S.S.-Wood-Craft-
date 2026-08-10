import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const bootstrapSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(72),
});

/** True when at least one admin account already exists. */
export const adminExists = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { count, error } = await supabaseAdmin
    .from("user_roles")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");
  if (error) throw new Error(error.message);
  return { exists: (count ?? 0) > 0 };
});

/** One-time setup: creates the very first admin account. No-op once one exists. */
export const bootstrapAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bootstrapSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countError) throw new Error(countError.message);
    if ((count ?? 0) > 0) {
      return { ok: false as const, message: "An admin account already exists." };
    }

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (error || !created.user) {
      return { ok: false as const, message: error?.message ?? "Could not create the admin user." };
    }

    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: created.user.id, role: "admin" });
    if (roleError) {
      return { ok: false as const, message: roleError.message };
    }

    return { ok: true as const, message: "Admin account created. You can sign in now." };
  });
