import Image from 'next/image'
export default function SignUpLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen">
            <div className="flex-1">{children}</div>

            <Image
                priority
                alt="A beautiful picture"
                src="/Login/Login_Picture.jpg"
                className="flex-1"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: 'auto', height: 'auto' }}
            />
        </div>
    )
}
