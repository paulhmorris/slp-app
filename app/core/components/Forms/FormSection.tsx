interface IFormSection {
  title: string
  description?: string
  children?: JSX.Element | JSX.Element[]
}

export const FormSection = ({ title, children, description }: IFormSection) => {
  return (
    <>
      <div className="md:col-span-1 mt-8">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        </div>
        {description && (
          <div>
            <p className="text-sm mt-1">{description}</p>
          </div>
        )}
      </div>
      <div className="md:col-span-2 mt-2">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-3 gap-5 max-w-xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}
