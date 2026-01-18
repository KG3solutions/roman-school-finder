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
      districts: {
        Row: {
          id: string
          name: string
          county: string
          type: 'metro' | 'county' | null
          boundary: unknown | null
          avg_test_score_math: number | null
          avg_test_score_reading: number | null
          greatschools_rating: number | null
          median_home_price: number | null
          website: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          county: string
          type?: 'metro' | 'county' | null
          boundary?: unknown | null
          avg_test_score_math?: number | null
          avg_test_score_reading?: number | null
          greatschools_rating?: number | null
          median_home_price?: number | null
          website?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          county?: string
          type?: 'metro' | 'county' | null
          boundary?: unknown | null
          avg_test_score_math?: number | null
          avg_test_score_reading?: number | null
          greatschools_rating?: number | null
          median_home_price?: number | null
          website?: string | null
          created_at?: string | null
        }
      }
      schools: {
        Row: {
          id: string
          district_id: string | null
          name: string
          address: string | null
          lat: number
          lng: number
          boundary: unknown | null
          type: 'zoned' | 'magnet' | 'charter' | null
          grades_served: string | null
          is_elementary: boolean | null
          is_magnet: boolean | null
          is_charter: boolean | null
          is_stem: boolean | null
          is_montessori: boolean | null
          is_language_immersion: boolean | null
          magnet_focus: string | null
          language_program: string | null
          enrollment_deadline: string | null
          lottery_date: string | null
          application_url: string | null
          website: string | null
          phone: string | null
          image_url: string | null
          year_built: number | null
          student_count: number | null
          student_teacher_ratio: number | null
          greatschools_rating: number | null
          test_score_math: number | null
          test_score_reading: number | null
          free_lunch_pct: number | null
          transportation_provided: boolean | null
          before_after_care: boolean | null
          uniform_required: boolean | null
          calendar_type: 'traditional' | 'year-round' | 'modified' | null
          notes_admin: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          district_id?: string | null
          name: string
          address?: string | null
          lat: number
          lng: number
          boundary?: unknown | null
          type?: 'zoned' | 'magnet' | 'charter' | null
          grades_served?: string | null
          is_elementary?: boolean | null
          is_magnet?: boolean | null
          is_charter?: boolean | null
          is_stem?: boolean | null
          is_montessori?: boolean | null
          is_language_immersion?: boolean | null
          magnet_focus?: string | null
          language_program?: string | null
          enrollment_deadline?: string | null
          lottery_date?: string | null
          application_url?: string | null
          website?: string | null
          phone?: string | null
          image_url?: string | null
          year_built?: number | null
          student_count?: number | null
          student_teacher_ratio?: number | null
          greatschools_rating?: number | null
          test_score_math?: number | null
          test_score_reading?: number | null
          free_lunch_pct?: number | null
          transportation_provided?: boolean | null
          before_after_care?: boolean | null
          uniform_required?: boolean | null
          calendar_type?: 'traditional' | 'year-round' | 'modified' | null
          notes_admin?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          district_id?: string | null
          name?: string
          address?: string | null
          lat?: number
          lng?: number
          boundary?: unknown | null
          type?: 'zoned' | 'magnet' | 'charter' | null
          grades_served?: string | null
          is_elementary?: boolean | null
          is_magnet?: boolean | null
          is_charter?: boolean | null
          is_stem?: boolean | null
          is_montessori?: boolean | null
          is_language_immersion?: boolean | null
          magnet_focus?: string | null
          language_program?: string | null
          enrollment_deadline?: string | null
          lottery_date?: string | null
          application_url?: string | null
          website?: string | null
          phone?: string | null
          image_url?: string | null
          year_built?: number | null
          student_count?: number | null
          student_teacher_ratio?: number | null
          greatschools_rating?: number | null
          test_score_math?: number | null
          test_score_reading?: number | null
          free_lunch_pct?: number | null
          transportation_provided?: boolean | null
          before_after_care?: boolean | null
          uniform_required?: boolean | null
          calendar_type?: 'traditional' | 'year-round' | 'modified' | null
          notes_admin?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          display_name: string | null
          email: string | null
          avatar_url: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          display_name?: string | null
          email?: string | null
          avatar_url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          display_name?: string | null
          email?: string | null
          avatar_url?: string | null
          created_at?: string | null
        }
      }
      school_notes: {
        Row: {
          id: string
          school_id: string
          user_id: string
          content: string
          rating: number | null
          thumbs: 'up' | 'down' | null
          is_eliminated: boolean | null
          visited_date: string | null
          visit_scheduled: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          school_id: string
          user_id: string
          content: string
          rating?: number | null
          thumbs?: 'up' | 'down' | null
          is_eliminated?: boolean | null
          visited_date?: string | null
          visit_scheduled?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          school_id?: string
          user_id?: string
          content?: string
          rating?: number | null
          thumbs?: 'up' | 'down' | null
          is_eliminated?: boolean | null
          visited_date?: string | null
          visit_scheduled?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      saved_schools: {
        Row: {
          id: string
          user_id: string
          school_id: string
          list_type: 'favorite' | 'interested' | 'eliminated' | 'applied'
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          school_id: string
          list_type: 'favorite' | 'interested' | 'eliminated' | 'applied'
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          school_id?: string
          list_type?: 'favorite' | 'interested' | 'eliminated' | 'applied'
          created_at?: string | null
        }
      }
      real_estate_listings: {
        Row: {
          id: string
          address: string
          lat: number | null
          lng: number | null
          price: number | null
          beds: number | null
          baths: number | null
          sqft: number | null
          lot_sqft: number | null
          year_built: number | null
          listing_url: string | null
          image_url: string | null
          source: string | null
          source_email_date: string | null
          zoned_school_id: string | null
          status: 'active' | 'pending' | 'sold' | 'archived' | null
          is_favorited: boolean | null
          notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          address: string
          lat?: number | null
          lng?: number | null
          price?: number | null
          beds?: number | null
          baths?: number | null
          sqft?: number | null
          lot_sqft?: number | null
          year_built?: number | null
          listing_url?: string | null
          image_url?: string | null
          source?: string | null
          source_email_date?: string | null
          zoned_school_id?: string | null
          status?: 'active' | 'pending' | 'sold' | 'archived' | null
          is_favorited?: boolean | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          address?: string
          lat?: number | null
          lng?: number | null
          price?: number | null
          beds?: number | null
          baths?: number | null
          sqft?: number | null
          lot_sqft?: number | null
          year_built?: number | null
          listing_url?: string | null
          image_url?: string | null
          source?: string | null
          source_email_date?: string | null
          zoned_school_id?: string | null
          status?: 'active' | 'pending' | 'sold' | 'archived' | null
          is_favorited?: boolean | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      wiki_pages: {
        Row: {
          id: string
          slug: string
          title: string
          content: string
          category: 'mnps-rules' | 'lottery' | 'deadlines' | 'resources' | 'county-info'
          sort_order: number | null
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content: string
          category: 'mnps-rules' | 'lottery' | 'deadlines' | 'resources' | 'county-info'
          sort_order?: number | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          content?: string
          category?: 'mnps-rules' | 'lottery' | 'deadlines' | 'resources' | 'county-info'
          sort_order?: number | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
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
  }
}

// Helper types
export type School = Database['public']['Tables']['schools']['Row']
export type District = Database['public']['Tables']['districts']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type SchoolNote = Database['public']['Tables']['school_notes']['Row']
export type SavedSchool = Database['public']['Tables']['saved_schools']['Row']
export type RealEstateListing = Database['public']['Tables']['real_estate_listings']['Row']
export type WikiPage = Database['public']['Tables']['wiki_pages']['Row']
