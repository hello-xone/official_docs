import { ApiReferenceReact } from "@scalar/api-reference-react"
import "@scalar/api-reference-react/style.css"

export const getLayout = page => page

export default function GatewayFull() {
  return (
    <div className="relative bg-transparent min-h-screen w-full">
      <ApiReferenceReact
        configuration={{
          spec: {
            url: "/gateway.yaml"
          }, 
          hideDarkModeToggle: true,
          hideSearch: true
        }}
      />
    </div>
  )
}