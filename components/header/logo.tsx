import Image from 'next/image';
import Link from 'next/link';
import HeaderLogo from '~/public/logo.png';
import { merriweather } from '~/theme/typography';

export const Logo = () => {
  return (
    <Link href='/'>
      <div className='lg:flex hidden items-center'>
        <Image
          src={HeaderLogo}
          alt='Logo'
          width={28}
          height={28}
          className='rounded-full'
        />
        <p
          style={{
            fontFamily: merriweather.style.fontFamily,
          }}
          className='text-white text-xl font-bold ml-2'
        >
          Finance
        </p>
      </div>
    </Link>
  );
};
