import React from "react";

const page = () => {
  return (
    <main
      className="relative px-4 py-16 sm:px-6 lg:px-8"
      style={{ background: "#f5f3ef" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
        }}
      />
      <div className="container">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-base leading-7 text-neutral-600 sm:text-lg">
            At Outright Creators, we respect your privacy and are committed to
            protecting any personal information you share with us.
          </p>
        </div>

        <div className="space-y-10 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-10">
          {/* Introduction */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Introduction
            </h2>

            <p className="text-base leading-8 text-neutral-700">
              At Outright Creators, we respect your privacy and are committed to
              protecting any personal information you share with us. This
              Privacy Policy outlines how we collect, use, and safeguard your
              data when you visit our website
              <span className="font-medium text-black">
                {" "}
                <a target="_blank" href="https://outrightcreators.com/">
                  https://outrightcreators.com/
                </a>
              </span>
              .
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Information We Collect
            </h2>

            <p className="mb-4 text-base leading-8 text-neutral-700">
              We may collect the following types of information:
            </p>

            <div className="space-y-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-2 text-lg font-semibold text-black">
                  Personal Information
                </h3>

                <p className="text-base leading-7 text-neutral-700">
                  Name, email address, phone number, and any other details you
                  provide when contacting us.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-2 text-lg font-semibold text-black">
                  Technical Data
                </h3>

                <p className="text-base leading-7 text-neutral-700">
                  IP address, browser type, and device information collected
                  through cookies and analytics tools.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-2 text-lg font-semibold text-black">
                  Usage Data
                </h3>

                <p className="text-base leading-7 text-neutral-700">
                  Information about how you interact with our website and
                  services.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              How We Use Your Information
            </h2>

            <p className="mb-4 text-base leading-8 text-neutral-700">
              We use your information for:
            </p>

            <ul className="space-y-3 text-base leading-7 text-neutral-700">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                <span>Providing and improving our services.</span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                <span>
                  Responding to inquiries or customer support requests.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                <span>
                  Sending updates, promotions, or marketing materials (only if
                  you opt-in).
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                <span>
                  Ensuring website security and preventing fraudulent
                  activities.
                </span>
              </li>
            </ul>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Data Protection & Security
            </h2>

            <p className="text-base leading-8 text-neutral-700">
              We implement industry-standard security measures to protect your
              personal data. However, no online data transmission is 100%
              secure, and we encourage users to be cautious when sharing
              sensitive information.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Cookies & Tracking Technologies
            </h2>

            <p className="text-base leading-8 text-neutral-700">
              We use cookies to enhance user experience and collect insights
              about website performance. You can manage cookie preferences in
              your browser settings.
            </p>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Third-Party Links
            </h2>

            <p className="text-base leading-8 text-neutral-700">
              Our website may contain links to third-party websites. We are not
              responsible for their privacy practices, and we recommend
              reviewing their privacy policies separately.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
