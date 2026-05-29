import React, { FC, ReactNode } from "react";
import { Text as RNText, TextProps as RNTextProps, useColorScheme } from "react-native";
import { Fonts } from "@/constants/theme";

type TextType = "h1" | "h2" | "h3" | "sub1" | "sub2" | "label" | "data" | "body";

export type TextProps = RNTextProps & {
  children: ReactNode;
  className?: string;
  type?: TextType;
  ignoreTranslation?: boolean;
};

const Text: FC<TextProps> = ({
  children,
  className = "",
  type = "body",
  ignoreTranslation = false,
  style,
  ...props
}) => {
  const scheme = useColorScheme() ?? "light";

  const variants: Record<TextType, string> = {
    h1: "text-5xl font-bold",
    h2: "text-[40px] font-bold",
    h3: "text-3xl font-bold",
    sub1: "text-2xl font-semibold",
    sub2: "text-xl font-semibold",
    label: "text-base font-semibold",
    data: "text-xs font-medium",
    body: "text-base font-normal",
  };

  return (
    <RNText
      className={`
        not-italic
        ${variants[type]}
        ${className}
      `}
      style={[
        {
          fontFamily: Fonts.sans,
        },
        style,
      ]}
      {...props}
    >
      {/* translation logic here */}
      {children}
    </RNText>
  );
};

export default Text;
