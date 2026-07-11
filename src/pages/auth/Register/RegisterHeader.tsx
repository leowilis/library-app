import Logo from '@/assets/logo/logo.svg';

export default function RegisterHeader() {
  return (
    <>
      <div className='mb-6 flex items-center gap-4'>
        <img src={Logo} width={33} height={33} alt='Booky logo' />
        <span className='text-2xl font-bold'>Booky</span>
      </div>
      <h1 className='mb-3 text-2xl font-bold'>Register</h1>
      <p className='mb-6 text-sm font-semibold text-neutral-700'>
        Create your account to start borrowing books.
      </p>
    </>
  );
}
