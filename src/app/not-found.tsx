import { Button } from "@/components/ui/Button";
import { CrownMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] items-center justify-center px-6 py-40 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background: "radial-gradient(60% 60% at 50% 40%, rgba(22,64,111,0.35), transparent 70%)",
        }}
      />
      <div>
        <CrownMark className="mx-auto w-12" />
        <p className="eyebrow mt-10">Error 404</p>
        <h1 className="font-display mt-6 text-5xl leading-tight font-light text-ivory md:text-7xl">
          This one&rsquo;s
          <span className="block text-foil">off the market.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-md text-base text-mist">
          The page you were after has moved or sold. The current list is a click away.
        </p>
        <div className="mt-11 flex flex-wrap justify-center gap-5">
          <Button href="/buy">View listings</Button>
          <Button href="/" variant="outline">
            Back home
          </Button>
        </div>
      </div>
    </section>
  );
}
