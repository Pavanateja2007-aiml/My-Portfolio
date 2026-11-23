import { motion } from 'motion/react';
import { PROFILE } from '../data/profile';

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-[#26313A] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs text-[#A0F2B8]">whoami</p>
        <h2
          id="about-heading"
          className="headline-balance mt-3 max-w-2xl text-3xl font-bold tracking-tight text-[#E8EEF2] sm:text-4xl"
        >
          {PROFILE.aboutHeading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Narrative copy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 lg:col-span-7"
          >
            {PROFILE.aboutParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="max-w-[65ch] text-base leading-relaxed text-[#E8EEF2]/90 sm:text-[17px]"
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-4 border-t border-[#26313A]/80">
              <p className="font-mono text-sm text-[#A0F2B8]">
                “{PROFILE.aboutAttitudeLine}”
              </p>
              <p className="mt-2 font-mono text-xs text-[#92A0AA]">
                If it works, I want to know why. Errors are evidence; debugging is investigation.
              </p>
            </div>
          </motion.div>

          {/* Concise technical profile card */}
          <motion.aside
            aria-label="Profile metadata"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-lg border border-[#26313A] bg-[#11171C] p-6 lg:col-span-5"
          >
            <div className="mb-4 flex items-center justify-between border-b border-[#26313A] pb-3 font-mono text-xs">
              <span className="text-[#E8EEF2]">profile.json</span>
              <span className="text-[#92A0AA]">verified record</span>
            </div>

            <dl className="divide-y divide-[#26313A]/70 text-sm">
              {PROFILE.profileFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-12 sm:gap-4"
                >
                  <dt className="font-mono text-xs text-[#92A0AA] sm:col-span-5">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-[#E8EEF2] sm:col-span-7 tabular-nums">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
