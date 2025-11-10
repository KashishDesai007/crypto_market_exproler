import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb, Card, Descriptions, Skeleton, Select } from 'antd';
import { useCoinById, useCoinMarketChart } from 'src/queryModules/coingecko/queries';
import Chart from '@/components/Chart';
import { useTheme } from 'src/providers/ThemeProvider';
import { 
  Wallet, 
  CoinsIcon, 
  CircleDollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock 
} from 'lucide-react';
import { ArrowLeftOutlined } from '@ant-design/icons';

const getMarketData = (data: any) => [
  {
    label: "Market Cap",
    value: `$${data.market_data?.market_cap?.usd?.toLocaleString?.()}`,
    icon: <Wallet size={20} />
  },
  {
    label: "Circulating Supply",
    value: data.market_data?.circulating_supply?.toLocaleString?.(),
    icon: <CoinsIcon size={20} />
  },
  {
    label: "Total Supply",
    value: data.market_data?.total_supply?.toLocaleString?.(),
    icon: <CircleDollarSign size={20} />
  },
  {
    label: "High 24h",
    value: `$${data.market_data?.high_24h?.usd?.toLocaleString?.()}`,
    icon: <TrendingUp size={20} />
  },
  {
    label: "Low 24h",
    value: `$${data.market_data?.low_24h?.usd?.toLocaleString?.()}`,
    icon: <TrendingDown size={20} />
  },
  {
    label: "Last Updated",
    value: new Date(data.last_updated).toLocaleString(),
    icon: <Clock size={20} />
  }
];

