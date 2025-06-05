// @vitest-environment nuxt
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

const mockInsert = vi.fn();
const mockSelect = vi.fn();
const mockUpdate = vi.fn();
const mockEq = vi.fn();
const mockUpload = vi.fn();
const mockUserBooksInsert = vi.fn();

export const setupMockSupabase = () => {
  mockInsert.mockReturnValue({
    select: mockSelect.mockReturnValue({
      single: vi.fn().mockResolvedValue({
        data: { id: "book-123" },
        error: null,
      }),
    }),
  });

  mockUpdate.mockReturnValue({
    eq: mockEq.mockResolvedValue({ error: null }),
  });

  mockUpload.mockResolvedValue({ data: {}, error: null });

  mockUserBooksInsert.mockResolvedValue({ error: null });

  mockNuxtImport("useSupabaseClient", () => {
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
          upload: mockUpload,
        }),
      },
    });
  });

  mockNuxtImport("useSupabaseUser", () => {
    return () => ({
      value: { id: "fake-user-id" },
    });
  });
};

// Mock epubjs
vi.mock("epubjs", () => ({
  default: () => ({
    opened: Promise.resolve(),
    loaded: {
      metadata: Promise.resolve({ title: "Titre mocké" }),
    },
  }),
}));

// Utilitaire pour lire un fichier réel
function createFileFromAssets(filename: string, type: string): File {
  const path = resolve(__dirname, "assets", filename);
  const buffer = readFileSync(path);
  return new File([buffer], filename, { type });
}

beforeEach(() => {
  setupMockSupabase();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("useUploadEbook", () => {
  it("refuse un fichier non EPUB", async () => {
    const { uploadEbook, errorMessage } = useUploadEbook();

    const file = createFileFromAssets("TEST.pdf", "application/pdf");

    await uploadEbook(file);

    expect(errorMessage.value).toContain(
      "Le fichier doit être au format EPUB."
    );
  });

  it("upload un EPUB valide avec succès", async () => {
    const { uploadEbook, errorMessage, successMessage, uploading } =
      useUploadEbook();

    const file = createFileFromAssets("sherlock.epub", "application/epub+zip");

    await uploadEbook(file);

    expect(errorMessage.value).toBe("");
    expect(successMessage.value).toContain("Ebook importé");
    expect(uploading.value).toBe(false);

    expect(mockInsert).toHaveBeenCalledWith({
      title: "Titre mocké",
      author_id: "fake-user-id",
    });
    expect(mockUpload).toHaveBeenCalledWith("book-123.epub", file);
    expect(mockUpdate).toHaveBeenCalledWith({ epub_url: "book-123.epub" });
    expect(mockEq).toHaveBeenCalledWith("id", "book-123");
    expect(mockUserBooksInsert).toHaveBeenCalledWith({
      user_id: "fake-user-id",
      book_id: "book-123",
      type: "author",
    });
  });

  it("gère une erreur d'insertion dans books", async () => {
    mockSelect.mockReturnValueOnce({
      single: vi.fn().mockResolvedValue({
        data: null,
        error: new Error("Erreur insert books"),
      }),
    });

    const { uploadEbook, errorMessage } = useUploadEbook();
    const file = createFileFromAssets("sherlock.epub", "application/epub+zip");

    await uploadEbook(file);

    expect(errorMessage.value).toContain("Erreur insert books");
  });

  it("gère une erreur de stockage (upload)", async () => {
    mockUpload.mockResolvedValueOnce({
      data: null,
      error: new Error("Erreur upload"),
    });

    const { uploadEbook, errorMessage } = useUploadEbook();
    const file = createFileFromAssets("sherlock.epub", "application/epub+zip");

    await uploadEbook(file);

    expect(errorMessage.value).toContain("Erreur upload");
  });

  it("gère une erreur de mise à jour du livre (update)", async () => {
    mockEq.mockResolvedValueOnce({ error: new Error("Erreur update") });

    const { uploadEbook, errorMessage } = useUploadEbook();
    const file = createFileFromAssets("sherlock.epub", "application/epub+zip");

    await uploadEbook(file);

    expect(errorMessage.value).toContain("Erreur update");
  });

  it("gère une erreur d’insertion dans user_books", async () => {
    mockUserBooksInsert.mockResolvedValueOnce({
      error: new Error("Erreur user_books"),
    });

    const { uploadEbook, errorMessage } = useUploadEbook();
    const file = createFileFromAssets("sherlock.epub", "application/epub+zip");

    await uploadEbook(file);

    expect(errorMessage.value).toContain("Erreur user_books");
  });
});
