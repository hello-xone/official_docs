import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Link,
} from "@nextui-org/react";
import { Tabs, Tab, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem } from "@heroui/react";
import { CopyToClipboard } from "@/components/CopyToClipboard";

// 定义各网络常量及浏览器 URL
const NETWORKS = [
  { key: "xone", name: "Xone", logo: "/network/xone.svg" },
  { key: "bsc", name: "BNB Smart Chain", logo: "/network/bsc.svg" },
  { key: "ethereum", name: "Ethereum", logo: "/network/ethereum.svg" },
  { key: "tron", name: "Tron", logo: "/network/tron.svg" },
];

const EXPLORER_URLS = {
  mainnet: {
    xone: "https://xonescan.com/token",
    bsc: "https://bscscan.com/token",
    ethereum: "https://etherscan.io/token",
    tron: "https://tronscan.org/#/token",
  },
  testnet: {
    xone: "https://testnet.xonescan.com/token",
    bsc: "https://testnet.bscscan.com/token",
    ethereum: "https://sepolia.etherscan.io//token",
    tron: "https://testnet.tronscan.org/#/token",
  },
};

export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const NETWORK_OPTIONS = [
  { key: "xone", label: "Xone", icon: "/network/xone.svg" },
  { key: "bsc", label: "BNB Smart Chain", icon: "/network/bsc.svg" },
  { key: "ethereum", label: "Ethereum", icon: "/network/ethereum.svg" },
  { key: "tron", label: "Tron", icon: "/network/tron.svg" },
];

interface NetworkInfo {
  address: string;
  decimals: number;
}

interface TokenNetworks {
  [chain: string]: {
    mainnet?: NetworkInfo;
    testnet?: NetworkInfo;
  };
}

interface TokenMetadata {
  name: string;
  website?: string;
  logo?: string;
  description?: string;
  networks: TokenNetworks;
}

type TokenMap = {
  [symbol: string]: TokenMetadata;
};

let tokenMapCache: TokenMap | null = null;

const getTokenMap = async (): Promise<TokenMap> => {
  if (!tokenMapCache) {
    try {
      const response = await fetch("/tokenMetadata.json");
      tokenMapCache = await response.json();
    } catch (e) {
      console.error("Failed to load token map:", e);
      tokenMapCache = {};
    }
  }
  return tokenMapCache;
};

