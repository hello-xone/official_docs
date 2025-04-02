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
import { Tabs, Tab } from "@nextui-org/react";

const MAINNET_ADDRESSES = [
  "0x26df50102098C19aB4374b2D5572a1bCde38f160",
];
const TESTNET_ADDRESSES = [
  "0xc69751291E117420065c10bc4ba155448a5e7338",
  "0xe433C540419A6ac8CE0BD879748ee9F2e2700d7b",
  "0xD8e19D82166A51EeCc1459563C614C3326dFDF8b",
  "0xd8e369E15621B36Bc71c5d1654b63163eD8071BE",
  "0x056ff3e2e65173b1ab3e18FC5955482358C6e53A",
];

const ValidationTokenList = () => {
  // 当前网络，默认为主网
  const [currentNetwork, setCurrentNetwork] = useState("mainnet");
  const [mainnetTokens, setMainnetTokens] = useState([]);
  const [testnetTokens, setTestnetTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  // 通用的 token 信息加载函数
  const fetchTokenInfo = async (address) => {
    const url = `https://raw.githubusercontent.com/hello-xone/xone_assets/main/blockchains/xone/assets/${address}/info.json`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network error");
      const data = await response.json();
      return { ...data, id: address };
    } catch (error) {
      console.error("Error fetching token info for address:", address, error);
      return null;
    }
  };

  // 加载主网 token 数据
  useEffect(() => {
    const fetchMainnetTokens = async () => {
      setLoading(true);
      const promises = MAINNET_ADDRESSES.map((addr) => fetchTokenInfo(addr));
      const results = await Promise.all(promises);
      setMainnetTokens(results.filter((token) => token !== null));
      setLoading(false);
    };
    fetchMainnetTokens();
  }, []);

  // 加载测试网 token 数据
  useEffect(() => {
    const fetchTestnetTokens = async () => {
      setLoading(true);
      const promises = TESTNET_ADDRESSES.map((addr) => fetchTokenInfo(addr));
      const results = await Promise.all(promises);
      setTestnetTokens(results.filter((token) => token !== null));
      setLoading(false);
    };
    fetchTestnetTokens();
  }, []);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  // 根据当前网络选择对应的 token 数组
  const tokens = currentNetwork === "mainnet" ? mainnetTokens : testnetTokens;

  // 根据搜索条件过滤数据（这里以 token.symbol 为例，按需求可改为 token.name）
  const filteredTokens = useMemo(() => {
    if (!filterValue) return tokens;
    return tokens.filter((token) =>
      token.symbol.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [tokens, filterValue]);

  return (
    <div className="overflow-x-auto pt-2">
      {/* 顶部导航 + 搜索框 */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <Tabs
          selectedKey={currentNetwork}
          onSelectionChange={(val) => {
            setFilterValue(""); // 切换网络时重置搜索
            setCurrentNetwork(val as string);
          }}
        >
          <Tab key="mainnet" title="Mainnet" />
          <Tab key="testnet" title="Testnet" />
        </Tabs>

        <div className="flex items-end gap-2 flex-wrap">
          <span className="text-default-400 text-small whitespace-nowrap">
            Total {filteredTokens.length} tokens
          </span>
          <Input
            isClearable
            placeholder="Search by Token Name"
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
            className="w-[250px] flex-1"
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
              {(token) => {
                const logoUrl = `https://raw.githubusercontent.com/hello-xone/xone_assets/main/blockchains/xone/assets/${token.id}/logo.png`;
                const addressUrl =
                  currentNetwork === "mainnet"
                    ? `https://xscscan.com/token/${token.id}`
                    : `https://testnet.xscscan.com/token/${token.id}`;
                return (
                  <TableRow key={token.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={logoUrl}
                          alt={token.name}
                          className="w-8 h-8 rounded"
                        />
                        <div>
                          <p className="font-bold">
                            {token.name}{" "}
                            <span className="text-sm text-default-400">
                              ({token.symbol})
                            </span>
                          </p>
                          <Link
                            isExternal
                            showAnchorIcon
                            href={token.website}
                            className='text-primaryHue text-sm truncate max-w-[150px] md:max-w-none'
                          >
                            Website
                          </Link>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        isExternal
                        showAnchorIcon
                        href={addressUrl}
                        className='text-primaryHue text-sm truncate max-w-[150px] md:max-w-none hover:underline'
                      >
                        {token.id}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              }}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ValidationTokenList;
