import { TripStateManager } from '../../backend/state_manager/TripStateManager.js';

export interface Alert {
  type: 'critical' | 'warning' | 'info';
  message: string;
  source: string;
  timestamp: string;
  resolved: boolean;
}

export class ProactiveAlertEngine {
  private stateManager: TripStateManager;

  constructor() {
    this.stateManager = new TripStateManager();
  }

  /**
   * Scans Tier 1 raw data and Tier 3 synthesis for logistical delta changes.
   */
  public async scanForAlerts(): Promise<void> {
    const currentState = await this.stateManager.read();

    if (!currentState.tier_1_raw || !currentState.tier_3_logistics) {
      throw new Error('Alert scan failed: Tier 1 and Tier 3 data are required.');
    }

    const { tier_1_raw, tier_3_logistics } = currentState;
    const alerts: Alert[] = [];

    console.log(`Scanning for proactive alerts for Trip ID: ${currentState.trip_id}...`);

    // 1. Check for Flight Status conflicts in Tier 1
    const flights = (tier_1_raw as any).flights || [];
    flights.forEach((f: any) => {
      if (f.status === 'Delayed' || f.status === 'Cancelled') {
        alerts.push({
          type: 'critical',
          message: `Flight ${f.flight_number} is currently ${f.status}. Check arrival impact.`,
          source: 'Tier 1 API Ingestion',
          timestamp: new Date().toISOString(),
          resolved: false
        });
      }
    });

    // 2. Check for Duration Conflicts (Tier 2 NLP vs Tier 3 Itinerary)
    const durationDays = currentState.tier_2_nlp?.parameters?.duration_days || 0;
    const hotelItem = tier_3_logistics.itinerary.find((i: any) => i.type === 'hotel');
    
    if (hotelItem) {
      const hotelDuration = (new Date(hotelItem.end_date).getTime() - new Date(hotelItem.start_date).getTime()) / (1000 * 3600 * 24);
      if (hotelDuration !== durationDays) {
        alerts.push({
          type: 'warning',
          message: `Itinerary hotel stay duration (${hotelDuration} days) does not match requested duration (${durationDays} days).`,
          source: 'Logistics Synthesis Engine',
          timestamp: new Date().toISOString(),
          resolved: false
        });
      }
    }

    // 3. Informational Alert: Optimization Score
    const score = currentState.tier_3_logistics.cost_audit?.optimization_metadata?.score;
    if (score && score < 80) {
      alerts.push({
        type: 'info',
        message: `Your trip optimization score is ${score}. Consider reviewing for cost alternatives.`,
        source: 'Optimization Algorithm',
        timestamp: new Date().toISOString(),
        resolved: false
      });
    }

    console.log(`✅ Alert scan complete. Generated ${alerts.length} alerts.`);

    // 4. Update state to Tier 4
    await this.stateManager.updateTierData(4, alerts);
    
    console.log('✅ Tier 4 Proactive Alert Logic Complete.');
  }
}
