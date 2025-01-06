

// Utility types
export interface AmountPaidProps {
  amountPaid: number;
  totalCost: number;
}

export type PaidPercentage = string;

export interface TotalCostProps {
  totalCost?: number;
  budget?: number;
}

export type UtilizationPercentage = string;

// Input for creating a budget tool
export interface CreateBudgetToolProps {
  visitorId: string;
}

// Input for creating a budget
export interface CreateBudgetInput {
  totalBudget: number;
  visitorId: string;
}

// Props for the BudgetItemsPanel component
export interface BudgetItemsPanelProps {
  /**
   * The unique identifier for the budget tool.
   */
  budgetToolId: string;
}

// Data structure for a single budget item
export interface BudgetItemData {
  id: string;
  itemName: string;
  category: string;
  estimatedCost: number;
  amountPaid: number;
  specialNotes?: string;
  isPaidInFull: boolean;
}

// Input for updating a budget item
export interface UpdateBudgetItemInput {
  itemName: string;
  category: string;
  estimatedCost: number;
  paidAmount: number;
  specialNotes?: string;
  isPaidInFull: boolean;
}

// Props for the BudgetItem component
export interface BudgetItemProps {
  itemId: string;
  itemName?: string;
  estimatedCost?: number;
  paidAmount?: number;
  category?: string;
  specialNotes?: string | null;
  onSave: (data: BudgetItemUpdateInput) => void;
  onDelete: (data: BudgetItemUpdateInput) => void;
}

// Input for the onSave and onDelete handlers in BudgetItem
export interface BudgetItemUpdateInput {
  itemName: string;
  estimatedCost: number;
  paidAmount: number;
  category: string;
  specialNotes?: string;
  isPaidInFull: boolean;
}



export interface BudgetItemPopupProps {
  isOpen: boolean;
  onClose: () => void;
  budgetToolId: string;
  onItemAdded?: () => void;
}