const ValidationTokenList = () => {
  const [networkType, setNetworkType] = useState("mainnet"); // "mainnet" 或 "testnet"
  // 默认选中所有网络（选项中的所有 key）
  const [selectedNetworks, setSelectedNetworks] = useState<Set<string>>(new Set(
    NETWORK_OPTIONS.map((option) => option.key)
  ));
  const [tokens, setTokens] = useState([]); // 合并后的 token 数组
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(false);

  const loadTokens = async () => {
    const tokenMap = await getTokenMap();
    console.log("Loaded tokenMap:", tokenMap);
    const resultsMap: { [symbol: string]: any } = {};
    for (const [symbol, tokenInfo] of Object.entries(tokenMap)) {
      const { name, website, logo, networks } = tokenInfo;
      if (!networks) continue;
      const addresses = [];
      for (const chainKey of Object.keys(networks)) {
        // 如果当前选中的网络不包含 chainKey，则跳过
        if (!selectedNetworks.has(chainKey)) continue;
        const chainData = networks[chainKey];
        if (!chainData) continue;
        const networkData = chainData[networkType];
        if (!networkData || !networkData.address) continue;
        const explorer = EXPLORER_URLS[networkType]?.[chainKey] ?? "";
        addresses.push({
          chain: chainKey,
          id: networkData.address,
          explorer,
        });
      }
      if (addresses.length > 0) {
        resultsMap[symbol] = {
          name,
          symbol,
          website,
          logo,
          addresses,
        };
      }
    }
    const results = Object.values(resultsMap);
    console.log("Processed tokens:", results);
    return results;
  };

  useEffect(() => {
    let isCancelled = false;
    const fetchTokens = async () => {
      setLoading(true);
      try {
        const loadedTokens = await loadTokens();
        if (!isCancelled) {
          setTokens(loadedTokens);
        }
      } catch (err) {
        console.error("Failed to load tokens:", err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    fetchTokens();
    return () => {
      isCancelled = true;
    };
  }, [selectedNetworks, networkType]);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const filteredTokens = useMemo(() => {
    if (!filterValue) return tokens;
    return tokens.filter((token) =>
      token.symbol.toLowerCase().includes(filterValue.toLowerCase()) ||
      token.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [tokens, filterValue]);

  const getScanUrl = (explorer: string, address: string) => {
    if (!explorer) return "#";
    return explorer.endsWith("/") ? `${explorer}${address}` : `${explorer}/${address}`;
  };

  return (
    <div className="overflow-x-auto pt-2">
      <div className="flex justify-between items-center mb-4 gap-2">
        {/* 左侧区域：Tabs + Dropdown */}
        <div className="flex items-center gap-3">
          <Tabs
            onSelectionChange={(val) => {
              setFilterValue("");
              setNetworkType(String(val));
            }}
            selectedKey={networkType}
          >
            <Tab key="mainnet" title="Mainnet" />
            <Tab key="testnet" title="Testnet" />
          </Tabs>

          {/* Dropdown 与 Tabs 间隔 12px（gap-3 可调整） */}
          <Dropdown>
            <DropdownTrigger>
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Networks
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              aria-label="Network Filter"
              selectionMode="multiple"
              selectedKeys={selectedNetworks}
              onSelectionChange={(keys) => {
                const newKeys = keys as unknown as Set<string>;
                setSelectedNetworks(newKeys);
              }}
            >
              {NETWORK_OPTIONS.map((option) => (
                <DropdownItem key={option.key} className="capitalize">
                  <div className="flex items-center gap-2">
                    <img src={option.icon} alt={option.label} className="w-4 h-4" />
                    {option.label}
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* 右侧区域：统计与搜索，靠右显示 */}
        <div className="flex items-center gap-2">
          <span className="text-default-400 text-small">
            Total {filteredTokens.length} tokens
          </span>
          <Input
            isClearable
            placeholder="Search by Token Name"
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
            className="w-[250px]"
          />
        </div>
      </div>


      <div className="overflow-x-auto">
        {loading ? (
          <div>Loading tokens...</div>
        ) : (
          <Table
            removeWrapper
            className="mt-2 w-full min-w-[600px]"
            aria-label="Validation Token List Table"
          >
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Address</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No tokens found" items={filteredTokens}>
              {(token) => (
                <TableRow key={token.symbol}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img src={token.logo} alt={token.name} className="w-8 h-8 rounded" />
                      <div>
                        <p className="font-bold">
                          {token.name}{" "}
                          <span className="text-sm text-default-400">
                            ({token.symbol})
                          </span>
                        </p>
                        {token.website && (
                          <Link
                            isExternal
                            showAnchorIcon
                            href={token.website}
                            className="text-primaryHue text-sm truncate max-w-[150px] md:max-w-none"
                          >
                            Website
                          </Link>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      {token.addresses.map((addrInfo) => {
                        const chainLogo = NETWORKS.find((n) => n.key === addrInfo.chain)?.logo;
                        return (
                          <div
                            key={addrInfo.chain}
                            className="flex items-center gap-[5px] truncate"
                          >
                            <img src={chainLogo} alt={addrInfo.chain} className="w-4 h-4" />
                            <Link
                              isExternal
                              showAnchorIcon
                              href={getScanUrl(addrInfo.explorer, addrInfo.id)}
                              className="text-primaryHue text-sm truncate hover:underline"
                            >
                              {addrInfo.id}
                            </Link>
                            <CopyToClipboard value={addrInfo.id} iconSize={16} />
                          </div>
                        );
                      })}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ValidationTokenList;
