"use client"

import { useState } from "react";

const TimeDropdown = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  // const selectedValue = React.useMemo(
  //   () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
  //   [selectedKeys]
  // );

  return <h1>Test</h1>;
}

export default TimeDropdown