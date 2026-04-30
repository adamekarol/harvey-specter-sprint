import { LetsTalkBtn } from "./LetsTalkBtn";

export function Footer() {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-0 bg-black overflow-hidden">

      {/* Mobile top */}
      <div className="min-[900px]:hidden px-4 pt-12 flex flex-col gap-6 pb-6">
        <div className="flex flex-col gap-3">
          <p className="font-light italic text-white text-[24px] tracking-[-0.96px] uppercase leading-[1.1]">
            Have a <span className="font-black not-italic">project</span> in mind?
          </p>
          <LetsTalkBtn className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.56px] px-4 py-3 rounded-full" />
        </div>
        <div className="flex flex-col gap-4">
          {["Facebook", "Instagram", "X.com", "Linkedin"].map((s) => (
            <a key={s} href="#" className="text-white text-[18px] tracking-[-0.72px] uppercase leading-[1.1]">{s}</a>
          ))}
        </div>
      </div>

      {/* Desktop top */}
      <div className="hidden min-[900px]:flex items-start justify-between px-8 pt-12 pb-12">
        <div className="flex flex-col gap-3 w-[298px]">
          <p className="font-light italic text-white text-[24px] tracking-[-0.96px] uppercase leading-[1.1]">
            Have a <span className="font-black not-italic">project</span> in mind?
          </p>
          <LetsTalkBtn className="self-start border border-white text-white text-[14px] font-medium tracking-[-0.56px] px-4 py-3 rounded-full" />
        </div>
        <div className="flex flex-col gap-0.5 text-center">
          <a href="#" className="text-white text-[18px] tracking-[-0.72px] uppercase leading-[1.1]">Facebook</a>
          <a href="#" className="text-white text-[18px] tracking-[-0.72px] uppercase leading-[1.1]">Instagram</a>
        </div>
        <div className="flex flex-col gap-0.5 text-right">
          <a href="#" className="text-white text-[18px] tracking-[-0.72px] uppercase leading-[1.1]">X.com</a>
          <a href="#" className="text-white text-[18px] tracking-[-0.72px] uppercase leading-[1.1]">Linkedin</a>
        </div>
      </div>

      <div className="px-4 min-[900px]:px-8">
        <div className="w-full h-px bg-white/20" />
      </div>

      {/* Mobile bottom */}
      <div className="min-[900px]:hidden px-4 pt-8 flex flex-col gap-3 overflow-hidden">
        <div className="flex justify-center gap-[34px] items-center text-white text-[12px] tracking-[-0.48px] uppercase">
          <a href="#" className="underline">Licences</a>
          <a href="#" className="underline">Privacy policy</a>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <p className="font-mono text-white text-[10px] uppercase leading-[1.1]">[ Coded By Claude ]</p>
          <p className="text-white font-semibold capitalize leading-[0.8] text-center" style={{ fontSize: "23.4vw", letterSpacing: "-1.4vw" }}>
            H.Studio
          </p>
        </div>
      </div>

      {/* Desktop bottom */}
      <div className="hidden min-[900px]:flex items-end gap-12 px-8 pb-2" style={{ marginTop: "120px" }}>
        <div className="flex items-center gap-4">
          <p
            className="font-mono text-white text-[10px] uppercase leading-[1.1] shrink-0"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            [ Coded By Claude ]
          </p>
          <p className="text-white font-semibold capitalize leading-[0.7]" style={{ fontSize: "20.14vw", letterSpacing: "-1.21vw" }}>
            H.Studio
          </p>
        </div>
        <div className="w-[20%] flex flex-wrap justify-end gap-x-[34px] gap-y-2 text-white text-[12px] tracking-[-0.48px] uppercase">
          <a href="#" className="underline whitespace-nowrap">Licences</a>
          <a href="#" className="underline whitespace-nowrap">Privacy policy</a>
        </div>
      </div>

    </footer>
  );
}
