export interface IPagingQuery {
  page?: number;
  page_size?: number;
}

export interface IGetCity extends IPagingQuery {
  id: number;
}

export interface IGetDistrictQuery extends IPagingQuery {
  city_id: number;
}

export interface IGetWardQuery extends IPagingQuery {
  district_id: number;
}
