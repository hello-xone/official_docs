'use client'

import React, { useEffect, useState } from 'react'
import styles from './TypingEffect.module.css'

interface TypingEffectProps {
  words: string[]
}

const TypingEffect: React.FC<TypingEffectProps> = ({ words }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [delayOver, setDelayOver] = useState(false)
  const [showCursor, setShowCursor] = useState(true) // 控制光标显隐

  useEffect(() => {
    const currentString = words[currentIndex]

    if (!isDeleting && currentText === currentString && !delayOver) {
      // 文字输入完成，等待 3 秒后再删除
      const delayTimeout = setTimeout(() => setDelayOver(true), 3000)
      return () => clearTimeout(delayTimeout)
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // 输入模式
        if (currentText === currentString) {
          setDelayOver(false)
          setTimeout(() => setIsDeleting(true), 0)
        }
        else {
          setCurrentText(currentString.substring(0, currentText.length + 1))
        }
      }
      else {
        // 删除模式
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % words.length)
        }
        else {
          setCurrentText(currentString.substring(0, currentText.length - 1))
        }
      }
    }, isDeleting ? 50 : 150)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentIndex, words, delayOver])

  // ✅ 修正光标闪烁效果
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, []) // 只在组件挂载时运行

  return (
    <span className={styles['gradient-text']}>
      {currentText}
      <span className={`cursor text-accent-foreground ${showCursor ? 'visible' : 'invisible'}`}>
        |
      </span>
    </span>
  )
}

export default TypingEffect
