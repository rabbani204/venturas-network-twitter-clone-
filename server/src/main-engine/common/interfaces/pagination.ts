export interface PaginationResultInterfaceWithOption<PaginationEntity> {
  results: PaginationEntity[];
  page_total?: number;
  total: number;
  currentPage?: number;
  nextPage?: number;
  limit?: number;
  previousPage?: number;
  totalCourseCount?: number;
  option: any;
}
