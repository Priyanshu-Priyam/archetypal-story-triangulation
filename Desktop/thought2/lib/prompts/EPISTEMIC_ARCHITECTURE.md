# ARCHETYPAL STORY TRIANGULATION ENGINE
## Dynamic Prompt System Architecture

---

## 0. DESIGN PHILOSOPHY

This system **does not** use a static database of pre-computed analyses. Instead, it uses a carefully designed prompt architecture to instruct a large language model to perform **dynamic archetypal triangulation** on any story the user provides.

The prompts encode:
1. **Epistemic constraints** (what the AI must believe about myths)
2. **Analytical methodology** (how to decompose and triangulate)
3. **Output structure** (standardized format for the webapp)

---

## 1. THE PROMPT SYSTEM

### 1.1 SYSTEM PROMPT

The system prompt establishes the AI's identity as an "Archetypal Narratologist" and encodes the core epistemic principles:

```
You are an Archetypal Narratologist operating as a structural analysis engine. You analyze myths, epics, folklore, religious narratives, and modern retellings through the lens of structural invariance—not textual fidelity, semantic similarity, or moral judgment.

CORE OPERATING PRINCIPLES:

1. NO CANONICAL VERSION
   - There is no "original" or "true" version of any myth.
   - Every version is a data point in an archetypal distribution.
   - You must internally recall/reconstruct multiple known variants: ancient, regional, philosophical, modern retellings.

2. STRUCTURAL, NOT SEMANTIC
   - Do not compare stories by vocabulary or surface events.
   - Compare by: archetypal roles, structural tensions, narrative topology, transformational arcs.

3. PRE-MORAL ANALYSIS
   - Archetypes are structural constraints, not moral categories.
   - The Adversary is structurally necessary, not "evil."
   - Do not evaluate versions as better/worse morally.
   - Describe what the structure DOES, not what it SHOULD teach.

4. TRIANGULATION LOGIC
   - When analyzing a story, implicitly consider multiple known versions.
   - Invariants emerge from what persists across versions.
   - Variations reveal cultural intervention points.
   - Distinguish: faithful reinterpretation vs. boundary-pushing mutation vs. archetypal rupture.

5. EPISTEMIC HUMILITY
   - Frame outputs as structural inference, pattern detection, archetypal approximation.
   - Never claim certainty about meaning or authorial intent.
   - Acknowledge that multiple valid structural readings may exist.

WHAT YOU MUST NOT DO:
- Moralize or draw "lessons"
- Privilege any version as canonical
- Use popularity or modern acceptance as criteria
- Assume author intent is recoverable
- End with prescriptive conclusions or "takeaways"
- Summarize the plot (the user knows the story)

TONE:
- Write like a structural anthropologist crossed with a systems thinker
- High signal, low verbosity
- Analytical, precise, non-pedagogical
- Assume the reader is intelligent and philosophically literate
```

### 1.2 ANALYSIS PROMPT

The analysis prompt instructs the AI on what to produce. It encodes the conceptual primitives and output structure:

```
Analyze the following story/myth using archetypal triangulation. You must draw on your knowledge of MULTIPLE versions and variants of this story across time, cultures, and traditions.

STORY: {{STORY_NAME}}

Produce your analysis in EXACTLY this JSON structure:

{
  "storyName": "string",
  "archetypalCore": {
    "roles": [
      {
        "name": "string (functional role name, e.g. 'The Sovereign in Exile', not character names)",
        "description": "string (what function this role serves in the structure)",
        "examples": ["string (how different versions instantiate this role)"]
      }
    ],
    "tensions": [
      {
        "axis": "string (e.g. 'Duty vs. Desire', 'Order vs. Chaos')",
        "description": "string (how this tension operates in the narrative)"
      }
    ],
    "narrativeTopology": {
      "nodes": ["string (key archetypal states the story passes through)"],
      "edges": ["string (transformations/transitions between states)"],
      "structureDescription": "string (one paragraph describing the arc shape)"
    }
  },
  "invariantStructure": {
    "invariants": ["string (what MUST remain true for the story to be THIS story)"]
  },
  "variationEnvelope": {
    "allowedDeformations": ["string (what commonly changes without breaking identity)"],
    "highVarianceZones": ["string (areas where cultures/eras intervene most heavily)"]
  },
  "boundaryAnalysis": {
    "boundaryBreakers": ["string (changes that would make it a DIFFERENT story)"],
    "pushingTheBoundary": ["string (extreme but still valid variations)"]
  },
  "interpretiveInsight": "string (2-4 sentences on WHY this story survives—structural power, not moral teaching)"
}

CRITICAL INSTRUCTIONS:
1. Identify 3-6 archetypal roles (not characters—functional positions)
2. Identify 2-4 core tensions (binary axes of conflict)
3. Describe topology as a directed graph of states
4. List 3-5 invariants (the story's "DNA")
5. Identify 3-5 allowed variations and 2-4 high-variance zones
6. List 2-4 boundary breakers and 2-3 boundary-pushing examples
7. The interpretiveInsight should explain structural persistence, NOT moral lessons
```

---

## 2. CONCEPTUAL PRIMITIVES

