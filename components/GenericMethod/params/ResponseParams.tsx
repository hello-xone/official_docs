"use client";
import React from "react";
import { Text } from "../../Text";
import { IconCircleGreen } from "../../icons/IconCircleGreen";
import { TParamType } from "../types";
import { getParamsType } from "../getParamsType";
import { ReqResParam } from "./types";

export interface ResponseParamsProps {
  responseParams: ReqResParam[] | null;
  responseParamsType: TParamType;
  responseParamsDescription?: string;
}

export function ResponseParams({
  responseParams,
  responseParamsType,
  responseParamsDescription,
}: ResponseParamsProps) {
  // Build default JSON-RPC fields (similar to response status)
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
        Response
      </Text>

      {/* Status and optional description */}
      <div className="flex items-center mb-4">
        <div className="flex items-center gap-2">
          <IconCircleGreen />
          <Text size="sm" fontWeight="medium">
            200
          </Text>
        </div>
        {responseParamsDescription && (
          <Text size="xs" italic color="gray" className="ml-4">
            {responseParamsDescription}
          </Text>
        )}
      </div>

      {/* Parameters table */}
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
            {/* Overall response type row */}
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">
                <Text size="sm" fontWeight="medium">Parameters</Text>
              </td>
              <td className="px-4 py-2">
                <Text size="xs" italic color="gray">{getParamsType(responseParamsType)}</Text>
              </td>
              <td className="px-4 py-2"><Text size="sm">&nbsp;</Text></td>
            </tr>

            {/* Dynamic response params */}
            {(responseParams ?? []).map((p) => (
              <tr key={p.paramName} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">
                  <Text size="sm" fontWeight="medium">{p.paramName}</Text>
                </td>
                <td className="px-4 py-2">
                  <Text size="xs" italic color="gray">{p.type}</Text>
                </td>
                <td className="px-4 py-2">
                  <Text size="sm">{p.paramDescription}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
