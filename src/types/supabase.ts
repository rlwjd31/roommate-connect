export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      user: {
        Row: {
          avatar: string
          birth: number
          created_at: string
          email: string
          gender: number
          id: string
          login_type: string
          name: string
          nickname: string
          password: string
          phone_number: number
          status: number
          updated_at: string
        }
        Insert: {
          avatar: string
          birth: number
          created_at?: string
          email: string
          gender: number
          id?: string
          login_type: string
          name: string
          nickname: string
          password: string
          phone_number: number
          status: number
          updated_at?: string
        }
        Update: {
          avatar?: string
          birth?: number
          created_at?: string
          email?: string
          gender?: number
          id?: string
          login_type?: string
          name?: string
          nickname?: string
          password?: string
          phone_number?: number
          status?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          category: number
          content: string
          content_id: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: number
          content: string
          content_id?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: number
          content?: string
          content_id?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_alarm: {
        Row: {
          alarm_by_who: string
          alarm_content: string
          alarm_type: number
          created_at: string
          id: string
          is_checked: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          alarm_by_who: string
          alarm_content: string
          alarm_type: number
          created_at?: string
          id?: string
          is_checked: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          alarm_by_who?: string
          alarm_content?: string
          alarm_type?: number
          created_at?: string
          id?: string
          is_checked?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_alarm_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_alarm_setting: {
        Row: {
          chat_alarm_1: boolean
          created_at: string
          house_alarm_1: boolean
          house_alarm_2: boolean
          house_alarm_3: boolean
          id: string
          lounge_alarm_1: boolean
          lounge_alarm_2: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          chat_alarm_1: boolean
          created_at?: string
          house_alarm_1: boolean
          house_alarm_2: boolean
          house_alarm_3: boolean
          id?: string
          lounge_alarm_1: boolean
          lounge_alarm_2: boolean
          updated_at?: string
          user_id?: string
        }
        Update: {
          chat_alarm_1?: boolean
          created_at?: string
          house_alarm_1?: boolean
          house_alarm_2?: boolean
          house_alarm_3?: boolean
          id?: string
          lounge_alarm_1?: boolean
          lounge_alarm_2?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_alarm_setting_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_block: {
        Row: {
          block_id: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          block_id: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          block_id?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_block_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_friend: {
        Row: {
          created_at: string
          friend_id: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          friend_id?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          friend_id?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_friend_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_friend_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_lifestyle: {
        Row: {
          appeals: string[]
          created_at: string
          id: string
          pet: number
          smoking: boolean
          updated_at: string | null
        }
        Insert: {
          appeals: string[]
          created_at?: string
          id: string
          pet: number
          smoking: boolean
          updated_at?: string | null
        }
        Update: {
          appeals?: string[]
          created_at?: string
          id?: string
          pet?: number
          smoking?: boolean
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_lifestyle_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_looking_house: {
        Row: {
          created_at: string
          deposit_price: number
          id: string
          monthly_rental_price: number
          regions: string[]
          rental_type: number
          term: number[]
          type: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deposit_price: number
          id: string
          monthly_rental_price: number
          regions: string[]
          rental_type: number
          term: number[]
          type: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deposit_price?: number
          id?: string
          monthly_rental_price?: number
          regions?: string[]
          rental_type?: number
          term?: number[]
          type?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_looking_house_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_mate_style: {
        Row: {
          created_at: string
          gender: number
          id: string
          mate_appeals: string[] | null
          mates_number: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          gender: number
          id: string
          mate_appeals?: string[] | null
          mates_number: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          gender?: number
          id?: string
          mate_appeals?: string[] | null
          mates_number?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_mate_style_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user_theme: {
        Row: {
          created_at: string
          font_size: number
          id: string
          languague: number
          theme: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          font_size: number
          id?: string
          languague: number
          theme: number
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          font_size?: number
          id?: string
          languague?: number
          theme?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_theme_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
