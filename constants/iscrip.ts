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
