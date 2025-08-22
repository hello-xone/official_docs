import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * Collapse and deactivate the "Developers 🔧" sidebar section on the homepage.
 */
export default function SidebarAutoCollapse() {
  const { asPath, pathname } = useRouter()

  useEffect(() => {
    const isHome = asPath === '/' || pathname === '/'
    if (!isHome) return

    const waitForElement = (selector: string, timeoutMs = 3000): Promise<HTMLElement | null> => {
      return new Promise((resolve) => {
        const found = document.querySelector(selector) as HTMLElement | null
        if (found) return resolve(found)

        const timeout = setTimeout(() => {
          observer.disconnect()
          resolve(null)
        }, timeoutMs)

        const observer = new MutationObserver(() => {
          const el = document.querySelector(selector) as HTMLElement | null
          if (el) {
            clearTimeout(timeout)
            observer.disconnect()
            resolve(el)
          }
        })
        observer.observe(document.body, { childList: true, subtree: true })
      })
    }

    ;(async () => {
      const sidebar = await waitForElement('aside.nextra-sidebar-container, .nextra-sidebar-container aside, .nextra-sidebar-container')
      if (!sidebar) return

      const collapse = () => {
        const detailsEl = sidebar.querySelectorAll('.nextra-scrollbar > ul > li')[4];
        if (!detailsEl) return

        if (detailsEl) {
          detailsEl.classList.remove('open')
          detailsEl.classList.remove('active')
          const elButton = detailsEl.querySelector('button')
          if (elButton) {
            elButton.classList.remove('nx-text-primary-800')
            elButton.classList.remove('nx-bg-primary-100')
            elButton.style.color = 'rgb(107, 114, 128)'
            elButton.style.fontWeight = 'font-weight: 400'
          }
        }
      }

      // First attempt
      collapse()
      // Observe updates for late rendering (mobile drawer or async layout)
      const observer = new MutationObserver(() => collapse())
      observer.observe(sidebar, { childList: true, subtree: true })

      // Cleanup on route change
      return () => observer.disconnect()
    })()
  }, [asPath, pathname])

  return null
}


