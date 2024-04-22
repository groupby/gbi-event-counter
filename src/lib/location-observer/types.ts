export type LocationChangeListener = (location: Location) => void;

export interface LocationObserver {
  subscribe(callback: LocationChangeListener): () => void;
}
