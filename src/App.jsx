import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import './index.css'

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }
const stagger = (delay = 0) => ({ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: delay } } })

function AnimatedNumber({ target, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const raw = useMotionValue(0)
  const spring = useSpring(raw, { stiffness: 60, damping: 20 })
  const [display, setDisplay] = useState(0)

  useEffect(() => { if (inView) raw.set(target) }, [inView, raw, target])
  useEffect(() => spring.on('change', v => setDisplay(Math.round(v))), [spring])

  const formatted = display >= 1000 ? display.toLocaleString('es-MX') : display
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>
}

/* ── NAVBAR ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Logros', href: '#logros' },
    { label: 'Propuesta', href: '#propuesta' },
    { label: 'Trayectoria', href: '#trayectoria' },
    { label: 'Únete', href: '#unete' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.3s ease',
        padding: '0 24px',
      }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/EsCruz/morena-logo.svg" alt="Morena" style={{ height: 36, width: 'auto', display: 'block' }} />
          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 22, letterSpacing: 1 }}>
            <span style={{ color: '#8E2C2D' }}>Es</span><span style={{ color: '#0A0A0A' }}>Cruz</span>
          </span>
        </a>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href}
              style={{ color: '#3D3D3D', textDecoration: 'none', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#8E2C2D'}
              onMouseLeave={e => e.target.style.color = '#3D3D3D'}>
              {l.label}
            </a>
          ))}
          <a href="#unete"
            style={{ background: '#8E2C2D', color: '#fff', padding: '8px 20px', borderRadius: 3, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 13, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#6B1F1F'}
            onMouseLeave={e => e.currentTarget.style.background = '#8E2C2D'}>
            Únete
          </a>
        </div>

        <button onClick={() => setMenuOpen(v => !v)} className="hamburger-btn"
          style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 8, background: 'none', border: 'none', cursor: 'pointer' }}>
          {[0, 1, 2].map(i => <span key={i} style={{ width: 24, height: 2, background: '#0A0A0A', display: 'block' }} />)}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '16px 24px', color: '#0A0A0A', textDecoration: 'none', fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 18, textTransform: 'uppercase', letterSpacing: 1, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  )
}

/* ── HERO ── */
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      background: 'linear-gradient(165deg, #0A0A0A 0%, #1A1A1A 45%, #0A0A0A 100%)',
      display: 'flex', alignItems: 'center',
      padding: '100px 24px 80px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px)', pointerEvents: 'none' }} />
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#8E2C2D', transformOrigin: 'left' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'center' }} className="hero-grid">
        {/* texto */}
        <div style={{ position: 'relative' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
            style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 13, letterSpacing: 5, color: '#C9A227', textTransform: 'uppercase', marginBottom: 28 }}>
            Chihuahua · Gobernador · 2027
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(52px, 10vw, 100px)', lineHeight: 0.9, color: '#fff', letterSpacing: -2, textTransform: 'uppercase', marginBottom: 12 }}>
            Cruz Pérez<br />
            <span style={{ color: '#C9A227' }}>Cuéllar</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}
            style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 'clamp(13px, 2vw, 18px)', letterSpacing: 3, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: 52 }}>
            El político que recorre Chihuahua, no que lo administra desde un escritorio
          </motion.p>

          {/* stats */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
            style={{ display: 'flex', gap: 0, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '28px 0', marginBottom: 48 }}>
            {[
              { num: '354K', label: 'VOTOS EN JUÁREZ 2024', sub: 'El más votado en la historia de la ciudad' },
              { num: '67%', label: 'APROBACIÓN COMO ALCALDE', sub: 'Abril 2026 — Demoscopia Digital' },
              { num: '30+', label: 'AÑOS EN CHIHUAHUA', sub: 'Político de territorio, no de escritorio' },
            ].map((s, i) => (
              <div key={i} style={{
                flex: '1 1 140px', padding: '0 24px', textAlign: 'center',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(30px, 5vw, 46px)', color: '#C9A227', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', marginTop: 8 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#logros"
              style={{ background: '#8E2C2D', color: '#fff', padding: '15px 40px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 3 }}>
              Ver logros
            </a>
            <a href="#unete"
              style={{ background: 'transparent', color: '#fff', padding: '15px 40px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 3, border: '2px solid rgba(255,255,255,0.25)' }}>
              Únete
            </a>
          </motion.div>
        </div>

        {/* foto retrato */}
        <motion.div
          initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', alignSelf: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A 0%, transparent 40%)', zIndex: 1, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: -2, top: 0, bottom: 0, width: 3, background: '#8E2C2D', zIndex: 2 }} />
          <img
            src="/EsCruz/foto1.png"
            alt="Cruz Pérez Cuéllar"
            style={{ width: '100%', maxHeight: '80vh', objectFit: 'cover', objectPosition: 'top center', display: 'block', filter: 'grayscale(15%)' }}
          />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(201,162,39,0.8), transparent)' }} />
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-grid > div:last-child { max-height: 50vh; overflow: hidden; }
        }
      `}</style>
    </section>
  )
}

/* ── LOGROS ── */
function Logros() {
  const items = [
    { icon: '🏙️', titulo: 'Ciudad que no paró', desc: 'Juárez mantuvo crecimiento económico récord bajo su administración. Parque industrial en expansión constante, mayor generador de empleos del norte del país.' },
    { icon: '🔒', titulo: 'Seguridad de frente', desc: 'Modelo de policía de proximidad en 600 colonias. Coordinación directa con Sedena y Guardia Nacional para recuperar calles, parques y espacios públicos.' },
    { icon: '🌊', titulo: 'Crisis del agua — respondió en 72h', desc: 'Cuando fallaron los sistemas hídricos, movilizó pipas y negoció directamente con el gobierno federal. El alcalde que no abandona a su gente.' },
    { icon: '🏥', titulo: 'Salud donde no había', desc: 'Amplió la Red de Salud Municipal a 80+ colonias. Brigadas de detección de cáncer, diabetes e hipertensión que llegan donde los demás no van.' },
    { icon: '🛣️', titulo: '354 km de calles pavimentadas', desc: 'No anuncios — obras terminadas y comprobables. Las colonias que el PAN ignoró por décadas hoy tienen pavimento real.' },
    { icon: '💡', titulo: 'Luz en colonias oscuras', desc: '18,000 luminarias LED instaladas en las colonias con mayor índice de violencia. Seguridad que se ve desde la calle.' },
  ]

  return (
    <section id="logros" style={{ background: '#F8F8F7', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger()}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 12, letterSpacing: 4, color: '#8E2C2D', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
            Alcalde de Ciudad Juárez · 2021–2027
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(40px, 7vw, 68px)', textAlign: 'center', color: '#0A0A0A', lineHeight: 0.93, textTransform: 'uppercase', marginBottom: 72 }}>
            Lo que hizo,<br /><span style={{ color: '#8E2C2D' }}>no lo que prometió</span>
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger(0.08)}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {items.map((item, i) => (
            <motion.div key={i} variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              style={{ background: '#fff', padding: '36px 32px', borderLeft: '3px solid #8E2C2D' }}>
              <div style={{ fontSize: 30, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 19, color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>{item.titulo}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3D3D3D', lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── PROPUESTA ── */
function Propuesta() {
  const pilares = [
    { num: '01', titulo: 'Chihuahua al centro del país', body: 'Por primera vez en 12 años, el gobernador y la presidenta van del mismo lado. Eso significa: IMSS Bienestar, Sembrando Vida, vivienda y apoyos sociales que el PAN bloqueó sistemáticamente.' },
    { num: '02', titulo: 'Industria y trabajo para todos', body: 'El modelo que funcionó en Juárez se escala a Chihuahua capital, Delicias, Parral y el norte del estado. Más parques industriales, más empleos formales, menos razones para migrar.' },
    { num: '03', titulo: 'Agua para Chihuahua', body: 'La crisis hídrica es la urgencia real del estado. Inversión directa en infraestructura de captación y distribución — con respaldo federal que solo un gobernador de Morena puede gestionar.' },
    { num: '04', titulo: 'Seguridad en todo el estado', body: 'El modelo de policía de proximidad que funcionó en Juárez se replica en los 67 municipios con formación, equipo y salario digno para cada policía municipal.' },
  ]

  return (
    <section id="propuesta" style={{ background: '#0A0A0A', padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'radial-gradient(ellipse at 80% 50%, rgba(142,44,45,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger()}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 12, letterSpacing: 4, color: '#C9A227', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
            Gobernador 2027
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(40px, 7vw, 68px)', textAlign: 'center', color: '#fff', lineHeight: 0.93, textTransform: 'uppercase', marginBottom: 80 }}>
            Chihuahua que<br /><span style={{ color: '#C9A227' }}>sí avanza</span>
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger(0.1)}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {pilares.map((p, i) => (
            <motion.div key={i} variants={fadeUp}
              whileHover={{ borderColor: 'rgba(201,162,39,0.5)' }}
              style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2, padding: '40px 28px', transition: 'border-color 0.2s' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 52, color: 'rgba(201,162,39,0.2)', lineHeight: 1, marginBottom: 20 }}>{p.num}</div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 20, color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16, lineHeight: 1.1 }}>{p.titulo}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75 }}>{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── CHIHUAHUA CON MEXICO ── */
function ChihuahuaConMexico() {
  const programas = [
    'IMSS Bienestar en todos los municipios',
    'Sembrando Vida — apoyo al campo chihuahuense',
    'Créditos a la vivienda (Infonavit federal)',
    'Becas Benito Juárez para universidades',
    'Pensión Bienestar sin intermediarios del PAN',
    'Inversión federal en infraestructura hídrica',
  ]

  return (
    <section style={{ background: '#fff', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="grid-responsive">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger()}>
            <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 12, letterSpacing: 4, color: '#8E2C2D', textTransform: 'uppercase', marginBottom: 16 }}>
              El argumento más claro
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 52px)', color: '#0A0A0A', lineHeight: 0.93, textTransform: 'uppercase', marginBottom: 28 }}>
              Con Cruz,<br /><span style={{ color: '#8E2C2D' }}>Chihuahua y México</span><br />hablan el mismo idioma
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#3D3D3D', lineHeight: 1.8, marginBottom: 32 }}>
              El PAN lleva 12 años bloqueando programas federales por diferencias partidistas. Con un gobernador de Morena alineado con la presidenta Sheinbaum, Chihuahua recupera lo que le corresponde.
            </motion.p>
            <motion.blockquote variants={fadeUp}
              style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 18, color: '#0A0A0A', borderLeft: '3px solid #C9A227', paddingLeft: 20, lineHeight: 1.5 }}>
              "El que lleva 12 años mandando en Chihuahua tiene que negociar con el federal. Yo no necesito negociar — somos el mismo equipo."
            </motion.blockquote>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger(0.08)}>
            <motion.div variants={fadeUp} style={{ background: '#F8F8F7', borderRadius: 4, padding: '40px 36px' }}>
              <p style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 11, letterSpacing: 3, color: '#8E2C2D', textTransform: 'uppercase', marginBottom: 28 }}>
                Lo que Chihuahua perdió por el PAN
              </p>
              {programas.map((p, i) => (
                <motion.div key={i} variants={fadeUp}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0', borderBottom: i < programas.length - 1 ? '1px solid #EBEBEA' : 'none' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8E2C2D', flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3D3D3D', lineHeight: 1.5 }}>{p}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  )
}

/* ── TRAYECTORIA ── */
function Trayectoria() {
  const eventos = [
    { year: '1988', txt: 'Inicia carrera política en Chihuahua — más de 38 años de trayectoria ininterrumpida en el estado.' },
    { year: '1994', txt: 'Diputado federal LVI Legislatura — Comisiones de Juventud y Asuntos Fronterizos.' },
    { year: '2006', txt: 'Diputado federal LX Legislatura. Legisla en temas de seguridad fronteriza y comercio exterior.' },
    { year: '2018', txt: 'Senador de la República por Chihuahua. Seis años representando al estado en el Senado.' },
    { year: '2021', txt: 'Elegido Presidente Municipal de Juárez — 213,000 votos. Primera administración de izquierda en la ciudad.' },
    { year: '2024', txt: 'Reelegido con 354,000 votos (60%) — el resultado más alto en la historia electoral de Ciudad Juárez.' },
    { year: '2027', txt: 'Candidato a Gobernador de Chihuahua. Treinta años de territorio. "La tercera es la vencida."', highlight: true },
  ]

  return (
    <section id="trayectoria" style={{ background: '#F8F8F7', padding: '96px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger()}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 12, letterSpacing: 4, color: '#8E2C2D', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
            38 años recorriendo Chihuahua
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(40px, 7vw, 68px)', textAlign: 'center', color: '#0A0A0A', lineHeight: 0.93, textTransform: 'uppercase', marginBottom: 72 }}>
            El candidato que<br /><span style={{ color: '#8E2C2D' }}>conoce tu colonia</span>
          </motion.h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 72, top: 8, bottom: 8, width: 2, background: 'linear-gradient(to bottom, #8E2C2D 80%, rgba(142,44,45,0.1))', transform: 'translateX(-50%)' }} />

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger(0.1)}>
            {eventos.map((e, i) => (
              <motion.div key={i} variants={fadeUp} style={{ display: 'flex', gap: 24, marginBottom: 36, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 60, textAlign: 'right', paddingTop: 2 }}>
                  <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 20, color: e.highlight ? '#C9A227' : '#8E2C2D' }}>{e.year}</span>
                </div>
                <div style={{ position: 'relative', flexShrink: 0, width: 24, paddingTop: 6, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: e.highlight ? '#C9A227' : '#8E2C2D', border: '3px solid #F8F8F7', position: 'relative', zIndex: 1 }} />
                </div>
                <div style={{ paddingTop: 2 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, fontWeight: e.highlight ? 600 : 400, color: e.highlight ? '#0A0A0A' : '#3D3D3D' }}>{e.txt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── GALERÍA ── */
function Galeria() {
  return (
    <section style={{ background: '#0A0A0A', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger()}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 12, letterSpacing: 4, color: '#8E2C2D', textTransform: 'uppercase', marginBottom: 48, textAlign: 'center' }}>
            En el territorio
          </motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger(0.1)}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }} className="galeria-grid">
          {['/EsCruz/foto2.png', '/EsCruz/foto3.png'].map((src, i) => (
            <motion.div key={i} variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden', position: 'relative', aspectRatio: '761/643' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(142,44,45,0.4) 0%, transparent 50%)', zIndex: 1, pointerEvents: 'none' }} />
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(10%)' }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .galeria-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

/* ── VOTO INDECISO ── */
function VotoIndeciso() {
  return (
    <section style={{ background: '#8E2C2D', padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 40px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger(0.1)}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 12, letterSpacing: 4, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', marginBottom: 16 }}>
            Para quien todavía no sabe por quién votar
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(44px, 9vw, 84px)', color: '#fff', lineHeight: 0.93, textTransform: 'uppercase', marginBottom: 32 }}>
            ¿Todavía no<br />decides?
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, maxWidth: 620, margin: '0 auto 56px' }}>
            El voto indeciso en Chihuahua representa el 15% del electorado — cerca de 300,000 personas. No están en contra de nadie. Solo están esperando razones suficientes. Estas son las nuestras.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, marginBottom: 56 }}>
            {[
              { stat: '67%', label: 'de aprobación como alcalde — récord comprobable, no promesa' },
              { stat: '354K', label: 'chihuahuenses ya votaron por él cuando pudieron elegir' },
              { stat: '12', label: 'años de programas federales bloqueados que Chihuahua recupera' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.18)', padding: '36px 24px' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(40px, 8vw, 56px)', color: '#C9A227', lineHeight: 1 }}>{item.stat}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 14, lineHeight: 1.65 }}>{item.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.a variants={fadeUp} href="#unete"
            style={{ display: 'inline-block', background: '#fff', color: '#8E2C2D', padding: '16px 52px', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 17, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 3 }}>
            Conoce más →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

/* ── ÚNETE ── */
function Unete() {
  const msg = encodeURIComponent('¿Ya conoces la propuesta de Cruz Pérez Cuéllar para Chihuahua 2027? Échale un ojo: escruz.mx')
  const whatsappUrl = `https://wa.me/?text=${msg}`

  return (
    <section id="unete" style={{ background: '#0A0A0A', padding: '100px 24px 72px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger(0.1)}>
          <motion.div variants={fadeUp}
            style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(72px, 18vw, 140px)', color: 'rgba(201,162,39,0.12)', lineHeight: 1, marginBottom: -28, userSelect: 'none' }}>
            2027
          </motion.div>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(38px, 8vw, 68px)', color: '#fff', textTransform: 'uppercase', lineHeight: 0.93, marginBottom: 24 }}>
            Chihuahua<br /><span style={{ color: '#C9A227' }}>nos necesita</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 52, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            Comparte esta página con tu familia, vecinos y amigos. La decisión más importante de Chihuahua empieza con una conversación.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', padding: '15px 32px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', borderRadius: 3 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Compartir en WhatsApp
            </a>
            <a href="#hero"
              style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: 'rgba(255,255,255,0.5)', padding: '15px 32px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 15, letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 3 }}>
              Ver desde el inicio
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ maxWidth: 1100, margin: '80px auto 0', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 18 }}><span style={{ color: '#8E2C2D' }}>Es</span><span style={{ color: '#0A0A0A' }}>Cruz</span></span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>Cruz Pérez Cuéllar · Gobernador de Chihuahua 2027 · Material de precampaña</span>
      </motion.div>
    </section>
  )
}

/* ── APP ── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Logros />
      <Propuesta />
      <ChihuahuaConMexico />
      <Trayectoria />
      <Galeria />
      <VotoIndeciso />
      <Unete />
    </>
  )
}
