export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      annotations: {
        Row: {
          book_id: string | null
          content: string | null
          date_created: string | null
          id: string
          position_end: number | null
          position_start: number | null
          response: string | null
          status: Database["public"]["Enums"]["annotation_status"] | null
          type: Database["public"]["Enums"]["annotation_type"] | null
          user_id: string | null
        }
        Insert: {
          book_id?: string | null
          content?: string | null
          date_created?: string | null
          id?: string
          position_end?: number | null
          position_start?: number | null
          response?: string | null
          status?: Database["public"]["Enums"]["annotation_status"] | null
          type?: Database["public"]["Enums"]["annotation_type"] | null
          user_id?: string | null
        }
        Update: {
          book_id?: string | null
          content?: string | null
          date_created?: string | null
          id?: string
          position_end?: number | null
          position_start?: number | null
          response?: string | null
          status?: Database["public"]["Enums"]["annotation_status"] | null
          type?: Database["public"]["Enums"]["annotation_type"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "annotations_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "annotations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      behaviors: {
        Row: {
          behavior_type: Database["public"]["Enums"]["behavior_type"] | null
          date: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          behavior_type?: Database["public"]["Enums"]["behavior_type"] | null
          date?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          behavior_type?: Database["public"]["Enums"]["behavior_type"] | null
          date?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "behaviors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      book_genres: {
        Row: {
          book_id: string
          genre_id: number
        }
        Insert: {
          book_id: string
          genre_id: number
        }
        Update: {
          book_id?: string
          genre_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "book_genres_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_genres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
        ]
      }
      book_promotions: {
        Row: {
          book_id: string
          promotion_id: string
        }
        Insert: {
          book_id: string
          promotion_id: string
        }
        Update: {
          book_id?: string
          promotion_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_promotions_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_promotions_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author_id: string | null
          date_published: string | null
          description: string | null
          epub_url: string | null
          genre_id: number | null
          id: string
          price: number | null
          status: Database["public"]["Enums"]["book_status"] | null
          title: string | null
        }
        Insert: {
          author_id?: string | null
          date_published?: string | null
          description?: string | null
          epub_url?: string | null
          genre_id?: number | null
          id?: string
          price?: number | null
          status?: Database["public"]["Enums"]["book_status"] | null
          title?: string | null
        }
        Update: {
          author_id?: string | null
          date_published?: string | null
          description?: string | null
          epub_url?: string | null
          genre_id?: number | null
          id?: string
          price?: number | null
          status?: Database["public"]["Enums"]["book_status"] | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "books_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "books_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
        ]
      }
      genres: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          amount: number | null
          date_created: string | null
          date_end: string | null
          date_start: string | null
          discount_type: Database["public"]["Enums"]["discount_type"] | null
          id: string
          name: string | null
        }
        Insert: {
          amount?: number | null
          date_created?: string | null
          date_end?: string | null
          date_start?: string | null
          discount_type?: Database["public"]["Enums"]["discount_type"] | null
          id?: string
          name?: string | null
        }
        Update: {
          amount?: number | null
          date_created?: string | null
          date_end?: string | null
          date_start?: string | null
          discount_type?: Database["public"]["Enums"]["discount_type"] | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          banned: boolean | null
          book_id: string | null
          date_created: string | null
          date_modified: string | null
          description: string | null
          id: string
          report_type: Database["public"]["Enums"]["report_type"] | null
          status: Database["public"]["Enums"]["report_status"] | null
          user_id: string | null
        }
        Insert: {
          banned?: boolean | null
          book_id?: string | null
          date_created?: string | null
          date_modified?: string | null
          description?: string | null
          id?: string
          report_type?: Database["public"]["Enums"]["report_type"] | null
          status?: Database["public"]["Enums"]["report_status"] | null
          user_id?: string | null
        }
        Update: {
          banned?: boolean | null
          book_id?: string | null
          date_created?: string | null
          date_modified?: string | null
          description?: string | null
          id?: string
          report_type?: Database["public"]["Enums"]["report_type"] | null
          status?: Database["public"]["Enums"]["report_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          book_id: string | null
          comment: string | null
          date_created: string | null
          id: string
          rating: number | null
          user_id: string | null
        }
        Insert: {
          book_id?: string | null
          comment?: string | null
          date_created?: string | null
          id?: string
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          book_id?: string | null
          comment?: string | null
          date_created?: string | null
          id?: string
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      social_networks: {
        Row: {
          id: string
          network_type: string
          profile_url: string
          user_id: string | null
        }
        Insert: {
          id?: string
          network_type: string
          profile_url: string
          user_id?: string | null
        }
        Update: {
          id?: string
          network_type?: string
          profile_url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_networks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          date_end: string | null
          date_start: string | null
          id: string
          status: Database["public"]["Enums"]["transaction_status"] | null
          subscription_type:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          user_id: string | null
        }
        Insert: {
          date_end?: string | null
          date_start?: string | null
          id?: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          subscription_type?:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          user_id?: string | null
        }
        Update: {
          date_end?: string | null
          date_start?: string | null
          id?: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          subscription_type?:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number | null
          date_transaction: string | null
          id: string
          status: Database["public"]["Enums"]["transaction_status"] | null
          transaction_type:
            | Database["public"]["Enums"]["transaction_type"]
            | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          date_transaction?: string | null
          id?: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          transaction_type?:
            | Database["public"]["Enums"]["transaction_type"]
            | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          date_transaction?: string | null
          id?: string
          status?: Database["public"]["Enums"]["transaction_status"] | null
          transaction_type?:
            | Database["public"]["Enums"]["transaction_type"]
            | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_books: {
        Row: {
          book_id: string | null
          id: string
          type: Database["public"]["Enums"]["user_book_type"] | null
          user_id: string | null
        }
        Insert: {
          book_id?: string | null
          id?: string
          type?: Database["public"]["Enums"]["user_book_type"] | null
          user_id?: string | null
        }
        Update: {
          book_id?: string | null
          id?: string
          type?: Database["public"]["Enums"]["user_book_type"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_books_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_books_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_genres: {
        Row: {
          genre_id: number
          user_id: string
        }
        Insert: {
          genre_id: number
          user_id: string
        }
        Update: {
          genre_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_genres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_genres_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          bio: string | null
          date_joined: string | null
          email: string | null
          first_name: string | null
          id: string
          last_login: string | null
          last_name: string | null
          profile_picture: string | null
          stripe_account_id: string | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          date_joined?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_login?: string | null
          last_name?: string | null
          profile_picture?: string | null
          stripe_account_id?: string | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          date_joined?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_login?: string | null
          last_name?: string | null
          profile_picture?: string | null
          stripe_account_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      annotation_status: "open" | "resolved" | "flagged"
      annotation_type: "comment" | "correction" | "other"
      behavior_type: "non_constructive" | "no_feedback" | "other"
      book_status: "draft" | "published" | "in_correction"
      discount_type: "percentage" | "fixed"
      report_status: "open" | "resolved" | "rejected"
      report_type: "insult" | "inappropriate" | "other"
      subscription_type: "monthly" | "annual"
      transaction_status: "successful" | "failed" | "pending"
      transaction_type: "subscription" | "book_purchase" | "proofreading"
      user_book_type: "author" | "reader"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      annotation_status: ["open", "resolved", "flagged"],
      annotation_type: ["comment", "correction", "other"],
      behavior_type: ["non_constructive", "no_feedback", "other"],
      book_status: ["draft", "published", "in_correction"],
      discount_type: ["percentage", "fixed"],
      report_status: ["open", "resolved", "rejected"],
      report_type: ["insult", "inappropriate", "other"],
      subscription_type: ["monthly", "annual"],
      transaction_status: ["successful", "failed", "pending"],
      transaction_type: ["subscription", "book_purchase", "proofreading"],
      user_book_type: ["author", "reader"],
    },
  },
} as const
