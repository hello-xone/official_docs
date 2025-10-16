import { useEffect } from 'react';

/**
 * 在 Study 📖 导航标签中注入 Xone 链接
 */
const StudyLinkInjector = () => {
  useEffect(() => {
    const injectXoneLink = () => {
      // 查找包含 "Study 📖" 的导航元素（根据 title 属性）
      const titleAttribute = 'Study 📖';
      const studyElements = document.querySelectorAll<HTMLDivElement>(
        `.nextra-breadcrumb .nx-whitespace-nowrap[title="${titleAttribute}"]`
      );

      studyElements.forEach((element) => {
        if (element.title === titleAttribute && element.textContent === titleAttribute) {
          // 检查是否已经注入过链接，避免重复注入
          if (element.querySelector('.xone-study-link')) {
            return;
          }

          // 创建 Xone 链接标签
          const xoneLink = document.createElement('a');
          xoneLink.href = 'https://xone.org';
          xoneLink.target = '_blank';
          xoneLink.rel = 'noopener noreferrer';
          xoneLink.style.cssText = `
            font-weight: bolder;
            font-size: 16px;
            margin-right: 8px;
            text-decoration-line: underline;
          `;
          xoneLink.textContent = 'Xone';
          xoneLink.className = 'nx-text-primary-600';

          element.prepend(xoneLink);
        }
      });
    };

    // 初始注入
    injectXoneLink();

    // 监听 DOM 变化（处理动态路由切换的情况）
    const observer = new MutationObserver(() => {
      injectXoneLink();
    });

    // 观察导航栏的变化
    const navElement = document.querySelector('nav');
    if (navElement) {
      observer.observe(navElement, {
        childList: true,
        subtree: true,
      });
    }

    // 清理函数
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default StudyLinkInjector;

