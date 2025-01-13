export interface IFindAll {
    where?: object;
}

export interface IFindAllPagination {
    page: number,
    pageSize: number,
    orderBy?: object[],
    where?: object
}

export interface ICount {
    where?: object;
}
