export const useSignupUser = () => {
  const supabase = useSupabaseClient();

  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const errorMessage = ref("");
  const loading = ref(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const signupUser = async () => {
    errorMessage.value = "";
    loading.value = true;

    if (!emailRegex.test(email.value)) {
      errorMessage.value = "L'email n'est pas valide.";
      loading.value = false;
      return;
    }

    if (password.value !== confirmPassword.value) {
      errorMessage.value = "Les mots de passe ne correspondent pas.";
      loading.value = false;
      return;
    }

    if (!passwordRegex.test(password.value)) {
      errorMessage.value =
        "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et un chiffre.";
      loading.value = false;
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });

      if (error) throw error;
      if (!data.user) throw new Error("Utilisateur introuvable");

      await navigateTo("/auth/role");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      errorMessage.value = err.message || "Erreur inconnue.";
    } finally {
      loading.value = false;
    }
  };

  return {
    email,
    password,
    confirmPassword,
    errorMessage,
    loading,
    signupUser,
  };
};
