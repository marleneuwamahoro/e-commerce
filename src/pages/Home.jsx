import Navbar from '../compnents/Navbar'
import { useFetch } from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { data } = useFetch('http://localhost:3000/store_info')
  const store = data?.[0]
  const navigate = useNavigate()

  const pageStyle = {
    backgroundColor: '#8B6B4A',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }

  const heroStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '80px 40px',
    gap: '24px'
  }

  const badgeStyle = {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.9)',
    padding: '6px 18px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    border: '1px solid rgba(255,255,255,0.25)'
  }

  const titleStyle = {
    fontSize: '5.5rem',
    fontWeight: '300',
    color: '#1a1a1a',
    margin: 0,
    letterSpacing: '3px',
    lineHeight: 1.1
  }

  const dividerStyle = {
    width: '60px',
    height: '2px',
    backgroundColor: 'rgba(255,255,255,0.5)',
    margin: '0 auto'
  }

  const subtitleStyle = {
    fontSize: '1.2rem',
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '300',
    maxWidth: '420px',
    lineHeight: '1.8',
    margin: 0
  }

  const btnRowStyle = {
    display: 'flex',
    gap: '16px',
    marginTop: '12px'
  }

  const primaryBtnStyle = {
    padding: '14px 36px',
    backgroundColor: '#5C2D0E',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    fontSize: '1rem',
    cursor: 'pointer',
    letterSpacing: '0.5px'
  }

  const secondaryBtnStyle = {
    padding: '14px 36px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.5)',
    borderRadius: '30px',
    fontSize: '1rem',
    cursor: 'pointer',
    letterSpacing: '0.5px'
  }

  const statsRowStyle = {
    display: 'flex',
    gap: '48px',
    marginTop: '32px',
    paddingTop: '32px',
    borderTop: '1px solid rgba(255,255,255,0.2)'
  }

  const statStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px'
  }

  const statNumberStyle = {
    fontSize: '1.8rem',
    fontWeight: '400',
    color: 'white'
  }

  const statLabelStyle = {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  }

  return (
    <div style={pageStyle}>
      <Navbar />
      <div style={heroStyle}>

        <span style={badgeStyle}>☕ Est. 2024</span>

        <h1 style={titleStyle}>
          {store?.name || 'Coffee R Us'}
        </h1>

        <div style={dividerStyle} />

        <p style={subtitleStyle}>
          {store?.description || 'The go to store for your coffee needs'}
        </p>

        <div style={btnRowStyle}>
          <button style={primaryBtnStyle} onClick={() => navigate('/shop')}>
            Browse Coffee
          </button>
          <button style={secondaryBtnStyle} onClick={() => navigate('/admin')}>
            Admin Portal
          </button>
        </div>

        <div style={statsRowStyle}>
          <div style={statStyle}>
            <span style={statNumberStyle}>12+</span>
            <span style={statLabelStyle}>Blends</span>
          </div>
          <div style={statStyle}>
            <span style={statNumberStyle}>6</span>
            <span style={statLabelStyle}>Origins</span>
          </div>
          <div style={statStyle}>
            <span style={statNumberStyle}>100%</span>
            <span style={statLabelStyle}>Arabica</span>
          </div>
        </div>

      </div>
    </div>
  )
}