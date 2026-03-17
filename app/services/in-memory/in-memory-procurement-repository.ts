import type {
  ProcurementRunData,
  VendorOrder,
} from "@models/procurement";
import type { ProcurementRepository } from "@models/repository";

export class InMemoryProcurementRepository
  implements ProcurementRepository
{
  private readonly data: ProcurementRunData;
  private readonly confirmedIds = new Set<string>();

  constructor(seed: ProcurementRunData) {
    this.data = seed;
  }

  async getProcurementRun(): Promise<ProcurementRunData> {
    const remainingVendors = this.data.vendors.filter(
      (vendor) => !this.confirmedIds.has(vendor.id),
    );

    return {
      stats: {
        ...this.data.stats,
        purchaseOrderCount: remainingVendors.length,
        supplierCount: remainingVendors.length,
      },
      vendors: remainingVendors,
    };
  }

  async getVendorById(
    vendorId: string,
  ): Promise<VendorOrder | undefined> {
    return this.data.vendors.find(
      (vendor) => vendor.id === vendorId,
    );
  }

  async confirmVendor(vendorId: string): Promise<void> {
    this.confirmedIds.add(vendorId);
  }

  async getConfirmedVendorIds(): Promise<ReadonlySet<string>> {
    return new Set(this.confirmedIds);
  }
}
