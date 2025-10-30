import { ApiReferenceReact } from "@scalar/api-reference-react"
import "@scalar/api-reference-react/style.css"
import { useTheme } from 'nextra-theme-docs'
import {useEffect, useRef, useState} from 'react'

export const getLayout = page => page

export default function GatewayFull() {
  const theme = useTheme().theme

  const [currentTheme, setCurrentTheme] = useState('')

  useEffect(() => {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (theme === 'system') {
          setCurrentTheme(systemPrefersDark ? 'dark' : 'light')
      } else {
          setCurrentTheme(theme)
      }
  }, [theme])

  if (currentTheme === "") return ;
  return (
    <div
      id="gatewayAPI"
      className={`relative min-h-screen w-full ${currentTheme === "dark" ? "dark-mode" : "light-mode"}`}
      
    >
    <style jsx global>{`
      #gatewayAPI {
        max-width: 100vw !important;
        overflow-x: clip !important;
      }
      
      #gatewayAPI > div {
        width: 100% !important;
        max-width: 100% !important;
      }
      
      #gatewayAPI .scalar-api-reference,
      #gatewayAPI .scalar-container,
      #gatewayAPI .scalar-app {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      
      @container #gatewayAPI (max-width: 768px) {
        #gatewayAPI .scalar-api-reference {
          transform: scale(0.9);
          transform-origin: top center;
        }
      }
      
      @container #gatewayAPI (max-width: 480px) {
        #gatewayAPI .scalar-api-reference {
          transform: scale(0.8);
          transform-origin: top center;
        }
      }
      .scalar-app .references-header{
        position: fixed;
        top: 63px;
        left: 0;
      }
    `}</style>
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
