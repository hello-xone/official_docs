import { ApiReferenceReact } from "@scalar/api-reference-react"
import "@scalar/api-reference-react/style.css"
import { useTheme } from 'nextra-theme-docs'
import { useEffect, useState } from 'react'

export const getLayout = page => page

export default function GatewayFull() {
  const theme = useTheme().theme

  const [currentTheme, setCurrentTheme] = useState('')

  useEffect(() => {
      if (theme === 'system') {
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          setCurrentTheme(systemPrefersDark ? 'dark' : 'light')
      } else {
          setCurrentTheme(theme)
      }
  }, [theme])

  if (currentTheme === "") return ;
  return (
    <div
      className={`relative min-h-screen w-full ${currentTheme === "dark" ? "dark-mode" : "light-mode"}`}
    >
      <ApiReferenceReact
        configuration={{
          spec: {
            url: "/gateway.yaml"
          },
          theme: currentTheme,
          hideDarkModeToggle: true,
          hideSearch: true,
          baseServerURL: "https://gateway.xone.org",
          proxyUrl:'https://proxy.scalar.com',
          servers: [
            {
              url: 'https://gateway.xone.org',
              description: 'API for querying Xone blockchain epochs (periodic events).',
            },
            {
              url: 'https://testnet-gateway.xone.org',
              description: 'Development API for querying Xone blockchain epochs (periodic events).',
            },
          ],
        }}
      />
    </div>
  );
}
