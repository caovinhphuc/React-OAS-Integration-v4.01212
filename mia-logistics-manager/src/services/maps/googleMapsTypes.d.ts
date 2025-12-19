// src/services/maps/googleMapsTypes.d.ts
// Type definitions for Google Maps API

declare namespace google {
  namespace maps {
    class Geocoder {
      geocode(
        request: GeocoderRequest,
        callback: (
          results: GeocoderResult[] | null,
          status: GeocoderStatus
        ) => void
      ): void;
    }

    class DistanceMatrixService {
      getDistanceMatrix(
        request: DistanceMatrixRequest,
        callback: (
          response: DistanceMatrixResponse | null,
          status: DistanceMatrixStatus
        ) => void
      ): void;
    }

    class DirectionsService {
      route(
        request: DirectionsRequest,
        callback: (
          result: DirectionsResult | null,
          status: DirectionsStatus
        ) => void
      ): void;
    }

    namespace places {
      class PlacesService {
        constructor(attrContainer: HTMLElement | null);
        textSearch(
          request: TextSearchRequest,
          callback: (
            results: PlaceResult[] | null,
            status: PlacesServiceStatus
          ) => void
        ): void;
      }

      enum PlacesServiceStatus {
        OK = "OK",
        ZERO_RESULTS = "ZERO_RESULTS",
        OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
        REQUEST_DENIED = "REQUEST_DENIED",
        INVALID_REQUEST = "INVALID_REQUEST",
      }
    }

    enum TravelMode {
      DRIVING = "DRIVING",
      WALKING = "WALKING",
      BICYCLING = "BICYCLING",
      TRANSIT = "TRANSIT",
    }

    enum UnitSystem {
      METRIC = 1,
      IMPERIAL = 0,
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    interface GeocoderRequest {
      address?: string;
      location?: LatLng;
      placeId?: string;
    }

    interface GeocoderResult {
      geometry: {
        location: LatLng;
      };
      formatted_address: string;
    }

    enum GeocoderStatus {
      OK = "OK",
      ZERO_RESULTS = "ZERO_RESULTS",
      OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
      REQUEST_DENIED = "REQUEST_DENIED",
      INVALID_REQUEST = "INVALID_REQUEST",
    }

    interface DistanceMatrixRequest {
      origins: LatLng[] | string[];
      destinations: LatLng[] | string[];
      travelMode: TravelMode;
      unitSystem: UnitSystem;
    }

    interface DistanceMatrixResponse {
      rows: DistanceMatrixResponseRow[];
    }

    interface DistanceMatrixResponseRow {
      elements: DistanceMatrixResponseElement[];
    }

    interface DistanceMatrixResponseElement {
      distance: { value: number; text: string };
      duration: { value: number; text: string };
      status: DistanceMatrixElementStatus;
    }

    enum DistanceMatrixStatus {
      OK = "OK",
      INVALID_REQUEST = "INVALID_REQUEST",
      MAX_ELEMENTS_EXCEEDED = "MAX_ELEMENTS_EXCEEDED",
      MAX_DIMENSIONS_EXCEEDED = "MAX_DIMENSIONS_EXCEEDED",
      OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
      REQUEST_DENIED = "REQUEST_DENIED",
      UNKNOWN_ERROR = "UNKNOWN_ERROR",
    }

    enum DistanceMatrixElementStatus {
      OK = "OK",
      NOT_FOUND = "NOT_FOUND",
      ZERO_RESULTS = "ZERO_RESULTS",
    }

    interface DirectionsRequest {
      origin: LatLng | string;
      destination: LatLng | string;
      travelMode: TravelMode;
    }

    interface DirectionsResult {
      routes: DirectionsRoute[];
    }

    interface DirectionsRoute {
      legs: DirectionsLeg[];
    }

    interface DirectionsLeg {
      distance: { value: number; text: string };
      duration: { value: number; text: string };
      start_address: string;
      end_address: string;
    }

    enum DirectionsStatus {
      OK = "OK",
      NOT_FOUND = "NOT_FOUND",
      ZERO_RESULTS = "ZERO_RESULTS",
      MAX_WAYPOINTS_EXCEEDED = "MAX_WAYPOINTS_EXCEEDED",
      INVALID_REQUEST = "INVALID_REQUEST",
      OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
      REQUEST_DENIED = "REQUEST_DENIED",
      UNKNOWN_ERROR = "UNKNOWN_ERROR",
    }

    interface TextSearchRequest {
      query: string;
      location?: LatLng;
      radius?: number;
    }

    interface PlaceResult {
      place_id: string;
      name: string;
      formatted_address: string;
      geometry: {
        location: LatLng;
      };
    }
  }
}
