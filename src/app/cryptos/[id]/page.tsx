import { TrendingCoins } from '@/components/trending-coins'
import { getCryptoDetails } from '@/utils/getCryptoDetails'
import { CoinInfo } from './coin-info'
import { CoinDescription } from './coin-description'
import { Container } from '@/components/ui/container'
import { CoinChart } from './coin-chart'

export default async function CryptoPage({
  params,
}: {
  params: { id: string }
}) {
  const coinDetails = await getCryptoDetails(params.id)
  return (
    <div>
      <Container>
        <div className="flex grid-cols-8 flex-col lg:grid lg:gap-10">
          <section className="col-span-6">
            <CoinInfo coinData={coinDetails} />
            {coinDetails.market_data?.sparkline_7d ? (
              <div>
                <h3 className="my-10 text-2xl font-bold">
                  {coinDetails.name} price chart
                </h3>
                <CoinChart marketData={coinDetails.market_data} />
              </div>
            ) : null}
            <CoinDescription
              name={coinDetails.name}
              description={coinDetails.description}
            />
          </section>

          <div className="col-span-2 flex flex-col gap-5">
            {/* @ts-expect-error Async Server Component */}
            <TrendingCoins />
          </div>
        </div>
      </Container>
    </div>
  )
}
