
import { useState } from "react";
import { toast } from "sonner";
import { botTiers } from "@/features/automated-trading/data/bots";
import { BotCard } from "@/features/automated-trading/components/BotCard";
import { BotStatistics } from "@/features/automated-trading/components/BotStatistics";
import { StrategyLibrary } from "@/features/automated-trading/components/StrategyLibrary";
import { OverviewCard } from "@/features/automated-trading/components/OverviewCard";
import { BotTier } from "@/features/automated-trading/types";

interface AutomatedTradingProps {
  isDemoMode?: boolean;
}

const AutomatedTrading = ({ isDemoMode = false }: AutomatedTradingProps) => {
  const [userBalance] = useState(isDemoMode ? 10000 : 0);

  const handleTradeClick = (bot: BotTier) => {
    // Check if user has sufficient balance for the Standard bot
    if (bot.id === "standard" && userBalance < 20) {
      toast.error("Insufficient Funds", {
        description: "You need a minimum balance of $20 to use the Standard bot.",
      });
      return;
    }
    
    if (isDemoMode) {
      toast.success(`Demo Bot Activated`, {
        description: `${bot.type} bot is now running with virtual funds. No real money is being used.`,
      });
    } else {
      if (userBalance < bot.price) {
        toast.error("Insufficient Funds", {
          description: `Please deposit at least $${bot.price} to activate this bot.`,
        });
        return;
      }
      
      toast.success(`Bot Activated`, {
        description: `${bot.type} bot has been successfully activated.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <OverviewCard isDemoMode={isDemoMode} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {botTiers.map((bot) => (
          <BotCard 
            key={bot.id} 
            bot={bot} 
            onTradeClick={handleTradeClick} 
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BotStatistics isDemoMode={isDemoMode} />
        <StrategyLibrary isDemoMode={isDemoMode} />
      </div>
    </div>
  );
};

export default AutomatedTrading;
