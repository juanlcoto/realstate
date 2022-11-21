export default function Footer() {

  const year = new Date().getFullYear()

  return (
    <div className="mx-auto container py-12 ">
      <div className="mt-8 md:order-1 md:mt-0">
        <p className="text-center text-base text-gray-400">&copy;{year} Real State, Inc. All rights reserved.</p>
      </div>
    </div>
  )
}
