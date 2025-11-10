import { FC, useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { useTheme } from '../providers/ThemeProvider';

export type ChartType = 'line' | 'candlestick' | 'bar' | 'area' | 'pie' | 'radar';

interface ChartProps {
  type: ChartType;
  data: number[] | Array<[number, number, number, number]>;  // For candlestick: [open, close, low, high]
  labels?: string[];
  title: string;
  className?: string;
  loading?: boolean;
}

const Chart: FC<ChartProps> = ({
  type,
  data,
  labels,
  title,
  className = '',
  loading = false,
}) => {
  const { theme } = useTheme();
  const chartRef = useRef<ReactECharts>(null);
  const [chartOptions, setChartOptions] = useState<EChartsOption>({});

  // Generate chart options based on type
  useEffect(() => {
    if (!data || data.length === 0) return;

    const isDark = theme === 'dark';
    const textColor = isDark ? '#E5E7EB' : '#374151';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const defaultLabels = labels || data.map((_, index) => `Point ${index + 1}`);

    const baseOptions: EChartsOption = {
      title: {
        text: title,
        textStyle: {
          color: textColor,
        },
      },
      tooltip: {
        trigger: type === 'pie' ? 'item' : 'axis',
        backgroundColor: isDark ? '#374151' : '#FFFFFF',
        borderColor: isDark ? '#4B5563' : '#E5E7EB',
        textStyle: {
          color: textColor,
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      animation: true,
      textStyle: {
        color: textColor,
      },
    };

    let specificOptions: EChartsOption = {};

    switch (type) {
      case 'candlestick':
        specificOptions = {
          xAxis: {
            type: 'category',
            data: defaultLabels,
            axisLine: { lineStyle: { color: gridColor } },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: gridColor } },
            splitLine: { lineStyle: { color: gridColor } },
          },
          series: [{
            type: 'candlestick',
            data: data as Array<[number, number, number, number]>,
          }],
        };
        break;

      case 'line':
      case 'area':
        specificOptions = {
          xAxis: {
            type: 'category',
            data: defaultLabels,
            axisLine: { lineStyle: { color: gridColor } },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: gridColor } },
            splitLine: { lineStyle: { color: gridColor } },
          },
          series: [{
            data: Array.isArray(data[0]) ? (data as Array<[number, number, number, number]>).map(d => d[1]) : data,
            type: 'line',
            smooth: true,
            areaStyle: type === 'area' ? { opacity: 0.3 } : undefined,
            animation: true,
          }],
        };
        break;

      case 'bar':
        specificOptions = {
          xAxis: {
            type: 'category',
            data: defaultLabels,
            axisLine: { lineStyle: { color: gridColor } },
          },
          yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: gridColor } },
            splitLine: { lineStyle: { color: gridColor } },
          },
          series: [{
            data,
            type: 'bar',
            animation: true,
          }],
        };
        break;

      case 'pie':
        specificOptions = {
          series: [{
            type: 'pie',
            radius: '50%',
            data: data.map((value, index) => ({
              value,
              name: defaultLabels[index],
            })),
            animation: true,
          }],
        };
        break;

      case 'radar':
        specificOptions = {
          radar: {
            indicator: defaultLabels.map((name, idx) => ({
              name,
              max: Math.max(
                ...data.map(d => Array.isArray(d) ? Math.max(...d) : d)
              ),
            })),
            axisLine: { lineStyle: { color: gridColor } },
            splitLine: { lineStyle: { color: gridColor } },
          },
          series: [{
            type: 'radar',
            data: [{
              value: data,
              name: title,
            }],
            animation: true,
          }],
        };
        break;
    }

    setChartOptions({ ...baseOptions, ...specificOptions });
  }, [type, data, labels, title, theme]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className={`w-full h-[400px] flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data || data?.length === 0) {
    return (
      <div className={`w-full h-[400px] flex items-center justify-center ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className={`w-full h-[400px] ${className}`}>
      <ReactECharts
        ref={chartRef}
        option={chartOptions}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};

export default Chart;