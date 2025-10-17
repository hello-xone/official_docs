import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * 在 Study 📖 导航标签中注入 Xone 链接
 */
const StudyLinkInjector = () => {
  const router = useRouter();

  useEffect(() => {
    const injectXoneLink = () => {
      // 查找包含 "Study 📖" 的导航元素（根据 title 属性）
      const titleAttribute = 'Study 📖';
      const studyElements = document.querySelectorAll<HTMLDivElement>(
        `.nx-whitespace-nowrap[title="${titleAttribute}"]`
      );

      studyElements.forEach((element) => {
        // 检查是否已经注入过链接，避免重复注入
        if (element.querySelector('.xone-study-link')) {
          return;
        }

        // 创建 Xone 链接标签
        const xoneLink = document.createElement('a');
        xoneLink.href = 'https://xone.org';
        xoneLink.target = '_blank';
        xoneLink.rel = 'noopener noreferrer';
        xoneLink.className = 'xone-study-link nx-text-primary-600';
        xoneLink.style.cssText = `
          font-weight: bolder;
          font-size: 16px;
          margin-right: 8px;
          text-decoration-line: underline;
        `;
        xoneLink.textContent = 'Xone';

        element.prepend(xoneLink);
      });
    };

    // 延迟执行，确保 DOM 已经渲染
    const timeoutId = setTimeout(() => {
      injectXoneLink();
    }, 100);

    // 监听路由变化
    const handleRouteChange = () => {
      // 路由变化后延迟执行，等待 DOM 更新
      setTimeout(() => {
        injectXoneLink();
      }, 100);
    };

    // 监听 路由事件
    router.events.on('routeChangeComplete', handleRouteChange);

    const observer = new MutationObserver(() => {
      injectXoneLink();
    });

    // 观察整个文档的变化
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 清理函数
    return () => {
      clearTimeout(timeoutId);
      router.events.off('routeChangeComplete', handleRouteChange);
      observer.disconnect();
    };
  }, [router]);

  return null;
};

export default StudyLinkInjector;

