import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OrchestratorPanel } from './OrchestratorPanel';

describe('OrchestratorPanel Component', () => {
  it('renders the component properly', () => {
    render(
      <OrchestratorPanel 
        prompt=""
        setPrompt={() => {}}
        persona="Luxury"
        setPersona={() => {}}
        loading={false}
        error={null}
        onSubmit={() => {}}
      />
    );

    expect(screen.getByText('Orchestrator')).toBeInTheDocument();
    expect(screen.getByText('Persona')).toBeInTheDocument();
    expect(screen.getByText('User Intent')).toBeInTheDocument();
    expect(screen.getByText('Run Sequence')).toBeInTheDocument();
  });

  it('handles persona selection', () => {
    const setPersonaMock = vi.fn();
    render(
      <OrchestratorPanel 
        prompt=""
        setPrompt={() => {}}
        persona="Luxury"
        setPersona={setPersonaMock}
        loading={false}
        error={null}
        onSubmit={() => {}}
      />
    );

    const budgetButton = screen.getByText('Budget');
    fireEvent.click(budgetButton);
    expect(setPersonaMock).toHaveBeenCalledWith('Budget');
  });

  it('disables the button when loading', () => {
    render(
      <OrchestratorPanel 
        prompt=""
        setPrompt={() => {}}
        persona="Luxury"
        setPersona={() => {}}
        loading={true}
        error={null}
        onSubmit={() => {}}
      />
    );

    const button = screen.getByRole('button', { name: /Orchestrating\.\.\./i });
    expect(button).toBeDisabled();
  });
});
