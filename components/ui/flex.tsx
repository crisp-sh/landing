"use client";

import React from "react";

type Gap =
  | "0"
  | "px"
  | "0.5"
  | "1"
  | "1.5"
  | "2"
  | "2.5"
  | "3"
  | "3.5"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "16"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "44"
  | "48"
  | "52"
  | "56"
  | "60"
  | "64"
  | "72"
  | "80"
  | "96";

type Justify = "start" | "center" | "end" | "between" | "around" | "evenly";
type Align = "start" | "center" | "end" | "stretch" | "baseline";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export interface FlexGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  vertical?: boolean; // Use col/col-reverse
  reverse?: boolean; // Use row-reverse or col-reverse
  wrap?: boolean;
  gap?: Gap | string;
  gapX?: Gap | string;
  gapY?: Gap | string;
  justify?: Justify;
  align?: Align;
  style?: React.CSSProperties;
}
export interface FlexRowProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  gap?: Gap | string;
  justify?: Justify;
  align?: Align;
  style?: React.CSSProperties;
}
export interface FlexColProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  gap?: Gap | string;
  justify?: Justify;
  align?: Align;
  style?: React.CSSProperties;
}

// Tailwind class helpers
function gapHelper(prefix: string, value?: string) {
  if (!value) return "";
  if (/^\d+(\.\d+)?$/.test(value)) return `${prefix}-${value}`;
  if (value.startsWith(`${prefix}-`)) return value;
  return value;
}

const justifyMap: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};
const alignMap: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

/** The root Flex container */
export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, style, children, ...rest }, ref) => (
    <div ref={ref} className={className} style={style} {...rest}>
      {children}
    </div>
  )
);
Flex.displayName = "Flex";

/** Group: flex (row/col, wrap, gap, align, etc) */
export const FlexGroup = React.forwardRef<HTMLDivElement, FlexGroupProps>(
  (
    {
      vertical = false,
      reverse = false,
      wrap = false,
      gap,
      gapX,
      gapY,
      justify = "start",
      align = "stretch",
      className,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const direction = vertical
      ? reverse
        ? "flex-col-reverse"
        : "flex-col"
      : reverse
      ? "flex-row-reverse"
      : "flex-row";

    const wrapClass = wrap ? "flex-wrap" : "flex-nowrap";

    const classes = [
      "flex",
      direction,
      wrapClass,
      gapHelper("gap", gap),
      gapHelper("gap-x", gapX),
      gapHelper("gap-y", gapY),
      justifyMap[justify],
      alignMap[align],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} style={style} {...rest}>
        {children}
      </div>
    );
  }
);
FlexGroup.displayName = "FlexGroup";

// Shorthand row: for 1 flex row (gap, justify, align)
export const FlexRow = React.forwardRef<HTMLDivElement, FlexRowProps>(
  (
    {
      gap,
      justify = "start",
      align = "center",
      className,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = [
      "flex",
      "flex-row",
      gapHelper("gap", gap),
      justifyMap[justify],
      alignMap[align],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} style={style} {...rest}>
        {children}
      </div>
    );
  }
);
FlexRow.displayName = "FlexRow";

export const FlexCol = React.forwardRef<HTMLDivElement, FlexColProps>(
  (
    {
      gap,
      justify = "start",
      align = "center",
      className,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = [
      "flex",
      "flex-col",
      gapHelper("gap", gap),
      justifyMap[justify],
      alignMap[align],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} style={style} {...rest}>
        {children}
      </div>
    );
  }
);
FlexCol.displayName = "FlexCol";

// Export all together
const FlexCompound = Object.assign(Flex, {
  Group: FlexGroup,
  Row: FlexRow,
  Col: FlexCol,
});

export default FlexCompound;
