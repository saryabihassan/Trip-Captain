import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DataSpectrumStatus } from './DataSpectrumStatus';

describe('DataSpectrumStatus Component', () => {
  it('renders correctly with currentTier = 3', () => {
    render(<DataSpectrumStatus currentTier={3} />);

    expect(screen.getByText('Data Spectrum Status')).toBeInTheDocument();
    
    // Test that the check icons appear for completed tiers.
    // Tiers 1, 2, 3 should be marked complete. We'll search for the elements manually.
    const tier1Element = screen.getByText(/API Ingestion/i).closest('div');
    const tier4Element = screen.getByText(/Proactive Alerts/i).closest('div');
    
    expect(tier1Element?.className).toContain('text-blue-600'); // Completed styling
    expect(tier4Element?.className).toContain('text-gray-400'); // Pending styling
  });
});
