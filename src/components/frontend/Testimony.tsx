import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export function Testimony() {
  return (
    <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          <article className="w-full flex-col justify-center lg:items-start items-center gap-4 inline-flex">
            <h2 className="text-clamp-slg font-bold max-w-[27rem] leading-none text-center lg:text-left">
              Our customers love what we do
            </h2>
            <p className="text-xl text-center lg:text-left">
              Transform Your Idea Into Reality With Finsweet
            </p>
            <p className="text-brand-secondary dark:text-brand-secondary2 max-w-[30.75rem] text-center lg:text-left">
              {"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "}
            </p>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/avatars/01.png" alt="Avatar" className="bg-brand-secondary" />
                <AvatarFallback className="bg-brand-secondary">CQ</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarImage src="/avatars/01.png" alt="Avatar" className="bg-brand-secondary" />
                <AvatarFallback className="bg-brand-secondary">CQ</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarImage src="/avatars/01.png" alt="Avatar" className="bg-brand-secondary" />
                <AvatarFallback className="bg-brand-secondary">CQ</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-brand-primary font-bold">30+ 
              <span className="text-sm font-semibold text-brand-secondary"> Customer Reviews</span></p>
          </article>
          <aside className="w-full lg:justify-start justify-center items-start flex">
            <div className="flex w-full flex-col space-y-8 rounded-lg border-l-[6px] border-brand-primary px-7 py-8 md:p-9
            bg-brand-surfaceMain dark:bg-brand-hover">
              <div className="w-full">
                <p className="text-lg font-bold leading-relaxed">
                  {"“Great course I really enjoyed it and the course was way easy to learn with very good explanations of the code, I could easily understand and develop applications with the knowledge gathered during the course.”"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" className="bg-brand-secondary" />
                  <AvatarFallback className="bg-brand-secondary">CQ</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Johnny Andro
                  </p>
                  <p className="text-sm text-brand-secondary">
                    Director, Company
                  </p>
                </div>
                {/* <div className="ml-auto font-medium">+$1,999.00</div> */}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

  )
}