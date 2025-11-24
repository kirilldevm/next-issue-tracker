const sizeVariant = {
  sm: 'w-3 h-3 border-2',
  md: 'w-4 h-4 border-2',
  lg: 'w-8 h-8 border-4',
};

type Props = {
  size?: keyof typeof sizeVariant;
};

export default function Spinner({ size = 'md' }: Props) {
  return (
    <div
      className={`${sizeVariant[size]} flex items-center justify-center  animate-spin rounded-full  border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  );
}
