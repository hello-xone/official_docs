import { Inter } from "next/font/google";
import { Grid } from "@mantine/core";
import { CodeSnippetObject, TParamType } from "./types";
import React from "react";
import { RequestSnippetSelectors } from "./snippets/RequestSnippetSelectors";
import { RequestSnippet } from "./snippets/RequestSnippet";
import { RequestResponseJSON } from "./params/RequestResponseJSON";
import Head from "next/head";
import { ReqResParam } from "./params/types";
import { RequestParams } from "./params/RequestParams";
import { ResponseParams } from "./params/ResponseParams";

const inter = Inter({ subsets: ["latin"] });

export type GenericMethodProps = {
  // Simple types
  method: string;
  network: string;
  cu: number;
  description: string;
  useCases: string[];
  constraints: string[];
  responseJSON: string;

  // Complex types
  codeSnippets: CodeSnippetObject[];
  requestParams: ReqResParam[];
  requestParamsType: TParamType;

  responseParams: ReqResParam[];
  responseParamsType: TParamType;
  responseParamsDescription?: string;

  // Replace code snippets URL with different URL
  replaceCodeSnippetsURLFrom?: string;
  replaceCodeSnippetsURLTo?: string;

  // Misc
  isRESTApi?: boolean;
};

export type GenericMethodPropsReplacing = Pick<
  GenericMethodProps,
  "replaceCodeSnippetsURLFrom" | "replaceCodeSnippetsURLTo"
> & {
  network?: string;
};

export default function GenericMethod({
  method,
  network,
  description,
  codeSnippets,
  responseJSON,
  requestParams,
  requestParamsType,
  responseParams,
  responseParamsType,
  responseParamsDescription,
  replaceCodeSnippetsURLFrom,
  replaceCodeSnippetsURLTo,
  isRESTApi,
}: GenericMethodProps) {
  const [snippet, setSnippet] = React.useState<CodeSnippetObject["language"]>(
    codeSnippets?.[0]?.language || null
  );

  const snippetCode = React.useMemo(() => {
    const codeSnippetString =
      codeSnippets.find((s) => s.language === snippet)?.code() || null;
    // Replace the URL in the code snippet if the URL is provided
    // For identical cases such as Optimism and Ethereum, we can replace the URL
    if (
      codeSnippetString &&
      replaceCodeSnippetsURLFrom &&
      replaceCodeSnippetsURLTo
    ) {
      return codeSnippetString.replaceAll(
        replaceCodeSnippetsURLFrom,
        replaceCodeSnippetsURLTo
      );
    }
    return codeSnippetString;
  }, [
    codeSnippets,
    snippet,
    replaceCodeSnippetsURLFrom,
    replaceCodeSnippetsURLTo,
  ]);

  const snippetLanguage = React.useMemo(() => {
    return codeSnippets.find((s) => s.language === snippet)?.language || null;
  }, [codeSnippets, snippet]);

  const metaNetwork = React.useMemo(() => {
    // Capitalize the first letter of the network
    return network.charAt(0).toUpperCase() + network.slice(1);
  }, [network]);

  return (
    <>
      <Head>
        <title>{`${method}`}</title>
        <meta name="description" content={description}></meta>
      </Head>

      <Grid className={inter.className} gutter={20} pt={14}>
        <Grid.Col span={12}>
          <RequestSnippetSelectors
            snippets={codeSnippets || []}
            currentLang={snippet}
            onSelect={setSnippet}
          />
        </Grid.Col>

        <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
          <div className="flex-1">
            <RequestSnippet snippet={snippetCode} language={snippetLanguage} />
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <RequestResponseJSON json={responseJSON} />
          </div>
        </div>


        <Grid.Col span={12} className="mt-4">
          <RequestParams
            requestParams={requestParams}
            requestParamsType={requestParamsType}
            isRESTApi={isRESTApi}
          />
        </Grid.Col>

        <Grid.Col span={12} className="mt-4">
          <ResponseParams
            responseParams={responseParams}
            responseParamsType={responseParamsType}
            responseParamsDescription={responseParamsDescription}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
