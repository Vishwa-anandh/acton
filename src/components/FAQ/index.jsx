import { useState } from "react";
import { FAQList } from "./DynamicQuestion";

const previewCount = 7;

const FAQuestion = () => {
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const visibleQuestions = showAll
    ? FAQList
    : FAQList.slice(0, previewCount);

  return (
    <div className="section-shell grid grid-cols-[minmax(260px,0.68fr)_minmax(0,1.32fr)] gap-[clamp(46px,8vw,100px)] items-start mw820:grid-cols-1 mw820:gap-9">
      <div className="section-heading sticky top-[120px] self-start h-max mw820:static mw820:max-w-[650px]">
        <p className="eyebrow">Good to know</p>
        <h2>Questions from families, answered.</h2>
        <p>
          Find quick details about classes, registration, tuition, placement,
          and volunteering.
        </p>
        {/* <a className="text-link" href="mailto:actontamilschool@gmail.com">
          Still have a question?
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </a> */}
      </div>
      <div>
        <div className="border-t border-line">
          {visibleQuestions.map((value, index) => (
            <details
              open={openIndex === index}
              key={value.Question}
              className="group border-b border-line"
            >
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === index ? -1 : index);
                }}
                className="relative flex items-center min-h-[72px] py-5 pr-[52px] text-ink text-[1.01rem] font-[690] tracking-control leading-[1.45] list-none cursor-pointer [&::-webkit-details-marker]:hidden before:absolute before:top-1/2 before:right-1 before:w-4 before:h-[1.5px] before:rounded-full before:bg-ink before:content-[''] before:transition-transform before:duration-[180ms] before:ease after:absolute after:top-1/2 after:right-1 after:w-4 after:h-[1.5px] after:rounded-full after:bg-ink after:content-[''] after:transition-transform after:duration-[180ms] after:ease after:rotate-90 group-open:after:rotate-0 mw560:min-h-[64px] mw560:py-4 mw560:pr-9 mw560:text-[0.96rem]"
              >
                {value.Question}
              </summary>
              <div className="pt-0 pr-11 pb-6 text-ink-soft text-[0.96rem] leading-[1.7] [&_a]:text-maroon [&_a]:font-[650] [&_a]:[overflow-wrap:anywhere] mw560:pr-5 mw560:pb-5 mw560:text-[0.92rem] mw560:leading-[1.62]">
                {value.Answer}
              </div>
            </details>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 mt-5 py-[9px] px-0 border-0 bg-transparent text-maroon text-[0.91rem] font-bold tracking-control hover:text-maroon-dark"
          onClick={() => setShowAll((current) => !current)}
          aria-expanded={showAll}
        >
          {showAll
            ? "Show fewer questions"
            : `View all ${FAQList.length} questions`}
          <i
            className={`bi ${showAll ? "bi-chevron-up" : "bi-chevron-down"}`}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default FAQuestion;
