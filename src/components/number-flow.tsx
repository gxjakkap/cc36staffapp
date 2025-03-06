"use client";

import { memo, useEffect, useState } from "react";
import NumberFlowReact, {
  continuous,
  type NumberFlowProps,
  type Value,
} from "@number-flow/react";

export const NumberFlow = memo(({ value, ...props }: NumberFlowProps) => {
  const [initValue, setInitValue] = useState<Value>(0);

  useEffect(() => {
    setInitValue(value);
  }, [value]);

  return (
    <NumberFlowReact
      value={initValue}
      trend={0}
      plugins={[continuous]}
      willChange
      {...props}
    />
  );
});

NumberFlow.displayName = "NumberFlow";
