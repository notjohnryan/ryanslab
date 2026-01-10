import React from 'react';
import { useGetStartupConfig, useGetUserBalance } from '~/data-provider';
import { useAuthContext, useLocalize } from '~/hooks';
import TokenCreditsItem from './TokenCreditsItem';
import AutoRefillSettings from './AutoRefillSettings';

function Balance() {
  const localize = useLocalize();
  const { isAuthenticated } = useAuthContext();
  const { data: startupConfig } = useGetStartupConfig();

  const balanceQuery = useGetUserBalance({
    enabled: !!isAuthenticated && !!startupConfig?.balance?.enabled,
  });
  const balanceData = balanceQuery.data;

  const {
    tokenCredits = 0,
    autoRefillEnabled = false,
    lastRefill,
    refillAmount,
    refillIntervalUnit,
    refillIntervalValue,
  } = balanceData ?? {};

  const hasValidRefillSettings =
    lastRefill !== undefined &&
    refillAmount !== undefined &&
    refillIntervalUnit !== undefined &&
    refillIntervalValue !== undefined;

return (
  <div>
    {/* ... other code ... */}
    
    {/* Add your button here */}
    <div className="mt-2">
      <a 
        href="https://www.paypal.com/ncp/payment/983FW2ALA6QKE" 
        target="_blank" 
        rel="noreferrer"
        className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center font-bold text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
      >
        ⚡ Top Up 5,000,000 Tokens (₱250)
      </a>
      <p className="mt-2 text-center text-xs text-gray-500">
        Manual top-up: Tokens added within 5-30 mins
      </p>
    </div>

      <hr className="border-border-medium" />

      {/* Auto-refill display */}
      {autoRefillEnabled ? (
        hasValidRefillSettings ? (
          <AutoRefillSettings
            lastRefill={lastRefill}
            refillAmount={refillAmount}
            refillIntervalUnit={refillIntervalUnit}
            refillIntervalValue={refillIntervalValue}
          />
        ) : (
          <div className="text-sm text-red-600">
            {localize('com_nav_balance_auto_refill_error')}
          </div>
        )
      ) : (
        <div className="text-sm text-gray-600">
          {localize('com_nav_balance_auto_refill_disabled')}
        </div>
      )}
    </div>
  );
}

export default React.memo(Balance);
