import Head from "next/head";

const PageHead = ({ title, description = "App Description", path = "/" }) => {
  const pageTitle = "Page title";
  const iconUrl = "/icon.png";
  const fonts = [["Source Sans Pro", "300,400,700"]];

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="manifest" href="/manifest.json" />

      {fonts.map((font) => (
        <link
          key={font[0]}
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css?family=${`${font[0].replace(
            / /g,
            "+"
          )}${font[1] ? ":" + font[1] : ""}`}&display=swap`}
        />
      ))}
      <link rel="stylesheet" href="/app.css" />
      <link rel="shortcut icon" type="image/x-icon" href={iconUrl} />
      <link rel="apple-touch-icon" href={iconUrl} />
    </Head>
  );
};
export default PageHead;
