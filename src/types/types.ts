export interface IResponse {
  [key: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
}

export interface IChart {
  type: string;
  version: number;
  response: IResponse[];
}

export interface IHistoricalData {
  datetime: string;
  id: string;
  value_area: number;
  value_bar: number;
}
