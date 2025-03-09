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
    setId(localStorage.getItem("id"));
    setTimeout(() => {
      if (customerId !== null) {
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
                  <div className="w-[36.75px] h-[36.75px] px-[14.48px] py-[11.69px] bg-[#333333] rounded-[18.38px] border-[0.56px] border-[#868686] flex justify-start items-center gap-[5.57px]">
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
                  </div>
                  <div className="w-[36.75px] h-[36.75px] p-[11.69px] bg-[#333333] rounded-[18.38px] border-[0.56px] border-[#868686] flex justify-start items-center gap-[5.57px]">
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
                  </div>
                  <div className="w-[36.75px] h-[36.75px] px-[9.47px] py-[11.69px] bg-[#333333] rounded-[18.38px] border-[0.56px] border-[#868686] flex justify-center items-center gap-[5.57px]">
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.18354 0.619242C8.10247 0.619242 8.98085 0.794918 9.81869 1.14627C10.6205 1.48862 11.3345 1.97285 11.9606 2.59898C12.5867 3.22511 13.071 3.93908 13.4133 4.74088C13.7647 5.57872 13.9403 6.4571 13.9403 7.37603C13.9403 8.29495 13.7647 9.17333 13.4133 10.0112C13.071 10.813 12.5867 11.5269 11.9606 12.1531C11.3345 12.7792 10.6205 13.2634 9.81869 13.6058C8.98085 13.9571 8.10247 14.1328 7.18354 14.1328C6.57093 14.1328 5.97858 14.054 5.40651 13.8963C4.83443 13.7387 4.29164 13.5112 3.77812 13.2139L0.426758 14.1328L1.34568 10.7814C1.04838 10.2679 0.820904 9.72514 0.663245 9.15306C0.505587 8.58099 0.426758 7.98864 0.426758 7.37603C0.426758 6.4571 0.602434 5.57872 0.953787 4.74088C1.29613 3.93908 1.78037 3.22511 2.4065 2.59898C3.03262 1.97285 3.74659 1.48862 4.5484 1.14627C5.38624 0.794918 6.26462 0.619242 7.18354 0.619242ZM4.7511 4.20034C4.652 4.20935 4.56641 4.23187 4.49434 4.26791C4.44029 4.29493 4.37272 4.34899 4.29164 4.43007C4.24659 4.47511 4.19704 4.53367 4.14299 4.60575L4.11596 4.63277C3.86371 4.96611 3.73758 5.34449 3.73758 5.76791C3.73758 6.07422 3.81416 6.39404 3.96731 6.72738C4.2556 7.36702 4.69705 7.98414 5.29164 8.57873L5.35921 8.6463C5.52137 8.80847 5.643 8.92558 5.72408 8.99766C6.48084 9.66433 7.34571 10.1238 8.31868 10.376L8.71058 10.4436C8.78265 10.4436 8.89076 10.4391 9.0349 10.4301H9.08896C9.28716 10.4211 9.47184 10.3715 9.64301 10.2814C9.74211 10.2274 9.8322 10.1778 9.91328 10.1328L9.99437 10.0652C10.0754 10.0022 10.1475 9.9391 10.2106 9.87604C10.2736 9.81297 10.3232 9.74541 10.3592 9.67333C10.4133 9.54721 10.4538 9.38054 10.4809 9.17333C10.4899 9.09225 10.4944 9.01117 10.4944 8.93009V8.91657C10.4944 8.88054 10.4809 8.84675 10.4538 8.81522C10.4268 8.78369 10.3953 8.75892 10.3592 8.7409L9.02139 8.1463C8.98535 8.12828 8.94481 8.11927 8.89977 8.11927C8.79166 8.11026 8.70607 8.13729 8.64301 8.20036C8.634 8.20036 8.45832 8.41207 8.11598 8.83549C8.05292 8.89856 7.98535 8.93009 7.91328 8.93009L7.85922 8.91657C7.82319 8.90757 7.78264 8.89405 7.7376 8.87603L7.56192 8.80847C7.17453 8.63729 6.81868 8.40756 6.49435 8.11927L6.25111 7.88954C5.97183 7.61927 5.7421 7.33549 5.56191 7.03819L5.52137 6.97062C5.48534 6.90756 5.46282 6.85801 5.45381 6.82197C5.4448 6.78593 5.4493 6.74539 5.46732 6.70035L5.49435 6.64629L5.73759 6.37602C5.80966 6.28593 5.86822 6.20035 5.91327 6.11927C6.00336 5.98413 6.02588 5.86251 5.98084 5.7544C5.79165 5.29494 5.59345 4.83548 5.38624 4.37601C5.36822 4.33998 5.33444 4.30619 5.28489 4.27466C5.23534 4.24313 5.18353 4.22286 5.12948 4.21385L5.02137 4.20034C4.93128 4.20034 4.84119 4.20034 4.7511 4.20034Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="w-[36.75px] h-[36.75px] px-[9.47px] py-[11.69px] bg-[#333333] rounded-[18.38px] border-[0.56px] border-[#868686] flex justify-center items-center gap-[5.57px]">
                    <div className="w-[13.37px] h-[13.37px] relative overflow-hidden">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.41347 3.65482L6.77489 4.30243C7.10106 4.88686 6.97012 5.65354 6.45642 6.16725C6.45642 6.16725 6.45642 6.16725 6.45642 6.16725C6.45635 6.16731 5.83337 6.79042 6.96307 7.92012C8.0924 9.04946 8.71549 8.42723 8.71594 8.42678C8.71596 8.42676 8.71595 8.42677 8.71596 8.42676C9.22967 7.91307 9.99634 7.78214 10.5808 8.1083L11.2284 8.46972C12.1109 8.96223 12.2151 10.1998 11.4394 10.9756C10.9733 11.4417 10.4023 11.8043 9.77107 11.8283C8.70847 11.8686 6.90391 11.5996 5.09373 9.78946C3.28356 7.97928 3.01464 6.17472 3.05492 5.11212C3.07885 4.48091 3.44153 3.90991 3.90764 3.4438C4.68334 2.6681 5.92096 2.77232 6.41347 3.65482Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-[36.75px] h-[36.75px] px-[9.47px] py-[11.69px] bg-[#333333] rounded-[18.38px] border-[0.56px] border-[#868686] flex justify-center items-center gap-[5.57px]">
                    <div className="w-[13.37px] h-[13.37px] relative overflow-hidden">
                      <svg
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.91268 3.5743C1.26025 4.22672 1.26025 5.27678 1.26025 7.3769C1.26025 9.47702 1.26025 10.5271 1.91268 11.1795C2.5651 11.8319 3.61516 11.8319 5.71528 11.8319H7.94279C10.0429 11.8319 11.093 11.8319 11.7454 11.1795C12.3978 10.5271 12.3978 9.47702 12.3978 7.3769C12.3978 5.27678 12.3978 4.22672 11.7454 3.5743C11.093 2.92188 10.0429 2.92188 7.94279 2.92188H5.71528C3.61516 2.92188 2.5651 2.92188 1.91268 3.5743ZM10.4912 4.88201C10.6388 5.05921 10.6149 5.32257 10.4377 5.47024L9.21451 6.48955C8.72091 6.90089 8.32085 7.23429 7.96775 7.46139C7.59993 7.69795 7.24172 7.84739 6.82903 7.84739C6.41634 7.84739 6.05813 7.69795 5.69032 7.46139C5.33722 7.23429 4.93716 6.9009 4.44357 6.48956L3.22039 5.47024C3.04318 5.32257 3.01924 5.05921 3.16691 4.88201C3.31458 4.70481 3.57794 4.68086 3.75514 4.82853L4.95739 5.8304C5.47693 6.26335 5.83764 6.56297 6.14217 6.75884C6.43696 6.94843 6.63687 7.01207 6.82903 7.01207C7.0212 7.01207 7.22111 6.94843 7.5159 6.75884C7.82043 6.56297 8.18114 6.26335 8.70068 5.8304L9.90292 4.82853C10.0801 4.68086 10.3435 4.70481 10.4912 4.88201Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
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
              : "opacity-0 absolute z-0"
          }`}
        >
          <Questoins id={id} setCurrentContent={setCurrentContent} />
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
