import localFont from "next/font/local";

export const LineSeedSand = localFont({
  src: [
    {
      path: "./line/LINESeedSansTH_W_Th.woff",
      weight: "300",
    },
    {
      path: "./line/LINESeedSansTH_W_Rg.woff",
      weight: "400",
    },
    {
      path: "./line/LINESeedSansTH_W_Bd.woff",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-line-seed-sand",
});
