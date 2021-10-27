import React from "react";
import Box from "@mui/material/Box";

interface CenteredLayoutProps {
  children?: React.ReactNode
}

export default function CenteredLayout({children}: CenteredLayoutProps) {

  return (
    <Box>
      {children}
    </Box>
  )
}