const ChartControls: React.FC<{
  days: number;
  setDays: (days: number) => void;
  chartType: 'line' | 'candlestick' | 'bar' | 'area';
  setChartType: (type: 'line' | 'candlestick' | 'bar' | 'area') => void;
  isDark: boolean;
}> = ({ days, setDays, chartType, setChartType, isDark }) => {
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [showChartOptions, setShowChartOptions] = useState(false);
  const selectedTimeOption = timeOptions.find(option => option.value === days);
  const selectedChartOption = chartOptions.find(option => option.value === chartType);

  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-block">
        <button
          onClick={() => setShowChartOptions(!showChartOptions)}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm transition-all
            ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}
            ${showChartOptions ? 'ring-2 ring-blue-500' : ''}`}
        >
          <span>{selectedChartOption?.icon}</span>
          <span>{selectedChartOption?.label}</span>
        </button>
        
        {showChartOptions && (
          <div className={`absolute top-full left-0 mt-1 p-1 rounded-lg z-10 min-w-[120px]
            ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
            {chartOptions.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  setChartType(option.value);
                  setShowChartOptions(false);
                }}
                className={`w-full px-3 py-2 rounded-md text-left flex items-center gap-2 text-sm transition-colors
                  ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                  ${chartType === option.value ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative inline-block">
        <button
          onClick={() => setShowTimeOptions(!showTimeOptions)}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm transition-all
            ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}
            ${showTimeOptions ? 'ring-2 ring-blue-500' : ''}`}
        >
          <span>{selectedTimeOption?.label}</span>
        </button>
        
        {showTimeOptions && (
          <div className={`absolute top-full right-0 mt-1 p-1 rounded-lg z-10 min-w-[100px]
            ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} shadow-lg`}>
            {timeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  setDays(option.value);
                  setShowTimeOptions(false);
                }}
                className={`w-full px-3 py-2 rounded-md text-left text-sm transition-colors
                  ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                  ${days === option.value ? (isDark ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PriceChart: React.FC<{ id: string; days: number; setDays: (days: number) => void }> = ({ id, days, setDays }) => {
  const { data, isLoading } = useCoinMarketChart(id, days);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [chartType, setChartType] = useState<'line' | 'candlestick' | 'bar' | 'area'>('line');

  if (isLoading) return <Skeleton active />;
  if (!data?.prices) return null;

  const labels = data.prices.map(([timestamp]) => 
    new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      ...(days <= 1 && { hour: '2-digit', minute: '2-digit' })
    })
  );

  // Transform data based on chart type
  const chartData = chartType === 'candlestick' 
    ? data.prices.reduce((acc: Array<[number, number, number, number]>, [_, price], index, array) => {
        if (index % 24 === 0) {  // Group by 24 data points for daily candles
          const slice = array.slice(index, index + 24);
          if (slice.length > 0) {
            const prices = slice.map(([_, p]) => p);
            const open = prices[0];
            const close = prices[prices.length - 1];
            const high = Math.max(...prices);
            const low = Math.min(...prices);
            acc.push([open, close, low, high]);
          }
        }
        return acc;
      }, [])
    : data.prices.map(([_, price]) => price);

  return (
    <div className="space-y-4">
      <ChartControls 
        days={days}
        setDays={setDays}
        chartType={chartType}
        setChartType={setChartType}
        isDark={isDark}
      />
      <Chart
        type={chartType}
        data={chartData}
        labels={labels}
        title="Price History"
        className="h-[300px] w-full"
      />
    </div>
  );
};

const timeOptions = [
  { value: 1, label: '24h' },
  { value: 7, label: '7d' },
  { value: 30, label: '30d' },
  { value: 90, label: '90d' },
  { value: 365, label: '1y' }
];

const chartOptions = [
  { value: 'line' as const, label: 'Line', icon: '📈' },
  { value: 'candlestick' as const, label: 'Candlestick', icon: '📊' },
  { value: 'bar' as const, label: 'Bar', icon: '📊' },
  { value: 'area' as const, label: 'Area', icon: '📉' }
] as const;

export default function CoinDetailPage({ id }: { id: string }) {
  const [days, setDays] = useState(7);
  const { data, isLoading, isError } = useCoinById(id);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  console.log("data", data);
  
  return (
    <>
      <Head>
        <title>{data?.name ? `${data.name} – Crypto Market Explorer` : 'Crypto Market Explorer'}</title>
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-6 flex-1">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => window.history.back()}
            className={`p-2 rounded-lg transition-colors hover:bg-gray-800/50 ${
              isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'
            }`}
            aria-label="Go back"
          >
             <ArrowLeftOutlined />
          </button>
          <Breadcrumb 
            className={isDark ? 'text-gray-300' : 'text-gray-700'}
            items={[
              { 
                className:isDark ? 'text-gray-300' : 'text-gray-700',
                title: <Link href="/" className={`${isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'} transition-colors`} style={{color : isDark ? 'whitesmoke' : 'black'}}>
                  Home
                </Link>
              }, 
              { 
                className:isDark ? 'text-gray-300' : 'text-gray-700',
                title: data?.name ?? 'Loading'
              }
            ]}
          />
          </div>
        <div className="glass p-5 rounded-2xl">
          {isLoading && <Skeleton active avatar paragraph={{ rows: 6 }} />}
          {isError && <div className="text-gray-300">Failed to load coin details.</div>}
          {data && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                {/* Logo and Basic Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={typeof data.image === 'string' ? data.image : (data.image?.large || data.image?.small || '')}
                      alt={data.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{data.name}</div>
                    <div className="text-gray-400 uppercase">{data.symbol}</div>
                  </div>
                </div>

                {/* Chart Section */}
                <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                  <PriceChart id={id} days={days} setDays={setDays} />
                </div>
              </div>

              {/* Market Data */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getMarketData(data).map((item, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg ${
                        isDark ? 'bg-gray-800/50' : 'bg-gray-50'
                      } transition-all duration-300 hover:scale-[1.02] border border-transparent
                      hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                          {item.icon}
                        </span>
                        <div className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {item.label}
                        </div>
                      </div>
                      <div className={`text-base font-medium ${
                        isDark ? 'text-gray-200' : 'text-gray-900'
                      }`}>
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Description Card */}
        {data?.description?.en && (
          <div className="mt-6 glass p-5 rounded-2xl">
            <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
              About {data.name}
            </h3>
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              <div 
                className={`prose max-w-none ${isDark ? 'prose-invert' : ''} 
                  [&>a]:text-blue-500 [&>a]:no-underline hover:[&>a]:underline
                  [&>p]:text-base ${isDark ? '[&>p]:text-gray-300' : '[&>p]:text-gray-700'}`
                }
                dangerouslySetInnerHTML={{ __html: data.description.en }} 
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  return { props: { id: ctx.params.id } };
}


