export interface IStockDetails {
  _id: string;
  Company: string;
  LSID: number;
  ISIN: string;
  Ticker: string;
  // Extend with additional properties
}

export interface IQuest {
  name: string;
  rewardPoints: number;
  completion: number;
}

export interface IScrip {
  info: {
    isin: string;
    chartType: string;
    textMaxValue: string;
    textMinValue: string;
    plotlines: {
      label: string;
      value: number;
      align: string;
      y: number;
      id: string;
      color: string;
    }[];
    maxRange: number;
  };
  container: any;
  series: {
    intraday: {
      id: string;
      data: number[][];
      timeline: string;
      name: string;
      color: string;
      dataGrouping: {
        enabled: boolean;
        forced: boolean;
        approximation: string;
      };
    };
    history: {
      id: string;
      data: number[][];
      timeline: string;
      name: string;
      color: string;
      dataGrouping: {
        enabled: boolean;
      };
    };
  };
}
