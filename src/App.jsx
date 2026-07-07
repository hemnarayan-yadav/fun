console.log('[v0] App loading')

export default function App() {
  console.log('[v0] App rendering')
  return (
    <div style={{ height: '100vh', background: '#333', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
      Hello from React!
    </div>
  )
}
