export type LocationChangeListener = (
  location: Location,
  source: string,
) => void;

export interface LocationObserver {
  subscribe(callback: LocationChangeListener): () => void;
}
