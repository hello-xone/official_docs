import SyntaxHighlighter from "react-syntax-highlighter";
import highlightStyle from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import React from "react";
import classes from "./RequestResponseJSON.module.css";
import { Group } from "@mantine/core";
import { Text } from "../../Text";
import { useCopyString } from "../../hooks/useCopyString";
import { IconCircleGreen } from "../../icons/IconCircleGreen";

type Props = {
  json: string;
};

export function RequestResponseJSON({ json }: Props) {
  let { copy } = useCopyString({ value: json });

  return (
    <section className={classes.root}>
      <header className={classes.header}>
        <Group>
          <Text size="xs" color="grayLike" uppercase>
            Response
          </Text>
        </Group>
        <Group gap={6}>
          <span>
            <IconCircleGreen />
          </span>
          <Text size="xs" color="grayLike" uppercase fontWeight="bold">
            200 OK
          </Text>
        </Group>
      </header>

      <section className={classes.codeHighlight}>
        <SyntaxHighlighter
          language={"json"}
          style={highlightStyle}
          lineProps={{
            style: {
              wordBreak: "break-all",
              whiteSpace: "pre-wrap",
              fontSize: "14px",
            },
          }}
          wrapLines={true}
          customStyle={{
            backgroundColor: "transparent",
            padding: 0,
          }}
        >
          {json}
        </SyntaxHighlighter>
      </section>

      <footer className={classes.footer}>
      </footer>
    </section>
  );
}
