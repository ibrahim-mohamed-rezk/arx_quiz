"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Questoins from "./Questoins";
import { postData } from "@/libs/axios/backend";

const Form = () => {
  const [currentContent, setCurrentContent] = useState<string>("splash");
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    setCustomerId(localStorage.getItem("id"));
  }, [customerId, currentContent]);

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setTimeout(() => {
      if (currentContent === "message") {
        return;
      } else if (customerId !== null) {
        setCurrentContent("questions");
      } else {
        setCurrentContent("form");
      }
    }, 2000);
  }, [customerId, currentContent]);

  //   rigister
  const handleRegister = async () => {
    try {
      const response = await postData("register", formData);
      setError(false);
      setCurrentContent("questions");
      localStorage.setItem("id", response.customer.id);
      setId(response.customer.id);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  return (
    <div
      className={`w-full ${
        currentContent === "questions" ? "h-auto min-h-screen " : "h-screen  "
      } relative bg-[#2a2a2a] overflow-hidden flex justify-center`}
    >
      <div
        className={`flex items-center justify-start flex-col mt-[190px] z-50 ${
          currentContent === "questions" ? " gap-[0]" : "gap-[50px]"
        }`}
      >
        {/* splash */}
        <div
          className={`flex items-center justify-center flex-col duration-[1s]  `}
        >
          <Image
            className={`duration-[1s] ${
              currentContent === "form"
                ? "translate-y-[-20px]"
                : currentContent === "questions"
                ? "translate-y-[-60px] translate-x-[-100px]"
                : "translate-y-[20px]"
            }`}
            width={101}
            height={85}
            src="/images/logo.svg"
            alt="logo"
          />
          {currentContent === "form" && (
            <div className="w-[278px] relative text-center justify-start text-white text-sm font-bold font-['GE_SS_Unique']">
              اكمل بياناتك للمشاركه في المسابقه الخاصه بالحفل الرمضاني
            </div>
          )}
        </div>

        <div className="flex items-center justify-center duration-[1s]">
          {/* ramadan image */}
          <div
            className={`transition-opacity duration-[1s] ${
              currentContent === "splash" ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            <Image
              width={200}
              height={190}
              src="/images/ramadan.svg"
              alt="logo"
            />
          </div>

          {/* form */}
          <div
            className={`transition-opacity duration-[1s] w-full ${
              currentContent === "form" ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            <div className="w-full flex flex-col items-center justify-center relative">
              <div className="flex flex-col items-center justify-center">
                <div className="w-[292px] inline-flex flex-col justify-start items-start gap-[30px]">
                  <div
                    className={`self-stretch h-[59px] px-5 py-[18px] rounded-2xl border ${
                      error ? "border-red-500" : "border-[#e1a12c]"
                    } inline-flex justify-end items-center gap-2.5`}
                  >
                    <input
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      type="text"
                      placeholder="ادخل اسمك بالكامل"
                      className="w-full bg-transparent outline-none text-white text-sm font-normal font-['Cairo'] text-right"
                    />
                  </div>
                  <div
                    className={`self-stretch h-[59px] px-[19px] py-[18px] rounded-2xl border ${
                      error ? "border-red-500" : "border-[#e1a12c]"
                    } inline-flex justify-end items-center gap-2.5`}
                  >
                    <input
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      type="tel"
                      placeholder="ادخل رقم هاتفك"
                      className="w-full bg-transparent outline-none text-white text-sm font-normal font-['Cairo'] text-right"
                    />
                  </div>
                  <button
                    onClick={handleRegister}
                    className="w-[292px] h-[59px] px-[116px] py-2.5 bg-[#e1a12c] rounded-2xl border border-[#e1a12c] inline-flex justify-center items-center gap-2.5"
                  >
                    <div className="flex items-center justify-center w-fit text-nowrap text-white font-bold font-['GE_SS_Unique']">
                      جاوب واكسب
                    </div>
                    <div className="flex items-center justify-center">
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5 19.5L17.5 12.5L11.5 5.5"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          opacity="0.5"
                          d="M7.5 19.5L13.5 12.5L7.5 5.5"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* absolute socials */}
              <div className="absolute bottom-[-300px] left-auto right-auto z-50 inline-flex flex-col justify-start items-center gap-[15px]">
                <div className="self-stretch h-2.5 relative text-center justify-start text-white text-[9.92px] font-light font-['Inter'] underline uppercase">
                  FOLLOW US :
                </div>
                <div className="inline-flex justify-start items-center gap-[5.57px]">
                  <a
                    target="_blank"
                    href="https://www.facebook.com/share/15ynf8Jk3d/?mibextid=wwXIfr"
                    className="w-[36.75px] h-[36.75px] px-[14.48px] py-[11.69px] bg-[#333333] rounded-[18.38px] border-[0.56px] border-[#868686] flex justify-start items-center gap-[5.57px]"
                  >
                    <svg
                      width="8"
                      height="15"
                      viewBox="0 0 8 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.36989 8.38954H7.05908L7.73476 5.68683H5.36989V4.33547C5.36989 4.02917 5.3834 3.80844 5.41043 3.67331C5.46448 3.45709 5.5816 3.29042 5.76178 3.17331C5.978 3.04718 6.29782 2.98412 6.72124 2.98412H7.73476V0.713838C7.58161 0.695819 7.33836 0.677801 7.00503 0.659783C6.59061 0.632756 6.18971 0.619242 5.80232 0.619242C5.1807 0.619242 4.6334 0.743116 4.16042 0.990866C3.68745 1.23861 3.32483 1.59222 3.07258 2.05168C2.80231 2.54718 2.66717 3.12826 2.66717 3.79493V5.68683H0.640137V8.38954H2.66717V14.1328H5.36989V8.38954Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/arxdevelopment/"
                    className="w-[36.75px] h-[36.75px] p-[11.69px] bg-[#333333] rounded-[18.38px] border-[0.56px] border-[#868686] flex justify-start items-center gap-[5.57px]"
                  >
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.6242 0.619242C8.30889 0.619242 8.80439 0.623746 9.11069 0.632755L9.7188 0.659782C10.3494 0.68681 10.8945 0.790414 11.3539 0.970594C11.8134 1.15078 12.2143 1.41204 12.5567 1.75438C12.899 2.09673 13.1603 2.49763 13.3404 2.95709C13.5206 3.41655 13.6242 3.9616 13.6513 4.59223L13.6783 5.20034C13.6873 5.51566 13.6918 6.01116 13.6918 6.68684V8.06522C13.6918 8.74991 13.6873 9.2454 13.6783 9.55171L13.6513 10.1598C13.6242 10.7905 13.5206 11.3355 13.3404 11.795C13.1603 12.2544 12.899 12.6553 12.5567 12.9977C12.2143 13.34 11.8134 13.6013 11.3539 13.7815C10.8945 13.9616 10.3494 14.0652 9.7188 14.0923L9.11069 14.1193C8.79538 14.1283 8.29988 14.1328 7.6242 14.1328H6.24582C5.56113 14.1328 5.06563 14.1283 4.75932 14.1193L4.15121 14.0923C3.52058 14.0652 2.97553 13.9616 2.51607 13.7815C2.05661 13.6013 1.65571 13.34 1.31336 12.9977C0.971019 12.6553 0.709756 12.2544 0.529575 11.795C0.349395 11.3355 0.245791 10.7905 0.218763 10.1598L0.191736 9.55171C0.182727 9.2364 0.178223 8.7409 0.178223 8.06522V6.68684C0.178223 6.00215 0.182727 5.50665 0.191736 5.20034L0.218763 4.59223C0.245791 3.9616 0.349395 3.41655 0.529575 2.95709C0.709756 2.49763 0.971019 2.09673 1.31336 1.75438C1.65571 1.41204 2.05661 1.15078 2.51607 0.970594C2.97553 0.790414 3.52058 0.68681 4.15121 0.659782L4.75932 0.632755C5.07464 0.623746 5.57014 0.619242 6.24582 0.619242H7.6242ZM6.93501 3.99763C6.32239 3.99763 5.75707 4.14854 5.23905 4.45034C4.72103 4.75214 4.31112 5.16205 4.00932 5.68007C3.70752 6.19809 3.55662 6.76341 3.55662 7.37603C3.55662 7.98864 3.70752 8.55396 4.00932 9.07198C4.31112 9.59 4.72103 9.99991 5.23905 10.3017C5.75707 10.6035 6.32239 10.7544 6.93501 10.7544C7.54762 10.7544 8.11294 10.6035 8.63096 10.3017C9.14898 9.99991 9.55889 9.59 9.8607 9.07198C10.1625 8.55396 10.3134 7.98864 10.3134 7.37603C10.3134 6.76341 10.1625 6.19809 9.8607 5.68007C9.55889 5.16205 9.14898 4.75214 8.63096 4.45034C8.11294 4.14854 7.54762 3.99763 6.93501 3.99763ZM6.93501 5.34899C7.30438 5.34899 7.64447 5.43908 7.95528 5.61926C8.2661 5.79944 8.51159 6.04494 8.69177 6.35575C8.87195 6.66656 8.96204 7.00666 8.96204 7.37603C8.96204 7.7454 8.87195 8.08549 8.69177 8.3963C8.51159 8.70711 8.2661 8.95261 7.95528 9.13279C7.64447 9.31297 7.30438 9.40306 6.93501 9.40306C6.56564 9.40306 6.22555 9.31297 5.91473 9.13279C5.60392 8.95261 5.35842 8.70711 5.17824 8.3963C4.99806 8.08549 4.90797 7.7454 4.90797 7.37603C4.90797 7.00666 4.99806 6.66656 5.17824 6.35575C5.35842 6.04494 5.60392 5.79944 5.91473 5.61926C6.22555 5.43908 6.56564 5.34899 6.93501 5.34899ZM10.4756 2.98412C10.2503 2.98412 10.0544 3.06745 9.88772 3.23412C9.72106 3.40079 9.63772 3.59898 9.63772 3.82872C9.63772 4.05845 9.72106 4.25664 9.88772 4.42331C10.0544 4.58998 10.2526 4.67331 10.4823 4.67331C10.7121 4.67331 10.9102 4.58998 11.0769 4.42331C11.2436 4.25664 11.3269 4.05845 11.3269 3.82872C11.3269 3.59898 11.2436 3.40079 11.0769 3.23412C10.9102 3.06745 10.7098 2.98412 10.4756 2.98412Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/arxdevelopment/"
                    className="w-[36.75px] h-[36.75px] px-[9.47px] py-[11.69px] bg-[#333333] rounded-[18.38px] border-[0.56px] border-[#868686] flex justify-center items-center gap-[5.57px]"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3.75 5.25H1.5V13.5H3.75V5.25Z" fill="white" />
                      <path
                        d="M2.625 1.5C1.95 1.5 1.5 1.95 1.5 2.625C1.5 3.3 1.95 3.75 2.625 3.75C3.3 3.75 3.75 3.3 3.75 2.625C3.75 1.95 3.3 1.5 2.625 1.5Z"
                        fill="white"
                      />
                      <path
                        d="M13.5 8.25C13.5 6.75 12.375 5.25 10.5 5.25C9.75 5.25 9 5.625 8.625 6V5.25H6.375V13.5H8.625V9C8.625 8.25 9 7.5 9.75 7.5C10.5 7.5 10.875 8.25 10.875 9V13.5H13.125V8.25H13.5Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href="https://www.tiktok.com/@arxdevelopment?_t=ZS-8uUPU2uIcmg&_r=1"
                    className="w-[36.75px] h-[36.75px] px-[9.47px] py-[11.69px] bg-[#333333] rounded-[18.38px] border-[0.56px] border-[#868686] flex justify-center items-center gap-[5.57px]"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.7 6.04992C11.56 6.04992 10.56 5.54992 9.84 4.74992V9.24992C9.84 11.3499 8.15 13.0499 6.04 13.0499C3.94 13.0499 2.25 11.3499 2.25 9.24992C2.25 7.14992 3.94 5.44992 6.04 5.44992C6.25 5.44992 6.44 5.44992 6.65 5.49992V7.74992C6.44 7.64992 6.25 7.64992 6.04 7.64992C5.15 7.64992 4.44 8.34992 4.44 9.24992C4.44 10.1499 5.15 10.8499 6.04 10.8499C6.94 10.8499 7.75 10.2499 7.75 9.24992V1.94992H9.84C9.84 2.84992 10.65 3.54992 11.56 3.54992H12.7V6.04992Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
                <div className="inline-flex justify-start items-center gap-[5.35px]">
                  <a
                    href="https://www.arxeg.com"
                    target="_blank"
                    className="relative justify-start"
                  >
                    <span className="text-white text-sm font-light font-['Inter'] underline lowercase">
                      WWW.
                    </span>
                    <span className="text-[#e1a12c] text-sm font-light font-['Inter'] underline lowercase">
                      ARXEG
                    </span>
                    <span className="text-white text-sm font-light font-['Inter'] underline lowercase">
                      .COM
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div
          className={`transition-all duration-[1.5s] ease-in-out relative ${
            currentContent === "questions"
              ? "opacity-100 z-[100]"
              : "opacity-0 absolute z-0 hidden"
          }`}
        >
          <Questoins id={id} setCurrentContent={setCurrentContent} />
        </div>

        {/* Message */}
        <div
          className={`transition-all duration-[1.5s] ease-in-out relative ${
            currentContent === "message"
              ? "opacity-100 z-[100]"
              : "opacity-0 absolute z-0"
          }`}
        >
          {currentContent === "message" && (
            <div className="flex flex-col items-center justify-center gap-4 p-6 text-center">
              <h2 className="text-2xl font-bold text-white">شكرا</h2>
              <p className="text-lg text-white">سيتم اعلان الفائزين بنهاية الحفل</p>
              <button 
                onClick={() => setCurrentContent("form")}
                className="mt-4 px-6 py-2 bg-[#e1a12c] text-white rounded-md hover:bg-opacity-80 transition-all"
              >
                رجوع
              </button>
            </div>
          )}
        </div>
      </div>

      {/* absolute vectors */}
      <div
        className={`absolute top-[-100px] scale-[1.5] left-[-100px] z-0 duration-[1s] origin-top-left ${
          currentContent !== "splash" && "opacity-[.2]"
        } ${
          currentContent === "form" && "translate-x-[90px] translate-y-[-90px]"
        }`}
      >
        <Image
          width={300}
          height={100}
          src="/images/leftVector.svg"
          alt="vector"
        />
      </div>

      <div
        className={`absolute bottom-[-100px] scale-[1.5] right-[-100px] z-0 duration-[1s] origin-bottom-right ${
          currentContent !== "splash" && "opacity-[.2]"
        } ${
          currentContent === "form" && "translate-x-[-90px] translate-y-[90px]"
        }`}
      >
        <Image
          width={300}
          height={100}
          src="/images/rightVector.svg"
          alt="vector"
        />
      </div>
    </div>
  );
};

export default Form;
