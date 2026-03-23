import { TripStateManager } from '../../backend/state_manager/TripStateManager.js';
import { TripState } from '../../backend/state_manager/types/TripStateSchema.js';

export class FinancialValidator {
  private readonly SERVICE_FEE_RATE = 0.05; // 5%
  private readonly TAX_RATE = 0.10; // 10%

  /**
   * Audits the financial data in Tier 3 logistics.
   */
  public async audit(currentState: TripState): Promise<TripState> {
    const stateManager = new TripStateManager(currentState);

    if (!currentState.tier_3_logistics) {
      throw new Error('Audit failed: Tier 3 logistics data is required.');
    }

    const { itinerary, cost_audit } = currentState.tier_3_logistics;
    
    // 1. Verify base total against itinerary sum
    const itinerarySum = itinerary.reduce((sum: number, item: any) => sum + (item.price || 0), 0);
    const baseTotal = cost_audit.total_estimated_cost;
    
    let validationStatus: 'valid' | 'discrepancy_detected' = 'valid';
    if (itinerarySum !== baseTotal) {
      console.warn(`⚠️ Warning: Itinerary sum (${itinerarySum}) differs from base total (${baseTotal}).`);
      validationStatus = 'discrepancy_detected';
    }

    // 2. Calculate fees and taxes
    const serviceFee = baseTotal * this.SERVICE_FEE_RATE;
    const taxes = (baseTotal + serviceFee) * this.TAX_RATE;
    const grandTotal = baseTotal + serviceFee + taxes;

    const auditResult: any = {
      itinerary, // Preserve the itinerary
      cost_audit: {
        total_estimated_cost: grandTotal,
        currency: cost_audit.currency,
        details: cost_audit.details,
        financial_breakdown: {
          base_total: baseTotal,
          itinerary_sum: itinerarySum,
          service_fee: serviceFee,
          taxes: taxes,
          grand_total: grandTotal,
          validation_status: validationStatus,
          audit_timestamp: new Date().toISOString()
        }
      }
    };

    console.log(`✅ Financial Audit Complete for Trip: ${currentState.trip_id}`);
    console.log(`✅ Grand Total (Inc. Fees/Taxes): ${grandTotal.toFixed(2)} ${auditResult.cost_audit.currency}`);

    // 3. Update state to include the audited financial data (remain at Tier 3 status but update data)
    const newState = await stateManager.updateTierData(3, auditResult);
    
    console.log('✅ Tier 3 Financial Audit & Fee Validation Complete.');
    return newState;
  }
}

