import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/',         label: 'Overview'        },
  { to: '/terminal', label: 'Terminal'        },
  { to: '/bot',      label: 'Bot performance' },
  { to: '/pricing',  label: 'Pricing'         },
]

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <nav style={{
      background:'var(--white)',borderBottom:'2px solid var(--gold2)',
      padding:'0 24px',height:56,display:'flex',
      alignItems:'center',justifyContent:'space-between',
      position:'sticky',top:0,zIndex:100,
      boxShadow:'0 1px 8px rgba(0,0,0,.06)'
    }}>
      <Link to="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
        <div style={{width:32,height:32,background:'var(--navy)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <div style={{width:18,height:18,border:'1.5px solid var(--gold3)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Source Code Pro,monospace',fontSize:7,color:'var(--gold3)',fontWeight:500}}>HG</div>
        </div>
        <div style={{borderLeft:'2px solid var(--gold2)',paddingLeft:10}}>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:16,fontWeight:600,color:'var(--navy)',lineHeight:1.1}}>HubGenius Finance</div>
          <div className="hide-mobile" style={{fontSize:8,color:'var(--gold2)',fontFamily:'Source Code Pro,monospace',letterSpacing:2}}>EST. 2026 · TORONTO</div>
        </div>
      </Link>
      <div className="hide-mobile" style={{display:'flex',gap:2}}>
        {links.map(({to,label})=>{
          const active=pathname===to
          return(
            <Link key={to} to={to} style={{
              background:'transparent',border:'none',
              color:active?'var(--navy)':'var(--text2)',
              padding:'8px 14px',fontSize:12,
              fontFamily:'Source Sans 3,sans-serif',
              fontWeight:active?600:500,letterSpacing:'.3px',
              textDecoration:'none',
              borderBottom:active?'2px solid var(--gold2)':'2px solid transparent',
              marginBottom:-2,display:'inline-block'
            }}>{label}</Link>
          )
        })}
      </div>
      <Link to="/pricing">
        <button style={{background:'var(--navy)',color:'var(--gold3)',border:'none',padding:'6px 14px',fontSize:11,fontFamily:'Source Sans 3,sans-serif',fontWeight:600,cursor:'pointer',letterSpacing:'.5px'}}>
          Upgrade to Pro
        </button>
      </Link>
    </nav>
  )
}
