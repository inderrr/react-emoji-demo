import HeadTags from "../components/HeadTags";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeadTags />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
