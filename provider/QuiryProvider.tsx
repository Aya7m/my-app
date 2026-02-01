"use client"

import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const QuiryProvider = ({ children }: { children: React.ReactNode }) => {
  const [quiryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={quiryClient}>{children}</QueryClientProvider>
  );
};

export default QuiryProvider;
