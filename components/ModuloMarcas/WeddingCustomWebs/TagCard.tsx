import { FunctionComponent, useMemo, type CSSProperties } from "react";

type VariantNegativeSizeMNumeType = {
  pillText?: string;

  /** Style props */
  variantNegativeSizeMNumeBackgroundColor?: CSSProperties["backgroundColor"];
  variantNegativeSizeMNumeBorder?: CSSProperties["border"];
  pillColor?: CSSProperties["color"];
};

const VariantNegativeSizeMNume: FunctionComponent<
  VariantNegativeSizeMNumeType
> = ({
  pillText,
  variantNegativeSizeMNumeBackgroundColor,
  variantNegativeSizeMNumeBorder,
  pillColor,
}) => {
  const variantNegativeSizeMNume1Style: CSSProperties = useMemo(() => {
    return {
      backgroundColor: variantNegativeSizeMNumeBackgroundColor,
      border: variantNegativeSizeMNumeBorder,
    };
  }, [variantNegativeSizeMNumeBackgroundColor, variantNegativeSizeMNumeBorder]);

  const pillStyle: CSSProperties = useMemo(() => {
    return {
      color: pillColor,
    };
  }, [pillColor]);

  return (
    <div
      className="rounded-xl bg-negative-background-light overflow-hidden flex flex-row items-center justify-center py-1 px-2 text-center text-2xs text-text-negative font-caption-s border-[1px] border-solid border-negative-muted"
      style={variantNegativeSizeMNume1Style}
    >
      <div
        className="relative leading-[16px] uppercase font-semibold"
        style={pillStyle}
      >
        {pillText}
      </div>
    </div>
  );
};

export default VariantNegativeSizeMNume;
