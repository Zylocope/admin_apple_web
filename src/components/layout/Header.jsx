import { IconBell, IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { mockProducts, mockDashboard } from '../../data/mock';
import { formatMMKShort } from '../../utils/currency';

export default function Header({ titleKey }) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const lowStock = mockProducts.filter(p => p.stock <= p.lowStockThreshold).length;
  const todayRevenue = mockDashboard.todayStoreSales + mockDashboard.todayTicketSales;

  return (
    <header className="h-16 glass border-b border-app flex items-center justify-between px-6 flex-shrink-0 gap-4 z-20">
      {/* Left: title + search */}
      <div className="flex items-center gap-4 min-w-0">
        <h1 className="text-lg font-bold text-ink whitespace-nowrap">{t(`titles.${titleKey}`)}</h1>
        <div className="relative hidden md:block w-[320px]">
          <IconSearch size={16} stroke={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" />
          <input
            type="text"
            placeholder={t('header.search')}
            className="w-full pl-9 pr-4 py-2 text-[15px] rounded-lg bg-card/70 border border-app text-ink placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-shadow"
          />
        </div>
      </div>

      {/* Right: today revenue + bell + avatar */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="hidden lg:flex flex-col items-end leading-tight pr-3 border-r border-app">
          <span className="text-[11px] text-mute uppercase tracking-wide">{t('header.todayRevenue')}</span>
          <span className="text-[15px] font-bold text-brand">{formatMMKShort(todayRevenue)}</span>
        </div>
        {lowStock > 0 && (
          <button className="relative p-1 cursor-pointer" title={t('header.lowStockAlert', { count: lowStock })}>
            <IconBell size={20} stroke={1.5} className="text-sub" />
            <span className="absolute top-0 right-0 bg-[#EF4444] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
              {lowStock}
            </span>
          </button>
        )}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-sm font-semibold">
            {user?.name?.[0] ?? 'A'}
          </div>
          <span className="text-[15px] text-sub hidden sm:block">{user?.username}</span>
        </div>
      </div>
    </header>
  );
}
