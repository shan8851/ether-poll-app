import { FaRegTimesCircle } from "react-icons/fa";


export const EmptyList: React.FC = () => {
  return (
    <div className='bg-surface max-w-lg w-full flex flex-col gap-4 items-center justify-center mx-auto p-8 border border-border rounded'>
      <FaRegTimesCircle className='text-red text-5xl' />
      <p>No topics found</p>
    </div>
  )
}
