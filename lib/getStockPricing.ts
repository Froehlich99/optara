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

export async function getStockPricing(lsid: string) {
  const response = await fetch(
    `https://www.ls-tc.de/_rpc/json/instrument/chart/dataForInstrument?instrumentId=${lsid}`
  );

  if (!response.ok) {
    console.error("HTTP error", response.status);
    return null;
  } else {
    const priceData = await response.json();
    return priceData;
  }
}
