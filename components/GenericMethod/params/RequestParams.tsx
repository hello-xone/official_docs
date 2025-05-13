"use client";
import React from "react";
import { Text } from "../../Text";
import { TParamType } from "../types";
import { getParamsType } from "../getParamsType";
import { ReqResParam } from "./types";

export interface RequestParamsProps {
  requestParamsType: TParamType;
  requestParams: ReqResParam[] | null;
  isRESTApi?: boolean;
}

export function RequestParams({
  requestParams,
  requestParamsType,
  isRESTApi = false,
}: RequestParamsProps) {
  // Default JSON-RPC fields for non-REST APIs
  const defaultRows = React.useMemo(
    () =>
      isRESTApi
        ? []
        : [
            { name: "id", type: "integer", description: "Request identifier" },
            { name: "jsonrpc", type: "string", description: "JSON-RPC version" },
            { name: "method", type: "string", description: "API method name" },
          ],
    [isRESTApi]
  );

  return (
    <>
      <Text
        uppercase
        color="grayLike"
        size="xs"
        fontWeight="medium"
        component="h2"
        className="mb-2"
      >
        Request params
      </Text>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">Description</th>
            </tr>
          </thead>
          <tbody>
            {defaultRows.map(({ name, type, description }) => (
              <tr key={name} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2"><Text size="sm" fontWeight="medium">{name}</Text></td>
                <td className="px-4 py-2"><Text size="xs" italic color="gray">{type}</Text></td>
                <td className="px-4 py-2"><Text size="sm">{description}</Text></td>
              </tr>
            ))}

            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2"><Text size="sm" fontWeight="medium">Parameters</Text></td>
              <td className="px-4 py-2"><Text size="xs" italic color="gray">{getParamsType(requestParamsType)}</Text></td>
              <td className="px-4 py-2"><Text size="sm">&nbsp;</Text></td>
            </tr>

            {(requestParams ?? []).map((p) => (
              <tr key={p.paramName} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2"><Text size="sm" fontWeight="medium">{p.paramName}</Text></td>
                <td className="px-4 py-2"><Text size="xs" italic color="gray">{p.type}</Text></td>
                <td className="px-4 py-2"><Text size="sm">{p.paramDescription}</Text></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
