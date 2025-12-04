import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisWrapper from "@/components/ui/LenisWrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechsoulStudio",
  description: "Branding and Web Design Agency.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  keywords: [
    "TechsoulStudio",
    "Branding",
    "Web Design",
    "Surat",
    "India",
    "Design",
    "Agency",
    "Digital Marketing",
    "techsoulstudio",
    "branding agency",
    "digital branding company",
    "website development company",
    "ecommerce website development",
    "it solutions company",
    "web design services",
    "digital marketing & branding",
    "business branding service",
    "creative agency",
    "affordable branding agency for startups",
    "best ecommerce website development company",
    "professional website design for small business",
    "custom branding & logo design services",
    "complete IT solutions for business",
    "branding and ecommerce development company",
    "digital branding & web development agency",
    "branding company in India",
    "ecommerce website developer in India",
    "web design agency in India",
    "IT solutions company in India",
    "digital agency near me",
    "best branding agency in India",
    "#TechsoulStudio",
    "#BrandingAgency",
    "#WebDevelopment",
    "#EcommerceSolutions",
    "#DigitalBranding",
    "#ITServices",
    "#WebsiteDesign",
    "#StartupBranding",
    "#OnlineBusiness",
    "#CreativeAgency",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="language" content="English" />
        <meta name="author" content="TechsoulStudio" />
        <meta name="copyright" content="TechsoulStudio" />
        <meta name="distribution" content="Global" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        <meta name="classification" content="Business" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="TechsoulStudio – Branding, Web & E-commerce IT Solutions"
        />
        <meta
          property="og:description"
          content="We provide expert branding, website development, e-commerce solutions & IT services to scale your business globally."
        />
        <meta property="og:url" content="https://techsoulstudio.com" />
        <meta property="og:site_name" content="TechsoulStudio" />
        <meta
          property="og:image"
          content="https://techsoulstudio.com/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="keywords"
          content="
TechsoulStudio,
branding agency,
website development company,
ecommerce website development,
shopify developer,
business branding services,
digital branding agency,
web design company,
it solutions provider,
startup branding agency,
custom website development,
ui ux design services,
online business solutions,
best branding company in India"
        ></meta>

        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="beforeInteractive"
        />
      </head>

      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NTCBH46H');
        `,
        }}
      />
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NTCBH46H"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <LenisWrapper>{children}</LenisWrapper>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
