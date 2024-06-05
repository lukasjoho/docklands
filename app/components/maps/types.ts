export type GeoJSON = {
  type: string;
  properties: {
    cluster: boolean;
    location: any;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
};

export type SuperCluster = {
  getClusterExpansionZoom: (id: number) => number;
  getLeaves: (id: number) => GeoJSON[];
};
