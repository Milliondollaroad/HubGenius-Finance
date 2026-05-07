import { useState } from 'react'
import Footer from '../components/Footer'

const topics = [
  { id: 'general',      label: 'General enquiry'        },
  { id: 'support',      label: 'Technical support'      },
  { id: 'billing',      label: 'Billing & subscriptions' },
  { id: 'partnership',  label: 'Partnership & business'  },
  { id: 'legal',        label: 'Legal & compliance'      },
  { id: 'press',        label: 'Press & media'           },
]

const contacts = [
  { label: 'General',     email: 'admin@hubgenius.finance',       desc: 'General enquiries and feedback' },
  { label: 'Support',     email: 'admin@hubgenius.finance',     desc: 'Technical issues and account help' },
  { label: 'Legal',       email: 'admin@hubgenius.finance',       desc: 'Legal, compliance, and terms' },
  { label: 'Privacy',     email: 'admin@hubgenius.finance',     desc: 'Data requests and privacy matters' },
  { label: 'Partnerships',email: 'admin@hubgenius.finance',    desc: 'Business development and partnerships' },
  { label: 'Press',       email: 'admin@hubgenius.finance',       desc: 'Media enquiries and press kit' },
]

export default function Contact() {
  const [topic, setTopic]       = useState('')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [message, setMessage]   = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (name && email && message && topic) {
      setSubmitted(true)
    }
  }

  const inputStyle = {
    width: '100%', background: 'var(--white)',
    border: '1px solid var(--border2)', color: 'var(--text)',
    padding: '10px 14px', fontSize: 13,
    fontFamily: 'Source Sans 3, sans-serif', outline: 'none',
    borderRadius: 2, marginBottom: 12
  }

  return (
    <div>
      <div style={{ background: 'var(--navy)', padding: '40px 32px', borderBottom: '3px solid var(--gold2)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 24, height: 2, background: 'var(--gold3)' }} />
            <span style={{ fontSize: 9, color: 'var(--gold3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 3, textTransform: 'uppercase' }}>Contact</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 600, color: 'var(--white)', marginBottom: 8 }}>Get in touch</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.7, maxWidth: 500 }}>
            We're based in Toronto, Canada. We aim to respond to all enquiries within 2 business days. We aim to respond to all enquiries within 2 business days.
          </p>
        </div>
      </div>

      <div style={{ padding: '48px 32px', maxWidth: 760, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>

        {/* Contact form */}
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>Send a message</h2>
          <div style={{ width: 32, height: 2, background: 'var(--gold2)', marginBottom: 24 }} />

          {submitted ? (
            <div style={{ padding: '24px', background: 'var(--green-bg)', border: '1px solid rgba(26,107,58,.2)', borderRadius: 4 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: 'var(--green)', marginBottom: 6 }}>Message sent</div>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>Thank you for reaching out. We'll get back to you at {email} within 2 business days.</p>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: 4, fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase' }}>Topic</div>
              <select value={topic} onChange={e => setTopic(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Select a topic...</option>
                {topics.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>

              <div style={{ marginBottom: 4, fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase' }}>Your name</div>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" style={inputStyle} />

              <div style={{ marginBottom: 4, fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase' }}>Email address</div>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email" style={inputStyle} />

              <div style={{ marginBottom: 4, fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase' }}>Message</div>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we help you?" rows={5}
                style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Source Sans 3, sans-serif' }} />

              <button onClick={handleSubmit}
                style={{ background: 'var(--navy)', color: 'var(--gold3)', border: 'none', padding: '12px 28px', fontSize: 12, fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600, cursor: 'pointer', letterSpacing: '.5px', width: '100%' }}>
                Send message
              </button>
            </div>
          )}
        </div>

        {/* Contact directory */}
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>Direct contact</h2>
          <div style={{ width: 32, height: 2, background: 'var(--gold2)', marginBottom: 24 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
            {contacts.map(c => (
              <div key={c.label} style={{ padding: '12px 14px', background: 'var(--off)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase' }}>{c.label}</span>
                </div>
                <a href={`mailto:${c.email}`} style={{ fontSize: 12, color: 'var(--gold2)', fontFamily: 'Source Code Pro, monospace', textDecoration: 'none', display: 'block', marginBottom: 3 }}
                  onMouseEnter={e => e.target.style.color = 'var(--navy)'}
                  onMouseLeave={e => e.target.style.color = 'var(--gold2)'}
                >{c.email}</a>
                <div style={{ fontSize: 11, color: 'var(--text3)' }}>{c.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '16px', background: 'var(--off)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'Source Code Pro, monospace', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Office</div>
            <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
              HubGenius Inc.<br />
              36 Zorra St<br />
              Toronto, Ontario M8Z 0G5<br />Canada
            </p>
            <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8, fontFamily: 'Source Code Pro, monospace' }}>
              Response time: 2 business days
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
