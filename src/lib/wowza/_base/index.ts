export interface BasePaginationResult {
  pagination: {
    total_records: number;
    page: number;
    per_page: number;
    total_pages: number;
    page_first_index: number;
    page_last_index: number;
  };
}
