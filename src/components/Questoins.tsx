"use client";

import { getData, postData } from "@/libs/axios/backend";
import { useEffect, useState } from "react";

interface Question {
  id: number;
  question_text: string;
  options: {
    A: string;
    B: string;
    C: string;
  };
}

const Questoins = ({
  setCurrentContent,
  id,
}: {
  setCurrentContent: (content: string) => void;
  id: string | null;
}) => {
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);

  //   get questionsData from api
  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const response = await getData("questions");
        const data = await response.questions;
        setQuestionsData(data);

        setAnswers(["A"]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestionsData();
  }, []);

  useEffect(() => {
    if (questionsData.length === 0) {
      setDisabled(true);
      return;
    }

    if (
      answers.length - 1 === questionsData.length &&
      answers.every((answer) => answer !== null)
    ) {
      setDisabled(false);
    }
  }, [answers, questionsData]);

  //   console.log(
  //     answers.length - 1 === questionsData.length &&
  //       answers.every((answer) => answer !== null)
  //   );

  //   submit answers
  const handleAnswers = async () => {
    try {
      await postData(`submit-answers/${id}`, { answers: answers });
      localStorage.removeItem("id");
      setCurrentContent("splash");
      setAnswers([]);
    } catch (error) {
      console.error(error);
    }
  };

  //   console.log(answers);

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="w-[278px] relative text-center justify-start">
        <span className="text-white text-sm font-bold font-['GE_SS_Unique'] leading-tight">
          جاوب علي ال 8 اسئلة صح عشان تدخل معانا السحب علي{" "}
        </span>
        <span className="text-[#e1a12c] text-base font-bold font-['GE_SS_Unique'] leading-tight">
          جوائز ذهبيه
        </span>
      </div>
      <div className="w-[336px] mt-[20px] h-fit bg-[#3e3e3e]/50 rounded-[30px] backdrop-blur-[6.30px] flex flex-col justify-start items-center p-3 overflow-y-auto">
        <div className="w-full max-w-[312px] flex flex-col justify-start items-start gap-4">
          {/* Question Multiple Options */}
          {questionsData?.map((question, index) => (
            <div
              key={question.id}
              className={`w-full rounded-[20px] p-4 ${
                answers[question.id] ? "bg-[#2a2a2a]" : "bg-[#e0e0e0]"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-[244px] text-right text-[#2a2a2a] text-xs font-bold font-['GE_SS_Unique'] leading-tight ${
                    answers[question.id] ? "text-[#fff]" : "text-[#2a2a2a]"
                  }`}
                >
                  {question.question_text}
                </div>
                <div className="w-[30px] h-[30px] px-2.5 py-[5px] bg-[#e1a12c]/80 rounded-full flex justify-center items-center">
                  <div className="text-white text-xs font-bold font-['Inter']">
                    {index + 1}
                  </div>
                </div>
              </div>
              <div className="text-right text-[#2a2a2a] text-xs font-light font-['GE_SS_Unique'] mb-2">
                : الاجابة
              </div>
              <div className="flex flex-col gap-2 items-end">
                {Object.values(question.options).map((option, idx) => (
                  <div
                    onClick={() => {
                      const key = Object.keys(question.options)[idx];
                      const newAnswers = [...answers];
                      newAnswers[question.id] = key;
                      setAnswers(newAnswers);
                    }}
                    key={idx}
                    className="flex w-full justify-end items-center gap-2"
                  >
                    <div
                      className={`${
                        answers[question.id] ===
                        Object.keys(question.options)[idx]
                          ? "text-[#e1a12c]"
                          : answers[question.id]
                          ? "text-white"
                          : "text-[#2a2a2a]"
                      } text-xs font-bold font-['GE_SS_Unique']`}
                    >
                      {option}
                    </div>
                    <div className="w-10 h-10 rounded-full flex justify-center items-center">
                      <div
                        className={`w-[20px] h-[20px] flex items-center justify-center border-2 rounded-full ${
                          answers[question.id] ===
                          Object.keys(question.options)[idx]
                            ? "border-[#e1a12c]"
                            : "border-[#5e5b52]"
                        }`}
                      >
                        <div
                          className={`w-[10px] h-[10px] rounded-full ${
                            answers[question.id] ===
                            Object.keys(question.options)[idx]
                              ? "bg-[#e1a12c]"
                              : ""
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        disabled={disabled}
        onClick={handleAnswers}
        className={`w-[286px] h-[68px] my-[28px] px-[99px] py-6 bg-[#e1a12c] rounded-[20px] inline-flex justify-center items-center gap-2.5 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <div className="relative text-center justify-start text-black text-[20px] font-bold font-['GE_SS_Unique'] leading-none">
          تأكيد
        </div>
      </button>
    </div>
  );
};

export default Questoins;
