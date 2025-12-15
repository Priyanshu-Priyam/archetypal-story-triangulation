'use client';

import { useState, useEffect } from 'react';
import { ArchetypalAnalysis } from '@/lib/types';

export default function Home() {
  const [storyInput, setStoryInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [analysis, setAnalysis] = useState<ArchetypalAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('anthropic_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('anthropic_api_key', apiKey.trim());
      setShowApiKeyInput(false);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('anthropic_api_key');
    setApiKey('');
    setShowApiKeyInput(true);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyInput.trim() || !apiKey.trim()) return;

    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storyName: storyInput.trim(),
          apiKey: apiKey.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          clearApiKey();
        }
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-12 flex flex-col">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
          Archetypal Story Triangulation
        </h1>
        <p className="text-gray-600 italic max-w-2xl mx-auto text-lg">
          "Stories persist through structural invariants, not word-level fidelity."
        </p>
        <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto">
          Enter any myth, epic, folklore, or narrative. The system will triangulate across known versions 
          to extract archetypal roles, tensions, invariants, and permissible variations.
        </p>
      </header>

      {/* API Key Configuration */}
      {showApiKeyInput ? (
        <section className="mb-8 max-w-xl mx-auto w-full">
          <div className="border border-gray-300 p-6 bg-gray-50">
            <h2 className="font-bold text-gray-900 mb-2">Configure API Key</h2>
            <p className="text-sm text-gray-600 mb-4">
              This system uses Claude 3.5 Sonnet to perform dynamic archetypal analysis.
              Your key is stored locally in your browser.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-3 border border-gray-300 focus:border-gray-800 outline-none bg-white font-mono text-sm"
            />
            <button
              onClick={saveApiKey}
              disabled={!apiKey.trim()}
              className="mt-3 w-full py-3 bg-gray-900 text-white text-sm tracking-wide uppercase disabled:opacity-50 hover:bg-gray-700 transition-colors"
            >
              Save API Key
            </button>
          </div>
        </section>
      ) : (
        <div className="text-center mb-6">
          <button
            onClick={() => setShowApiKeyInput(true)}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Change API Key
          </button>
        </div>
      )}

      {/* Story Input */}
      <section className="mb-12">
        <form onSubmit={handleAnalyze} className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={storyInput}
            onChange={(e) => setStoryInput(e.target.value)}
            placeholder="Enter a myth or story (e.g., Ramayana, Odyssey, Prometheus, King Arthur...)"
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 focus:border-gray-800 outline-none transition-colors bg-transparent placeholder:italic placeholder:text-gray-400"
            disabled={loading || showApiKeyInput}
          />
          <button
            type="submit"
            disabled={loading || !storyInput.trim() || showApiKeyInput}
            className="absolute right-3 top-3 bottom-3 px-6 bg-gray-900 text-white text-sm tracking-wide uppercase disabled:opacity-50 hover:bg-gray-700 transition-colors"
            >
            {loading ? 'Triangulating...' : 'Analyze'}
          </button>
        </form>
        {error && (
          <p className="text-red-600 text-center mt-4 text-sm">{error}</p>
        )}
      </section>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600 italic">
            Triangulating across versions...
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Extracting roles, tensions, topology, invariants...
          </p>
        </div>
      )}

      {/* Analysis Output */}
      {analysis && !loading && (
        <div className="space-y-12 pb-24 animate-in fade-in duration-500">
          
          {/* Archetypal Core */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-200 pb-2">
              01. Archetypal Core
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Roles</h3>
                <ul className="space-y-4">
                  {analysis.archetypalCore.roles.map((role, idx) => (
                    <li key={idx} className="bg-gray-50 p-4 border-l-2 border-gray-300">
                      <div className="font-bold text-gray-900">{role.name}</div>
                      <div className="text-gray-600 text-sm mt-1 mb-2">{role.description}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">
                        Ex: {role.examples.join(', ')}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Tensions</h3>
                  <ul className="space-y-4">
                    {analysis.archetypalCore.tensions.map((tension, idx) => (
                      <li key={idx}>
                        <div className="font-semibold text-gray-800">↔ {tension.axis}</div>
                        <div className="text-gray-600 text-sm mt-1">{tension.description}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Narrative Topology</h3>
                  <div className="p-4 border border-dashed border-gray-300 bg-gray-50/50">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 mb-4">
                      {analysis.archetypalCore.narrativeTopology.nodes.map((node, i) => (
                        <span key={i} className="flex items-center">
                          <span className="font-bold bg-white px-2 py-1 border border-gray-200">{node}</span>
                          {i < analysis.archetypalCore.narrativeTopology.nodes.length - 1 && (
                            <span className="mx-2 text-gray-400">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      {analysis.archetypalCore.narrativeTopology.structureDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Invariant Structure */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-200 pb-2">
              02. Invariant Structure
            </h2>
            <div className="bg-gray-900 text-gray-100 p-8 shadow-xl">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">What must remain true</p>
              <ul className="space-y-3 list-disc list-inside">
                {analysis.invariantStructure.invariants.map((inv, idx) => (
                  <li key={idx} className="text-lg leading-relaxed text-gray-300">
                    {inv}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Variation & Boundary */}
          <section className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-200 pb-2">
                03. Variation Envelope
              </h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Allowed Deformations</h4>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-gray-600 text-sm">
                    {analysis.variationEnvelope.allowedDeformations.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">High-Variance Zones</h4>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-gray-600 text-sm">
                    {analysis.variationEnvelope.highVarianceZones.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-red-400 mb-6 border-b border-red-100 pb-2">
                04. Boundary Analysis
              </h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Archetypal Ruptures</h4>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-red-700 text-sm">
                    {analysis.boundaryAnalysis.boundaryBreakers.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Pushing the Boundary</h4>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-gray-600 text-sm">
                    {analysis.boundaryAnalysis.pushingTheBoundary.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Insight */}
          <section className="text-center max-w-2xl mx-auto pt-8 border-t border-gray-200">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
              05. Interpretive Insight
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 italic">
              "{analysis.interpretiveInsight}"
            </p>
          </section>

        </div>
      )}
      </main>
  );
}
