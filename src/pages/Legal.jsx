import Footer from '../components/Footer'

const sections = [
  {
    title: 'Not Financial Advice',
    content: `HubGenius Finance provides market data, AI-generated signals, news aggregation, and analytical tools for informational and educational purposes only. Nothing on this platform — including but not limited to price signals, trade indicators, buy/sell recommendations, AI analysis, or bot activity — constitutes financial advice, investment advice, trading advice, or any other form of advice.

You should not make any financial decision based solely on the information provided by HubGenius Finance. Always conduct your own research and due diligence before making any investment or trading decision.`
  },
  {
    title: 'No Investment Adviser Relationship',
    content: `HubGenius Finance is not a registered investment adviser, broker-dealer, financial planner, or any other type of regulated financial services provider in Canada, the United States, or any other jurisdiction. Use of this platform does not create an adviser-client relationship of any kind.

The AI-generated signals on this platform are produced by automated systems and do not reflect the views of any licensed financial professional.`
  },
  {
    title: 'Risk Disclosure',
    content: `Trading and investing in financial markets involves substantial risk of loss. Cryptocurrency markets, leveraged derivatives, and tokenized assets are particularly volatile and speculative in nature. You may lose some or all of your invested capital.

Past performance of any signal, strategy, or bot shown on this platform is not indicative of future results. Hypothetical or simulated performance results have inherent limitations and do not represent actual trading results.

Never invest capital that you cannot afford to lose. Consider seeking advice from an independent, licensed financial adviser before making any investment decision.`
  },
  {
    title: 'Autonomous Bot Disclaimer',
    content: `The HubGenius Finance autonomous trading bot is an experimental software tool provided for educational and testing purposes. It operates on decentralised exchanges and interacts with smart contracts on blockchain networks.

HubGenius Finance accepts no responsibility for any losses incurred as a result of using, deploying, or modifying the trading bot. By using the bot, you acknowledge that you are doing so entirely at your own risk. The bot is not a guaranteed profit-making system and may result in significant financial losses.`
  },
  {
    title: 'Data Accuracy',
    content: `While we make reasonable efforts to ensure the accuracy and timeliness of information displayed on this platform, HubGenius Finance makes no warranties or representations as to the accuracy, completeness, or reliability of any data, prices, signals, or news content.

Market data is sourced from third-party providers including CoinGecko, Yahoo Finance, TradingView, CryptoPanic, and various RSS feeds. We are not responsible for errors, delays, or omissions in third-party data.`
  },
  {
    title: 'No Liability',
    content: `To the maximum extent permitted by applicable law, HubGenius Finance, its founders, employees, contractors, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of this platform, including but not limited to trading losses, loss of profits, loss of data, or any other financial or non-financial damages.`
  },
  {
    title: 'Regulatory Compliance',
    content: `This platform is operated from 36 Zorra St, Toronto, Ontario M8Z 0G5, Canada. Users are solely responsible for ensuring that their use of this platform complies with all applicable laws and regulations in their jurisdiction. This platform may not be suitable for use in certain jurisdictions where such services are restricted or prohibited.

Cryptocurrency trading and derivatives trading may be subject to specific regulations in your country. It is your responsibility to understand and comply with all relevant laws before using this platform.`
  },
  {
    title: 'Third-Party Content',
    content: `This platform aggregates news, social media content, and market data from third-party sources. HubGenius Finance does not endorse, verify, or take responsibility for any third-party content displayed on this platform. Third-party content is provided for informational purposes only and should not be relied upon as the sole basis for any financial decision.`
  },
  {
    title: 'Changes to This Disclaimer',
    content: `HubGenius Finance reserves the right to modify this disclaimer at any time without prior notice. Continued use of the platform following any changes constitutes your acceptance of the updated terms.`
  },
]

export default function Legal() {
  return (
    <div>
      <div style={{ background: 'var(--navy)', padding: '40px 32px', borderBottom: '3px solid var(--gold2)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'var(--gold3)' }} />
            <span style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase' }}>Legal</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>
            Risk Disclaimer & Legal Notice
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.7, maxWidth: 600 }}>
            Please read this disclaimer carefully before using HubGenius Finance. By accessing this platform you acknowledge and agree to these terms.
          </p>
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(139,26,26,.4)', border: '1px solid rgba(224,82,82,.4)', borderRadius: 4 }}>
            <p style={{ fontSize: 12, color: '#ff9999', fontFamily: 'Source Code Pro, monospace', lineHeight: 1.6 }}>
              ⚠️ HubGenius Finance is NOT financial advice. Trading involves substantial risk of loss. Never invest more than you can afford to lose.
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: '48px 32px', maxWidth: 760, margin: '0 auto' }}>
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 36, paddingBottom: 36, borderBottom: i < sections.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 13, color: 'var(--gold2)', fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 600, color: 'var(--navy)' }}>{s.title}</h2>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{s.content}</p>
          </div>
        ))}

        <div style={{ background: 'var(--off)', border: '1px solid var(--border2)', padding: '20px 24px', marginTop: 16 }}>
          <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Contact</div>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
            For any questions regarding this disclaimer or our platform, please contact us at{' '}
            <span style={{ color: 'var(--gold2)', fontFamily: 'Source Code Pro, monospace' }}>admin@hubgenius.finance</span>
          </p>
          <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8, fontFamily: 'Source Code Pro, monospace' }}>
            Last updated: May 2026 · HubGenius Inc. · 36 Zorra St, Toronto, Ontario M8Z 0G5, Canada
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
