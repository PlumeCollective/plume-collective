// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

const insertMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  mockNuxtImport("useSupabaseClient", () => {
    return () => ({
      from: () => ({
        insert: insertMock.mockResolvedValue({ error: null }),
      }),
    });
  });

  mockNuxtImport("useSupabaseUser", () => {
    return () => ({
      value: { id: "test-user-id" },
    });
  });

  mockNuxtImport("useRoute", () => {
    return () => ({
      params: {
        id: "book-123",
      },
    });
  });
});

describe("useSaveAnnotation", () => {
  it("refuse de sauvegarder si aucun texte n'est sélectionné", async () => {
    const { saveAnnotation, errorMessage } = useSaveAnnotation();

    await saveAnnotation("Texte présent", "", "comment");

    expect(insertMock).not.toHaveBeenCalled();
    expect(errorMessage.value).toContain(
      "Position invalide pour l’annotation."
    );
  });

  it("refuse de sauvegarder si le contenu est vide", async () => {
    const { saveAnnotation, errorMessage } = useSaveAnnotation();

    await saveAnnotation("", "epubcfi(/6/2[chap01]!/4/2/14)", "comment");

    expect(insertMock).not.toHaveBeenCalled();
    expect(errorMessage.value).toContain(
      "Le contenu de l’annotation est requis"
    );
  });

  it("sauvegarde l’annotation si les champs sont valides", async () => {
    const { saveAnnotation, errorMessage } = useSaveAnnotation();

    await saveAnnotation(
      "Ceci est une note",
      "epubcfi(/6/2[chap01]!/4/2/14)",
      "comment"
    );

    expect(insertMock).toHaveBeenCalledOnce();
    expect(errorMessage.value).toBe("");
  });
});
