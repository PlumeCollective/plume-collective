// @vitest-environment nuxt
import { describe, it, expect, vi } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

mockNuxtImport("useSupabaseClient", () => {
  return () => ({
    auth: {
      signUp: vi.fn().mockResolvedValue({ data: { user: {} }, error: null }),
    },
  });
});

mockNuxtImport("useSupabaseUser", () => {
  return () => ({ value: null });
});

describe("handleSignup", () => {
  it("refuse un email non valide", async () => {
    const { signupUser, errorMessage, email, password, confirmPassword } =
      useSignupUser();

    email.value = "email-non-valide";
    password.value = "Abcd1234";
    confirmPassword.value = "Abcd1234";

    await signupUser();

    expect(errorMessage.value).toContain("L'email n'est pas valide");
  });

  it("refuse les mots de passe non conformes", async () => {
    const { signupUser, errorMessage, email, password, confirmPassword } =
      useSignupUser();

    email.value = "test@email.com";
    password.value = "abc";
    confirmPassword.value = "abc";

    await signupUser();
    expect(errorMessage.value).toContain(
      "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et un chiffre."
    );
  });

  it("refuse si les mots de passe ne correspondent pas", async () => {
    const { signupUser, errorMessage, email, password, confirmPassword } =
      useSignupUser();

    email.value = "test@email.com";
    password.value = "Abcd1234";
    confirmPassword.value = "Wrong1234";

    await signupUser();
    expect(errorMessage.value).toContain("Les mots de passe ne correspondent");
  });

  it("accepte une inscription avec des champs valides", async () => {
    const { signupUser, errorMessage, email, password, confirmPassword } =
      useSignupUser();

    email.value = "valide@email.com";
    password.value = "Abcd1234";
    confirmPassword.value = "Abcd1234";

    await signupUser();

    expect(errorMessage.value).toBe("");
  });
});
