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
        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-base leading-7 text-neutral-600 sm:text-lg">
            Welcome to Outright Creators! By accessing and using our website,
            you agree to comply with the following Terms & Conditions.
          </p>
        </div>

        {/* Content Wrapper */}
        <div className="space-y-10 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm sm:p-10">
          {/* Intro */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Terms & Conditions for Outright Creators
            </h2>

            <p className="text-base leading-8 text-neutral-700">
              Welcome to Outright Creators! By accessing and using our website
              <span className="font-medium text-black">
                {" "}
                <a target="_blank" href="https://outrightcreators.com/">
                  https://outrightcreators.com/
                </a>
              </span>
              , you agree to comply with the following Terms & Conditions.
              Please read them carefully.
            </p>
          </section>

          {/* Acceptance */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Acceptance of Terms
            </h2>

            <p className="text-base leading-8 text-neutral-700">
              By using our website, you accept these Terms. If you do not agree,
              please refrain from using our services.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Intellectual Property
            </h2>

            <p className="text-base leading-8 text-neutral-700">
              All content, including text, images, videos, and designs on our
              website, is the property of Outright Creators. Unauthorized
              reproduction, distribution, or modification is strictly
              prohibited.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              User Responsibilities
            </h2>

            <ul className="space-y-3 text-base leading-7 text-neutral-700">
              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                <span>
                  You agree to use our website for lawful purposes only.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                <span>
                  You will not engage in activities that harm the website or
                  other users.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                <span>
                  You will not misuse our contact forms for spam or fraudulent
                  purposes.
                </span>
              </li>
            </ul>
          </section>

          {/* Development Support */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Web/App Development Support and Branding
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-2 text-lg font-semibold text-black">
                  Total Support Period
                </h3>

                <p className="text-base leading-7 text-neutral-700">
                  Projects include a total 6-month support period, commencing
                  upon final deployment.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-2 text-lg font-semibold text-black">
                  Support Breakdown
                </h3>

                <p className="text-base leading-7 text-neutral-700">
                  This 6-month period consists of an initial 30-day bug-fix
                  warranty followed by a 5-month Annual Maintenance Contract
                  (AMC).
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-2 text-lg font-semibold text-black">
                  Branding Requirement (Condition for AMC)
                </h3>

                <p className="text-base leading-7 text-neutral-700">
                  The continuation of the 5-month AMC is strictly conditional
                  upon the client retaining the mandatory "Powered by Outright
                  Creators" branding/link in the footer or designated area of
                  the developed application.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-2 text-lg font-semibold text-black">
                  Consequence of Removal
                </h3>

                <p className="text-base leading-7 text-neutral-700">
                  Removal of the branding at any point during the 6-month period
                  (after the initial 30-day warranty) will automatically and
                  explicitly void the remainder of the 5-month AMC support
                  contract.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-2 text-lg font-semibold text-black">
                  Forfeiture of Support
                </h3>

                <p className="text-base leading-7 text-neutral-700">
                  Clients who remove the branding will forfeit/lose all
                  remaining AMC support, and Outright Creators will no longer be
                  responsible for any subsequent maintenance or performance
                  issues under the AMC agreement.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Service Disclaimer
            </h2>

            <p className="text-base leading-8 text-neutral-700">
              Our services and website content are provided "as is." We make no
              warranties regarding accuracy, reliability, or availability.
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-black">
              Limitation of Liability
            </h2>

            <p className="text-base leading-8 text-neutral-700">
              Outright Creators shall not be liable for any indirect,
              incidental, or consequential damages resulting from the use of our
              website or services.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
