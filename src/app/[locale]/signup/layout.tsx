import Image from 'next/image'
export default function SignUpLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen md:bg-none md:items-stretch bg-cover bg-center items-center bg-[url('/Login/Login_Picture.jpg')]">
            <div className="flex-1 mt-0 mb:mt-10">{children}</div>

            <Image
                priority
                alt="A beautiful picture"
                src="/Login/Login_Picture.jpg"
                className="flex-1 hidden md:block"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: 'auto', height: 'auto' }}
            />
        </div>
    )
}
