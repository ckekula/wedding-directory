export interface CategoryDropdownProps {
    category: string;
    isExpanded: boolean;
    onToggle: (category: string) => void;
    loading: boolean;
    vendors: Array<{
      id: string;
      offering: {
        id: string;
        name: string;
        category: string;
        banner: string;
        vendor: {
          busname: string;
          city: string;
        };
      };
    }>;
  }