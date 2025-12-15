import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT, buildAnalysisPrompt } from '@/lib/prompts';
import { ArchetypalAnalysis } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { storyName, apiKey } = await request.json();

    if (!storyName || typeof storyName !== 'string') {
      return NextResponse.json(
        { error: 'Story name is required' },
        { status: 400 }
      );
    }

    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    const analysisPrompt = buildAnalysisPrompt(storyName.trim());

    // Call Anthropic Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 8192,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: analysisPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Anthropic API error:', errorData);

      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: errorData.error?.message || 'Failed to analyze story. Please try again.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;

    if (!content) {
      return NextResponse.json(
        { error: 'No response from Claude' },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let analysis: ArchetypalAnalysis;
    try {
      // Clean potential markdown formatting
      let cleanedContent = content.trim();
      if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      }
      analysis = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', content);
      return NextResponse.json(
        { error: 'Failed to parse analysis. The response was malformed.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

