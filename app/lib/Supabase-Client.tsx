import { createClient } from "@/utils/supabase/server"
import { UUID } from "crypto";

export interface User {
    Latitude_Longitude_Location: number[];
    bio: string;
    email: string;
    id: UUID;
    name: string;
    pfp: string;
    vendor_type: string;
    menus: string[];
    special_today: string;
    state: string;
    city: string;
    vendor: boolean;
    favorites: UUID[];
}

export const supabase = createClient();