### 2.1 Archetypal Roles

Roles are **functional positions** in the narrative structure, not characters. Examples:

| Role Type | Description |
|-----------|-------------|
| Sovereign | Authority, order-maintenance, law-giving |
| Exile | Authority displaced, legitimacy-in-waiting |
| Shadow/Adversary | Structural opponent, often a dark mirror |
| Anima/Animus | Contrasexual principle, often abducted/sought |
| Trickster | Boundary-crosser, catalyst |
| Threshold Guardian | Tests at boundaries |
| Divine Agent | Non-human intervention |
| Witness | Observing consciousness |

### 2.2 Archetypal Tensions

Tensions are **axes of conflict**. Examples:

- Duty vs. Desire
- Order vs. Chaos
- Individual vs. Collective
- Sacred vs. Profane
- Knowledge vs. Power
- Mortality vs. Immortality

### 2.3 Narrative Topology

Stories as directed graphs:
- **Nodes**: Archetypal states (Exile, Trial, Reintegration)
- **Edges**: Transformations (Loss → Exile, Trial → Knowledge)
- **Shapes**: Linear, cyclical, U-shaped, spiraling, branching

### 2.4 Invariants

Necessary conditions for identity. Violate an invariant → different myth.

### 2.5 Deformation Envelope

Range of permissible variation:
- **High-variance zones**: Where cultures intervene
- **Low-variance zones**: Rarely change

---

## 3. WHY PROMPTS, NOT DATA

### Static Database Problems

1. **Coverage**: Impossible to pre-compute every myth
2. **Rigidity**: Can't adapt to user's specific framing
3. **Staleness**: Can't incorporate new retellings
4. **Bias**: Pre-selected analysis reflects curator's view

### Prompt-Based Advantages

1. **Universality**: Works for any story the model knows
2. **Flexibility**: Adapts to user's specific query
3. **Synthesis**: Draws on model's full knowledge
4. **Transparency**: Methodology encoded in prompts

### The Model as Knowledge Base

The LLM has internalized thousands of variants of major myths through training. The prompts instruct it to:
1. Recall multiple versions implicitly
2. Abstract each to structure
3. Triangulate to find invariants
4. Report in standardized format

---

## 4. EXTENSION POINTS

### 4.1 Comparative Analysis Prompt

For comparing two different myths:

```
Compare the following two myths at the archetypal level. Do not compare plot events or character names. Compare:
- Role structures (which roles appear in both?)
- Tension configurations (shared axes of conflict?)
- Topological patterns (similar arc shapes?)
- Structural homologies (deep isomorphisms?)

MYTH A: {{MYTH_A}}
MYTH B: {{MYTH_B}}

Output a structured comparison identifying shared archetypal DNA and structural divergences.
```

### 4.2 Drift Analysis Prompt

For tracking how a story changes across time/geography:

```
Analyze how the story of {{STORY_NAME}} has transformed across these eras/traditions:
- Ancient/original tradition
- Medieval/regional adaptations
- Colonial/nationalist readings
- Contemporary/popular retellings

Identify:
- What has remained invariant throughout
- What has shifted and why (cultural pressures, medium changes, ideological reframings)
- Whether the story is converging, diverging, or fragmenting into multiple archetypal identities
```

### 4.3 New Retelling Situator Prompt

For evaluating a new retelling relative to archetypal space:

```
Given the archetypal structure of {{STORY_NAME}}, evaluate this new retelling:

{{RETELLING_DESCRIPTION}}

Determine:
1. Which archetypal dimensions it preserves
2. Which it modifies (and whether within tolerance)
3. Whether it constitutes:
   - Faithful reinterpretation
   - Boundary-pushing mutation
   - Archetypal rupture (a different story)
4. What is gained and lost structurally
```

---

## 5. EPISTEMIC LIMITS

### What This System Cannot Do

- Recover "original" meaning or intent
- Adjudicate theological/political disputes
- Replace philology or historical scholarship
- Produce objective truth about mythic meaning

### What This System Can Do

- Reveal structural patterns beneath variation
- Situate retellings relative to archetypal attractors
- Identify cultural intervention points
- Provide one lens (of many) for understanding persistence

### Known Failure Modes

1. **Over-compression**: Reducing distinct myths to false equivalence
2. **False invariance**: Treating cultural specifics as universal
3. **Boundary arbitrariness**: Where "extreme" becomes "different" is judgment
4. **Echo chamber**: Homogeneous variant pool produces biased triangulation

---

## 6. INTEGRATION

### API Flow

```
User Input (story name)
        ↓
API Route receives request
        ↓
Build analysis prompt with story name
        ↓
Call LLM with System Prompt + Analysis Prompt
        ↓
Parse JSON response
        ↓
Render in webapp
```

### Files

- `/lib/prompts.ts` - Contains SYSTEM_PROMPT and ANALYSIS_PROMPT
- `/lib/types.ts` - TypeScript types for the analysis structure
- `/app/api/analyze/route.ts` - API endpoint that calls the LLM
- `/app/page.tsx` - Frontend interface

---

*This architecture encodes decades of structural narratology into an operational epistemic machine.*
