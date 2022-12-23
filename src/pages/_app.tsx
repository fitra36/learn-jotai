import '../styles/global.css';

import Main from '@/templates/Main';
import type { TAppProps } from '@/types';

const MyApp = ({ Component, pageProps }: TAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => <Main>{page}</Main>);

  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
