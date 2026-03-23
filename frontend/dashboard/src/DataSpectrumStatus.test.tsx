import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataSpectrumStatus } from './DataSpectrumStatus';

describe('DataSpectrumStatus Component', () => {
  it('renders correctly with currentTier = 3', () => {
    render(<DataSpectrumStatus currentTier={3} />);

    // Updated search string to match the actual component text
    expect(screen.getByText('Data Spectrum Progress')).toBeInTheDocument();
    
    // Check elements for correct class application 
    const tier1Title = screen.getByText(/Tier 1: API Ingestion/i);
    const tier4Title = screen.getByText(/Tier 4: Proactive Alerts/i);
    
    expect(tier1Title.className).toContain('text-slate-800'); // Completed styling text
    expect(tier4Title.className).toContain('text-slate-500'); // Pending styling text
  });
});


