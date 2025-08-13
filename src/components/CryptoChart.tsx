import { memo, useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

// Dynamic import for TradingView widget to avoid ES module issues
let TradingViewWidget: any = null;

const CryptoChart = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import the TradingView widget
    const loadWidget = async () => {
      try {
        const module = await import('react-tradingview-widget');
        TradingViewWidget = module.default || module;
        setWidgetLoaded(true);

        // Set loading false after widget is loaded
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
      } catch (err) {
        console.error('Failed to load TradingView widget:', err);
        setError(true);
        setIsLoading(false);
      }
    };

    loadWidget();
  }, []);

  if (isLoading) {
    return (
      <div className="glass-card p-3 sm:p-4 lg:p-6 rounded-lg animate-fade-in">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">Bitcoin Price</h2>
        </div>
        <div className="h-[250px] sm:h-[350px] lg:h-[400px] w-full bg-muted/20 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading Bitcoin chart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-3 sm:p-4 lg:p-6 rounded-lg animate-fade-in">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">Bitcoin Price</h2>
        </div>
        <div className="h-[250px] sm:h-[350px] lg:h-[400px] w-full bg-muted/20 rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <RefreshCw className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Unable to load chart</p>
            <button
              onClick={() => setIsLoading(true)}
              className="mt-2 text-primary underline text-sm"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-3 sm:p-4 lg:p-6 rounded-lg animate-fade-in">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Bitcoin Price</h2>
      </div>
      <div className="h-[250px] sm:h-[350px] lg:h-[400px] w-full">
        <TradingViewWidget
          symbol="BINANCE:BTCUSDT"
          theme="Dark"
          locale="en"
          autosize={true}
          hide_side_toolbar={false}
          allow_symbol_change={true}
          interval="D"
          toolbar_bg="#141413"
          enable_publishing={false}
          hide_top_toolbar={false}
          save_image={false}
          container_id="tradingview_chart_btc"
        />
      </div>
    </div>
  );
});

CryptoChart.displayName = 'CryptoChart';

export default CryptoChart;
