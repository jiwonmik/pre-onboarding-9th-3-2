import { useQuery } from 'react-query';
import { IChart, IHistoricalData } from '../components/types';
import { fetchData } from '../api/api';

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
      fill: {
        opacity: 0.4,
      },
      xaxis: {
        categories: historicalData.map((data) => data.datetime),
      },
      yaxis: [
        {
          seriesName: 'Bar',
          opposite: true,

          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
          },
          title: {
            text: 'Bar',
          },
        },
        {
          seriesName: 'Area',
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
          },
          title: {
            text: 'Area',
          },
        },
      ],
    },
    series: [
      {
        name: 'Bar',
        data: historicalData.map((data) => data.value_bar),
        type: 'bar',
      },
      {
        name: 'Area',
        data: historicalData.map((data) => data.value_area),
        type: 'area',
      },
    ],
  };
  return { isLoading, isError, error, chartOptions };
}

export default useData;
