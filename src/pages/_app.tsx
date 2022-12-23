import '../styles/global.css';

import type { TApp } from '@/types';

const MyApp = ({ Component, pageProps }: TApp) => <Component {...pageProps} />;

export default MyApp;
