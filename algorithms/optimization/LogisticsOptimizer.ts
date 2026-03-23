import { TripStateManager } from '../../backend/state_manager/TripStateManager.js';

export interface OptimizationMetadata {
  optimization_type: 'chronological_cost';
  score: number;
  optimized_at: string;
}

export class LogisticsOptimizer {
  private stateManager: TripStateManager;

  constructor() {
    this.stateManager = new TripStateManager();
  }

  /**
   * Refines the synthesized itinerary for chronological efficiency and cost validation.
   */
  public async optimize(): Promise<void> {
    const currentState = await this.stateManager.read();

    if (!currentState.tier_3_logistics) {
      throw new Error('Optimization failed: Tier 3 logistics data is required.');
    }

    const { itinerary, cost_audit } = currentState.tier_3_logistics;
    
    console.log(`Optimizing itinerary for Trip ID: ${currentState.trip_id}...`);

    // 1. Sort itinerary items by start_date
    const optimizedItinerary = [...itinerary].sort((a, b) => {
      const dateA = new Date(a.start_date).getTime();
      const dateB = new Date(b.start_date).getTime();
      return dateA - dateB;
    });

    // 2. Optimization Logic: Calculate a simple score based on cost-per-day
    const duration = currentState.tier_2_nlp?.parameters?.duration_days || 1;
    const baseTotal = cost_audit.financial_breakdown?.base_total || cost_audit.total_estimated_cost;
    const costPerDay = baseTotal / duration;
    
    // Score calculation (e.g., lower cost-per-day relative to 200/day is better)
    const score = Math.max(0, 100 - (costPerDay / 10)); 

    const result: any = {
      itinerary: optimizedItinerary,
      cost_audit: {
        ...cost_audit,
        optimization_metadata: {
          optimization_type: 'chronological_cost',
          score: parseFloat(score.toFixed(2)),
          optimized_at: new Date().toISOString()
        }
      }
    };

    console.log('✅ Itinerary optimization complete.');
    console.log(`✅ Chronological sorting applied. Optimization Score: ${score.toFixed(2)}`);

    // 3. Update state (stay at Tier 3 but update the refined logistics)
    await this.stateManager.updateTierData(3, result);
    
    console.log('✅ Tier 3 Pathfinding & Optimization Complete.');
  }
}
