import React, { FC, ReactNode } from "react";
import { Pressable, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import Text from "./Text";

type ButtonType =
  | "primary"
  | "secondary"
  | "destructive"
  | "destructiveOutlined"
  | "success"
  | "flat";

export type CoreButtonProps = {
  title: string;
  buttonTypes?: ButtonType;
  href?: string;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
};

const Button: FC<CoreButtonProps> = ({
  title,
  buttonTypes = "primary",
  href,
  className = "",
  children,
  disabled = false,
  loading = false,
  onPress,
}) => {
  const variantClasses = {
    primary: "bg-main-light border-main",
    secondary: "bg-transparent border-main",
    destructive: "bg-destructive border-destructive-dark",
    destructiveOutlined: "bg-transparent border-destructive",
    success: "bg-successful border-successful-dark",
    flat: "border-gray", //TODO: adding shadow
  };

  const textColor = {
    primary: "text-white",
    secondary: "text-main",
    destructive: "text-white",
    destructiveOutlined: "text-destructive",
    success: "text-white",
    flat: "text-text",
  };

  const content = (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      className={`
        self-start flex-row items-center justify-center
        gap-2 rounded-xl border-2 px-4 py-2
        active:opacity-80
        disabled:opacity-50
        ${variantClasses[buttonTypes]}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator className="text-primary" />
      ) : (
        <>
          {title !== "" && (
            <Text type="label" className={textColor[buttonTypes]}>
              {title}
            </Text>
          )}

          {children}
        </>
      )}
    </Pressable>
  );

  if (href) {
    return <Link href={href as any}>{content}</Link>;
  }

  return content;
};

export default Button;
