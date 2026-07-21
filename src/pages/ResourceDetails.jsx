import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { resources } from "../data/resourcesData";

const ResourceDetails = () => {
  const { id } = useParams();

  const article = resources.find((item) => item.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">
          Resource Not Found
        </h1>

        <Link
          to="/resources"
          className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
        >
          Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">

          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-6"
          >
            <ArrowLeft size={18} />
            Back to Resources
          </Link>

          <h1 className="text-4xl font-bold text-gray-900">
            {article.title}
          </h1>

          {article.titleHi && (
            <p className="text-violet-600 text-xl mt-2">
              {article.titleHi}
            </p>
          )}

          <div className="flex items-center gap-6 mt-5 text-gray-500">

            <div className="flex items-center gap-2">
              <Clock size={18} />
              {article.readTime}
            </div>

            <div className="flex items-center gap-2">
              <BookOpen size={18} />
              Legal Resource
            </div>

          </div>

        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Overview */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-3">
            Overview
          </h2>

          <p className="text-gray-700 leading-8">
            {article.overview}
          </p>

        </div>

        {/* Relevant Law */}
        {article.law && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-semibold mb-3">
              Relevant Law
            </h2>

            <p className="text-gray-700">
              {article.law}
            </p>

          </div>
        )}

        {/* Documents */}
        {article.documents && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-semibold mb-4">
              Required Documents
            </h2>

            <ul className="list-disc ml-6 space-y-2">

              {article.documents.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}

            </ul>

          </div>
        )}

        {/* Steps */}
        {article.steps && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-semibold mb-5">
              Step-by-Step Process
            </h2>

            <div className="space-y-5">

              {article.steps.map((step, index) => (

                <div
                  key={index}
                  className="flex gap-4"
                >

                  <div className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <p className="text-gray-700 flex-1">
                    {step}
                  </p>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Timeline */}
        {article.timeline && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-semibold mb-3">
              Timeline
            </h2>

            <p>{article.timeline}</p>

          </div>
        )}

        {/* Fees */}
        {article.fees && (
          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-semibold mb-3">
              Fees
            </h2>

            <p>{article.fees}</p>

          </div>
        )}

        {/* Helpline */}
        {article.helpline && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">

            <h2 className="text-2xl font-semibold text-red-700 mb-3">
              Emergency Helpline
            </h2>

            <p className="text-lg font-medium">
              {article.helpline}
            </p>

          </div>
        )}

        {/* FAQs */}
        {article.faqs && (
          <div className="bg-white rounded-xl shadow p-6 mb-10">

            <h2 className="text-2xl font-semibold mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">

              {article.faqs.map((faq, index) => (

                <div key={index}>

                  <h3 className="font-semibold text-lg">
                    {faq.question}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {faq.answer}
                  </p>

                </div>

              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ResourceDetails;