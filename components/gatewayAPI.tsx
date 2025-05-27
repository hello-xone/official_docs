import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

export default function GatewayAPI() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-black px-4 py-10">
        <ApiReferenceReact
          configuration={{
            spec: {
              url: "/gateway.yaml",
            },
          }}
        />
    </div>
  );
}
