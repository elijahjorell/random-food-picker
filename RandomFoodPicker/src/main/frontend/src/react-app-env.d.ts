export interface Location {
    lat: number;
    lng: number;
}

export interface Northeast {
    lat: number;
    lng: number;
}

export interface Southwest {
    lat: number;
    lng: number;
}

export interface Viewport {
    northeast: Northeast;
    southwest: Southwest;
}

export interface Geometry {
    location: Location;
    viewport: Viewport;
}

export interface OpeningHours {
    open_now: boolean;
}

export interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}

export interface Candidate {
    formatted_address: string;
    geometry: Geometry;
    name: string;
    opening_hours: OpeningHours;
    photos: Photo[];
    rating: number;
}

export interface FindPlaceFromTextResponse {
    candidates: Candidate[];
    status: string;
}

export interface Location {
    lat: number;
    lng: number;
}

export interface Northeast {
    lat: number;
    lng: number;
}

export interface Southwest {
    lat: number;
    lng: number;
}

export interface Viewport {
    northeast: Northeast;
    southwest: Southwest;
}

export interface Geometry {
    location: Location;
    viewport: Viewport;
}

export interface OpeningHours {
    open_now: boolean;
}

export interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}

export interface PlusCode {
    compound_code: string;
    global_code: string;
}

export interface Result {
    business_status: string;
    geometry: Geometry;
    icon: string;
    name: string;
    opening_hours: OpeningHours;
    photos: Photo[];
    place_id: string;
    plus_code: PlusCode;
    price_level: number;
    rating: number;
    reference: string;
    scope: string;
    types: string[];
    user_ratings_total: number;
    vicinity: string;
    permanently_closed?: boolean;
}

export interface NearbySearchResponse {
    html_attributions: any[];
    next_page_token: string;
    results: Result[];
    status: string;
}


export interface Location {
    lat: number;
    lng: number;
}

export interface Northeast {
    lat: number;
    lng: number;
}

export interface Southwest {
    lat: number;
    lng: number;
}

export interface Viewport {
    northeast: Northeast;
    southwest: Southwest;
}

export interface Geometry {
    location: Location;
    viewport: Viewport;
}

export interface Photo {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}

export interface Result {
    formatted_address: string;
    geometry: Geometry;
    icon: string;
    name: string;
    photos: Photo[];
    place_id: string;
    reference: string;
    types: string[];
}

export interface TextSearchResponse {
    html_attributions: any[];
    results: Result[];
    status: string;
}

