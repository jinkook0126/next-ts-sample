import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

type ISRProps = {
  message: string;
};

const ISR: NextPage<ISRProps> = (props) => {
  const { message } = props;

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>이 페이지는 ISR을 통해 빌드 시 생성된 페이지입니다.</p>
        <p>{message}</p>
        <Link href={{ pathname: "/ssr", query: { keyword: "hello" } }}>
          <button>Go To SSR</button>
        </Link>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ISRProps> = async (context) => {
  const timeStamp = new Date().toLocaleString();
  const message = `${timeStamp}에 이 페이지의 getStaticProps가 실행됐습니다.`;

  return {
    props: {
      message,
    },
    revalidate: 60,
  };
};

export default ISR;
