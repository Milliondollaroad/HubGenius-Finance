import Footer from '../components/Footer'

const sections = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing or using HubGenius Finance ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.

These terms apply to all visitors, users, and others who access or use the Platform. HubGenius Finance reserves the right to update these terms at any time. Continued use of the Platform following any changes constitutes acceptance of the updated terms.`
  },
  {
    title: 'Description of Service',
    content: `HubGenius Finance is a financial market intelligence platform that provides:
• Real-time and delayed market data aggregated from third-party sources
• AI-generated trade signals for informational purposes
• News aggregation from public RSS feeds and APIs
• TradingView chart embeds
• An experimental autonomous trading bot for educational use

All services are provided "as is" without warranty of any kind.`
  },
  {
    title: 'User Accounts',
    content: `To access certain features of the Platform, you may be required to create an account. You are responsible for:
• Maintaining the confidentiality of your account credentials
• All activity that occurs under your account
• Notifying us immediately of any unauthorized use of your account

We reserve the right to terminate accounts that violate these terms.`
  },
  {
    title: 'Subscriptions and Payments',
    content: `HubGenius Finance offers both free and paid subscription tiers. Paid subscriptions are billed on a monthly or annual basis as selected at the time of purchase.

Subscriptions automatically renew unless cancelled before the renewal date. You may cancel your subscription at any time through your account settings. Refunds are not provided for partial billing periods.

Prices are subject to change with reasonable notice provided to subscribers.`
  },
  {
    title: 'Prohibited Uses',
    content: `You agree not to use the Platform to:
• Violate any applicable laws or regulations
• Reproduce, distribute, or resell our AI signals or data without written permission
• Attempt to gain unauthorized access to any part of the Platform
• Use automated tools to scrape or extract data at scale
• Impersonate any person or entity
• Transmit any malicious code or interfere with Platform operations
• Use the Platform for any unlawful or fraudulent purpose`
  },
  {
    title: 'Intellectual Property',
    content: `All content on the Platform, including but not limited to the HubGenius Finance brand, logo, design, AI signal methodology, and proprietary algorithms, is owned by HubGenius Inc. and protected by applicable intellectual property laws.

Third-party content (news articles, market data, TradingView charts) remains the property of their respective owners. We display such content under fair use or applicable licensing agreements.`
  },
  {
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by law, HubGenius Finance and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of the Platform.

Our total liability to you for any claims arising from use of the Platform shall not exceed the amount paid by you for the Platform in the 12 months preceding the claim.`
  },
  {
    title: 'Governing Law',
    content: `These Terms of Service are governed by the laws of the Province of Ontario, Canada, without regard to conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Ontario, Canada.`
  },
  {
    title: 'Contact',
    content: `For questions regarding these Terms of Service, please contact us at admin@hubgenius.finance`
  },
]

export default function Terms() {
  return (
    <div>
      <div style={{ background: 'var(--navy)', padding: '40px 32px', borderBottom: '3px solid var(--gold2)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'var(--gold3)' }} />
            <span style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase' }}>Legal</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>Terms of Service</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.7 }}>Last updated: May 2026 · HubGenius Inc. · 36 Zorra St, Toronto, Ontario M8Z 0G5, Canada</p>
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
      </div>
      <Footer />
    </div>
  )
}
