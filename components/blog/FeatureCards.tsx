import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
  Image
} from '@heroui/react';

export interface CardItem {
  banner: string;
  logo: string;
  title: string;
  description: string;
  href: string;
}

interface FeatureCardsProps {
  items: CardItem[];
}

export default function FeatureCards({ items }: FeatureCardsProps) {
  return (
    <div className="flex flex-col space-y-[20px]">
      {items.map(({ banner, logo, title, description, href }, idx) => (
        <Card
          key={idx}
          className="flex flex-col md:flex-row w-full border-none"
          isFooterBlurred
          shadow="none"
        >
          <div className="md:w-1/2">
            <Image
              src={banner}
              alt={`${title} banner`}
              width={400}
              height={200}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="md:w-1/2 flex flex-col">
            <CardHeader className="flex gap-3">
              <Image
                src={logo}
                alt={`${title} logo`}
                width={40}
                height={40}
                className="rounded-sm"
              />
              <p className="text-md font-semibold">{title}</p>
            </CardHeader>

            <CardBody>
              <p>{description}</p>
            </CardBody>

            <CardFooter>
              <Link
                href={href}
                isExternal
                showAnchorIcon
                className="text-primaryHue"
              >
                Experience
              </Link>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
}
