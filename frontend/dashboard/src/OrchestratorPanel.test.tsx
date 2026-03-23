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

    // Look for partial match since it has an icon inside the h2
    expect(screen.getByText(/AI Orchestrator/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Persona/i)).toBeInTheDocument();
    expect(screen.getByText(/Trip Intent/i)).toBeInTheDocument();
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

    // Find the button (it doesn't have the text 'Orchestrating...' anymore, it has a spinner div)
    // We can find it by checking if a button is disabled
    const buttons = screen.getAllByRole('button');
    // The last button is the submit button
    const submitButton = buttons[buttons.length - 1];
    expect(submitButton).toBeDisabled();
  });
});

