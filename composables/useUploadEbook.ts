import ePub from "epubjs";
import type { Database } from "~/database.types";

export const useUploadEbook = () => {
  const supabase = useSupabaseClient<Database>();
  const user = useSupabaseUser();

  const uploading = ref(false);
  const successMessage = ref("");
  const errorMessage = ref("");

  const uploadEbook = async (file: File) => {
    if (!file.name.endsWith(".epub")) {
      errorMessage.value = "Le fichier doit être au format EPUB.";
      return;
    }

    const userId = user.value?.id;
    if (!userId) {
      errorMessage.value = "Utilisateur non authentifié.";
      return;
    }

    const buffer = await file.arrayBuffer();
    const bookFromFile = ePub(buffer);
    await bookFromFile.opened;

    const metadata = await bookFromFile.loaded.metadata;
    const title = metadata?.title?.trim() || file.name.replace(".epub", "");

    try {
      uploading.value = true;
      errorMessage.value = "";
      successMessage.value = "";

      const { data: book, error: insertError } = await supabase
        .from("books")
        .insert({ title, author_id: userId })
        .select()
        .single();

      if (insertError || !book) throw insertError;

      const filePath = `${book.id}.epub`;

      const { error: uploadError } = await supabase.storage
        .from("ebooks")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from("books")
        .update({ epub_url: filePath })
        .eq("id", book.id);

      if (updateError) throw updateError;

      const { error: linkError } = await supabase
        .from("user_books")
        .insert({ user_id: userId, book_id: book.id, type: "author" });

      if (linkError) throw linkError;

      successMessage.value = "Ebook importé avec succès !";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      errorMessage.value = err.message || "Erreur lors de l’import.";
    } finally {
      uploading.value = false;
    }
  };

  return {
    uploading,
    successMessage,
    errorMessage,
    uploadEbook,
  };
};
