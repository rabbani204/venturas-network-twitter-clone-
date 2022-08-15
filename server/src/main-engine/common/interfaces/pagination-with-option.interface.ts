import { PaginationResultInterfaceWithOption } from './pagination';

export class PaginationWithOption<PaginationEntity> {
  public results: PaginationEntity[];
  public page_total: number;
  public total: number;
  public limit: number;
  public currentPage: number;
  public nextPage: number;
  public previousPage: number;
  public totalCourseCount: number;
  public option: any;

  constructor(
    paginationResults: PaginationResultInterfaceWithOption<PaginationEntity>,
  ) {
    const lastPage = Math.ceil(
      paginationResults.total / paginationResults.limit,
    );
    const nextPage =
      paginationResults.currentPage + 1 > lastPage
        ? null
        : paginationResults.currentPage + 1;
    const previousPage =
      paginationResults.currentPage - 1 < 1
        ? null
        : paginationResults.currentPage - 1;
    this.results = paginationResults.results;
    this.page_total =
      paginationResults && paginationResults.page_total
        ? paginationResults.page_total
        : paginationResults.results.length;
    this.total = paginationResults.total;
    this.previousPage = previousPage;
    this.currentPage = paginationResults.currentPage;
    this.nextPage = nextPage;
    this.limit = paginationResults.limit;
    this.totalCourseCount = paginationResults.totalCourseCount;
    this.option = paginationResults.option;
  }
}
