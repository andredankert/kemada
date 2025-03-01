import React from "react";
import { content } from "@/data/content";
import { Container } from "@/components/Container";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const { about } = content;

  return (
    <main className="flex-auto">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {about.hero.title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {about.hero.description}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div className="relative">
              <img
                src={about.hero.image}
                alt="Hinter den Kulissen"
                className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Section */}
      <Container className="mt-24 sm:mt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Einblicke
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {about.workshop.title}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {about.workshop.description}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {about.workshop.features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-16 flex justify-center">
            <img
              src={about.workshop.image}
              alt="Werkstatt"
              className="w-full max-w-2xl rounded-xl shadow-xl ring-1 ring-gray-400/10"
            />
          </div>
        </div>
      </Container>

      {/* Production Process Section */}
      <Container className="mt-24 sm:mt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Der Prozess
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {about.production.title}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {about.production.description}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="space-y-8">
              {about.production.steps.map((step, index) => (
                <div key={step.title} className="relative pl-9">
                  <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="mt-24 sm:mt-32 mb-16">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {about.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            {about.cta.description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <Link to={about.cta.button.link}>
                {about.cta.button.text}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
} 