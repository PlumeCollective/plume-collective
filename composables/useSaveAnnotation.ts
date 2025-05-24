import type { Database } from "~/database.types";

export const useSaveAnnotation = () => {
  const supabase = useSupabaseClient<Database>();
  const user = useSupabaseUser();
  const route = useRoute();
  const errorMessage = ref("");

  const saveAnnotation = async (
    content: string,
    cfiRange: string,
    type: "comment" | "correction" | "other"
  ) => {
    errorMessage.value = "";

    if (!user.value) {
      errorMessage.value = "Utilisateur non connecté.";
      return;
    }

    if (!content.trim()) {
      errorMessage.value = "Le contenu de l’annotation est requis.";
      return;
    }

    if (!cfiRange) {
      errorMessage.value = "Position invalide pour l’annotation.";
      return;
    }

    const bookId = route.params.id as string;

    const { error } = await supabase.from("annotations").insert({
      user_id: user.value.id,
      book_id: bookId,
      content,
      position_start: cfiRange,
      type,
      status: "open",
    });

    if (error) {
      errorMessage.value = error.message || "Erreur lors de l’enregistrement.";
    }
  };

  return { saveAnnotation, errorMessage };
};
