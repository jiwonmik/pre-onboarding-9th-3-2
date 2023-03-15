import { useQuery } from 'react-query';
import { IChart, IHistoricalData } from '../types/types';
import { fetchData } from '../api/api';
import { AREA_SERIES, AREA_TYPE, BAR_SERIRES, BAR_TYPE } from '../consts/chart.const';

function useData() {
  const { isLoading, isError, data, error } = useQuery<IChart, Error>('flexsys', fetchData);

  const historicalData = data
    ? (Object.entries(data!.response).map(([time, data]) => {
        return { datetime: time, ...data };
      }) as IHistoricalData[])
    : [];

  // TODO: 필터링
  const regions = [...new Set(historicalData.map((data) => data.id))];

  const chartOptions = {
    options: {
      chart: {
        id: 'flexsys',
        // toolbar: {
        //   show: false,
        // },
      },
      title: {
        text: 'Flexsys',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [0, 2, 5],
      },
      colors: ['#008FFB', '#FEAF1A'],
      fill: {
        opacity: 0.7,
      },
      xaxis: {
        categories: historicalData.map((data) =>
          new Date(data.datetime).toLocaleTimeString('en-US')
        ),
      },
      yaxis: [
        {
          seriesName: BAR_SERIRES,
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB',
          },
          title: {
            text: BAR_SERIRES,
            style: {
              color: '#008FFB',
            },
          },
          labels: {
            style: {
              colors: ['#008FFB'],
            },
          },
        },
        {
          seriesName: AREA_SERIES,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEAF1A',
          },
          title: {
            text: AREA_SERIES,
            style: {
              color: '#FEAF1A',
            },
          },
          labels: {
            style: {
              colors: ['#FEAF1A'],
            },
          },
        },
      ],
    },
    series: [
      {
        name: BAR_SERIRES,
        data: historicalData.map((data) => data.value_bar),
        type: BAR_TYPE,
      },
      {
        name: AREA_SERIES,
        data: historicalData.map((data) => data.value_area),
        type: AREA_TYPE,
      },
    ],
  };
  return { isLoading, isError, error, chartOptions };
}

export default useData;
