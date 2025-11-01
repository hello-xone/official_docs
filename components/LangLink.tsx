
import { useTranslation } from 'react-i18next';

const DynamicLangLink = ({ 
  children, 
  className, 
  basePath = '/bvi',
  subPath = '/readme',
  ...props 
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const getHref = () => {
    return `${basePath}/${currentLang}${subPath}`;
  };

  return (
    <a 
      href={getHref()}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};
export default DynamicLangLink;