
export interface ArchetypalRole {
  name: string;
  description: string;
  examples: string[];
}

export interface ArchetypalTension {
  axis: string; // e.g. "Order vs Chaos"
  description: string;
}

export interface ArchetypalTransformation {
  from: string;
  to: string;
  mechanism: string;
}

export interface NarrativeTopology {
  nodes: string[]; // Key states
  edges: string[]; // Key transitions
  structureDescription: string;
}

export interface ArchetypalAnalysis {
  storyName: string;
  archetypalCore: {
    roles: ArchetypalRole[];
    tensions: ArchetypalTension[];
    narrativeTopology: NarrativeTopology;
  };
  invariantStructure: {
    invariants: string[]; // What must remain true
  };
  variationEnvelope: {
    allowedDeformations: string[]; // What commonly changes
    highVarianceZones: string[]; // Where cultures intervene
  };
  boundaryAnalysis: {
    boundaryBreakers: string[]; // Changes that break identity
    pushingTheBoundary: string[]; // Examples of extreme but valid changes
  };
  interpretiveInsight: string; // Structural synthesis
}

