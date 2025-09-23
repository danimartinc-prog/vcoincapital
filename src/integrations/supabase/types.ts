export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      investments: {
        Row: {
          amount_eur: number
          amount_vcoin: number
          created_at: string
          id: string
          investor_id: string
          project_id: string
          status: string | null
          transaction_hash: string | null
          updated_at: string
        }
        Insert: {
          amount_eur: number
          amount_vcoin: number
          created_at?: string
          id?: string
          investor_id: string
          project_id: string
          status?: string | null
          transaction_hash?: string | null
          updated_at?: string
        }
        Update: {
          amount_eur?: number
          amount_vcoin?: number
          created_at?: string
          id?: string
          investor_id?: string
          project_id?: string
          status?: string | null
          transaction_hash?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investments_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_contacts: {
        Row: {
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string
          id: string
          project_id: string
          updated_at: string
        }
        Insert: {
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          project_id: string
          updated_at?: string
        }
        Update: {
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          project_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          company_name: string | null
          company_website: string | null
          competition_analysis: string | null
          country: string
          created_at: string
          description: string | null
          documents: Json | null
          founder_id: string
          funding_history: string | null
          goal_cash_eur: number
          goal_vcoin: number
          id: string
          investor_count: number | null
          market_analysis: string | null
          min_ticket_eur: number
          min_ticket_vcoin: number
          raised_amount: number | null
          revenue_last_year: number | null
          risk_factors: string | null
          stage: string
          status: string | null
          summary: string
          team_size: number | null
          title: string
          updated_at: string
          use_of_funds: string | null
        }
        Insert: {
          category: string
          company_name?: string | null
          company_website?: string | null
          competition_analysis?: string | null
          country: string
          created_at?: string
          description?: string | null
          documents?: Json | null
          founder_id: string
          funding_history?: string | null
          goal_cash_eur: number
          goal_vcoin: number
          id?: string
          investor_count?: number | null
          market_analysis?: string | null
          min_ticket_eur: number
          min_ticket_vcoin: number
          raised_amount?: number | null
          revenue_last_year?: number | null
          risk_factors?: string | null
          stage: string
          status?: string | null
          summary: string
          team_size?: number | null
          title: string
          updated_at?: string
          use_of_funds?: string | null
        }
        Update: {
          category?: string
          company_name?: string | null
          company_website?: string | null
          competition_analysis?: string | null
          country?: string
          created_at?: string
          description?: string | null
          documents?: Json | null
          founder_id?: string
          funding_history?: string | null
          goal_cash_eur?: number
          goal_vcoin?: number
          id?: string
          investor_count?: number | null
          market_analysis?: string | null
          min_ticket_eur?: number
          min_ticket_vcoin?: number
          raised_amount?: number | null
          revenue_last_year?: number | null
          risk_factors?: string | null
          stage?: string
          status?: string | null
          summary?: string
          team_size?: number | null
          title?: string
          updated_at?: string
          use_of_funds?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          project_id: string | null
          status: string | null
          transaction_hash: string
          transaction_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          id?: string
          project_id?: string | null
          status?: string | null
          transaction_hash: string
          transaction_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          project_id?: string | null
          status?: string | null
          transaction_hash?: string
          transaction_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_admin_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "founder"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "founder"],
    },
  },
} as const
