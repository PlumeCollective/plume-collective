// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

beforeEach(() => {
  vi.clearAllMocks();
});

mockNuxtImport("useSupabaseClient", () => {
  const mockInsert = vi.fn().mockReturnValue({
    select: vi.fn().mockReturnValue({
      single: vi.fn().mockResolvedValue({
        data: { id: "book-123" },
        error: null,
      }),
    }),
  });

  const mockUpdate = vi.fn().mockReturnValue({
    eq: vi.fn().mockResolvedValue({ error: null }),
  });

  const mockUserBooksInsert = vi.fn().mockResolvedValue({ error: null });

  return () => ({
    from: (table: string) => {
      if (table === "books") {
        return {
          insert: mockInsert,
          update: mockUpdate,
        };
      }

      if (table === "user_books") {
        return {
          insert: mockUserBooksInsert,
        };
      }

      return {};
    },
    storage: {
      from: () => ({
        upload: vi.fn().mockResolvedValue({ data: {}, error: null }),
      }),
    },
  });
});

mockNuxtImport("useSupabaseUser", () => {
  return () => ({
    value: { id: "fake-user-id" },
  });
});

vi.mock("epubjs", () => ({
  default: () => ({
    opened: Promise.resolve(),
    loaded: {
      metadata: Promise.resolve({ title: "Titre mocké" }),
    },
    coverUrl: () => Promise.resolve(null),
  }),
}));

describe("useUploadEbook", () => {
  it("refuse un fichier non EPUB", async () => {
    const { uploadEbook, errorMessage } = useUploadEbook();

    const file = new File(["dummy content"], "test.pdf", {
      type: "application/pdf",
    });

    await uploadEbook(file);

    expect(errorMessage.value).toContain(
      "Le fichier doit être au format EPUB."
    );
  });

  it("upload un fichier EPUB valide sans erreur", async () => {
    const { uploadEbook, errorMessage, successMessage, uploading } =
      useUploadEbook();

    const file = new File(["dummy EPUB content"], "book.epub", {
      type: "application/epub+zip",
    });

    await uploadEbook(file);

    expect(errorMessage.value).toBe("");
    expect(successMessage.value).toContain("Ebook importé");
    expect(uploading.value).toBe(false);
  });
});
