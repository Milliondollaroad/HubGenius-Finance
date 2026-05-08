import Footer from '../components/Footer'

const sections = [
  {
    title: 'Information We Collect',
    content: `HubGenius Finance collects the following types of information:

Account information: When you create an account, we collect your email address and any profile information you provide.

Usage data: We collect information about how you use the Platform, including pages visited, features used, and time spent on the Platform.

Payment information: If you subscribe to Pro, payment is processed by Stripe. We do not store your full credit card details — only the last 4 digits and billing address for reference.

Technical data: We collect your IP address, browser type, device type, and operating system for security and analytics purposes.

Wallet addresses: If you connect a Web3 wallet, we collect your public wallet address. We never request or store private keys or seed phrases.`
  },
  {
    title: 'How We Use Your Information',
    content: `We use your information to:
• Provide and maintain the Platform
• Process subscription payments
• Send service-related communications (account updates, billing)
• Improve and personalize your experience
• Monitor and analyze usage patterns for product development
• Detect and prevent fraud or abuse
• Comply with legal obligations

We do not sell your personal information to third parties.`
  },
  {
    title: 'Data Storage and Security',
    content: `Your data is stored securely using industry-standard encryption. We use Supabase for database storage and Vercel for hosting, both of which maintain SOC 2 compliance.

We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

Despite these measures, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.`
  },
  {
    title: 'Cookies and Tracking',
    content: `HubGenius Finance uses minimal cookies strictly necessary for the Platform to function, including session authentication cookies.

We do not use advertising cookies or sell tracking data to advertisers. We may use privacy-respecting analytics (such as Plausible or Fathom) that do not track individual users across websites.

You can control cookie settings through your browser preferences.`
  },
  {
    title: 'Third-Party Services',
    content: `Our Platform integrates with the following third-party services, each with their own privacy policies:
• Stripe — payment processing
• Supabase — database and authentication
• Vercel — hosting and CDN
• TradingView — chart embeds
• CoinGecko — market data
• Yahoo Finance — market data
• CryptoPanic — news aggregation
• Various RSS feeds — news sources

We are not responsible for the privacy practices of these third parties.`
  },
  {
    title: 'Your Rights',
    content: `Depending on your location, you may have the following rights regarding your personal data:
• Right to access the personal data we hold about you
• Right to correct inaccurate personal data
• Right to request deletion of your personal data
• Right to restrict or object to processing of your data
• Right to data portability

To exercise any of these rights, contact us at admin@hubgenius.finance. We will respond within 30 days.`
  },
  {
    title: 'Data Retention',
    content: `We retain your personal data for as long as your account is active or as needed to provide services. If you close your account, we will delete your personal data within 90 days, except where we are required by law to retain certain information.

Aggregated, anonymized data may be retained indefinitely for analytics purposes.`
  },
  {
    title: 'Children\'s Privacy',
    content: `The Platform is not directed at individuals under the age of 18. We do not knowingly collect personal information from minors. If you become aware that a minor has provided us with personal information, please contact us immediately.`
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on the Platform. Continued use of the Platform after changes constitutes acceptance of the updated policy.`
  },
  {
    title: 'Contact',
    content: `For privacy-related inquiries, contact us at admin@hubgenius.finance\n\nHubGenius Inc. · 36 Zorra St, Toronto, Ontario M8Z 0G5, Canada`
  },
]

export default function Privacy() {
  return (
    <div>
      <div style={{ background: 'var(--navy)', padding: '40px 32px', borderBottom: '3px solid var(--gold2)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'var(--gold3)' }} />
            <span style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase' }}>Legal</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>Privacy Policy</h1>
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
